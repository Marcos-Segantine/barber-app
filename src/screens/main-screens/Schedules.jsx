import {Text, View, StyleSheet, Pressable} from 'react-native';

import {Title} from '../../components/Title';
import {Button} from '../../components/Button';
import {LoadingAnimation} from '../../components/LoadingAnimation';

import {useContext, useEffect, useState} from 'react';
import {ShedulesUserContext} from '../../context/ShedulesUser';

import {globalStyles} from '../globalStyles';

import firestore from '@react-native-firebase/firestore';

import {
  getProfessional,
  getDay,
  getMonth,
  getYear,
} from '../../functions/helpers/dateHelper';

export const Schedules = ({navigation}) => {
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const {shedulesUser, setShedulesUser} = useContext(ShedulesUserContext);
  console.log(shedulesUser);

  const year = getYear(shedulesUser);
  const month = getMonth(shedulesUser);
  const day = getDay(shedulesUser);
  const professional = getProfessional(shedulesUser);

  useEffect(() => {
    const getAvailableTimes = async () => {
      try {
        const workingHoursSnapshot = await firestore()
          .collection('working_hours')
          .get();
        const workingHours = workingHoursSnapshot.docs.map(
          doc => doc.data().times,
        );

        const unavailableTimesSnapshot = await firestore()
          .collection('unavailable_times')
          .doc(`${month}_${year}`)
          .get();

        const unavailableTimes = unavailableTimesSnapshot.data() || {};

        const dayOfWeek = new Date(shedulesUser.day).getDay() + 1;

        let availableTimes = [];

        if (dayOfWeek > 0 && dayOfWeek <= 5) {
          availableTimes = workingHours[2];
        } else if (dayOfWeek === 6) {
          availableTimes = workingHours[0];
        } else {
          availableTimes = workingHours[1];
        }

        const unavailableTimesForDayAndProfessional =
          unavailableTimes[day]?.[professional] || [];

        availableTimes = availableTimes.filter(
          time => !unavailableTimesForDayAndProfessional.includes(time),
        );

        setAvailableTimes(availableTimes);
      } catch (error) {
        console.error(error);
      }
    };

    getAvailableTimes();
  }, []);

  const handleSelectTime = time => {
    setShedulesUser({...shedulesUser, shedule: time});
    setSelectedTime(time);
  };

  const handleConfirmSchedule = () => {
    if (shedulesUser.shedule) {
      navigation.navigate('ConfirmSchedule');
    } else {
      console.log('TIME NOT SELECTED');
    }
  };

  if (!availableTimes) {
    return (
      <View style={globalStyles.container}>
        <LoadingAnimation />
      </View>
    );
  }

  else if (availableTimes.length === 0) {
    return (
      <View style={[globalStyles.container, {justifyContent: 'space-around'}]}>
        <Title title={'Não há horarios disponiveis'} />

        <Button text={'Voltar'} />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Title title="Selecione um horário" />
      <View style={styles.schedules}>
        {availableTimes.map((time, index) => (
          <Pressable
            key={index}
            style={[
              styles.schedule,
              selectedTime === time && styles.scheduleSeleted,
            ]}
            onPress={() => handleSelectTime(time)}>
            <Text style={styles.textSchedule}>{time}</Text>
          </Pressable>
        ))}
      </View>
      <Button
        text="Confirmar"
        action={handleConfirmSchedule}
        waitingData={!!shedulesUser.shedule}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  schedules: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 50,
    justifyContent: 'center',
    flex: 0.8,
  },

  schedule: {
    borderWidth: 3,
    borderColor: '#E95401',
    borderRadius: 20,
    width: '48%',
    paddingVertical: 9,
    marginVertical: 5,
    marginHorizontal: 3,
  },

  scheduleSeleted: {
    backgroundColor: '#E95401',
    borderWidth: 3,
    borderColor: '#E95401',
    borderRadius: 20,
    width: '48%',
    paddingVertical: 9,
    marginVertical: 5,
    marginHorizontal: 3,
  },

  textSchedule: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
  },
});
