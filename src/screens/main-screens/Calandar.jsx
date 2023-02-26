import {View, StyleSheet} from 'react-native';

import {useContext, useEffect, useState} from 'react';

import {Calendar, LocaleConfig} from 'react-native-calendars';

import {Title} from '../../components/Title';
import {Button} from '../../components/Button';

import {ShedulesUserContext} from '../../context/ShedulesUser';

import firestore from '@react-native-firebase/firestore';

import {LoadingAnimation} from '../../components/LoadingAnimation';
import {getProfessional} from '../../functions/helpers/dateHelper';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'jan',
    'fev',
    'mar',
    'abr',
    'maio',
    'jun',
    'jul',
    'ago',
    'set',
    'out',
    'nov',
    'dez',
  ],
  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Seg', 'Terç', 'Qua', 'Qui', 'Sex', 'Sáb'],
};

export const Calandar = ({navigation}) => {
  LocaleConfig.defaultLocale = 'pt-br';

  const {shedulesUser, setShedulesUser} = useContext(ShedulesUserContext);
  const [deniedDays, setDeniedDays] = useState(null);
  const [month, setMonth] = useState(`0${new Date().getMonth() + 1}`);
  const [year, setYear] = useState(new Date().getFullYear());
  const [arrawLeftAvaible, setArrawLeftAvaible] = useState(false);

  const scheduleProfessional = getProfessional(shedulesUser);

  useEffect(() => {
    const deniedDaysArrayToObejct = data => {
      const dataTemp = data.reduce((obj, item) => {
        return {
          ...obj,
          ...item,
        };
      }, {});
      setDeniedDays(dataTemp);
    };

    (async () => {
      const deniedDaysRef = firestore()
        .collection('denied_days')
        .doc(`${month}_${year}`);
      const deniedDaysData = (await deniedDaysRef.get()).data();

      const dataTemp = [];

      for (const day in deniedDaysData) {
        if (deniedDaysData[day][scheduleProfessional].length > 0) {
          for (const deniedDay in deniedDaysData[day][scheduleProfessional]) {
            dataTemp.push(deniedDaysData[day][scheduleProfessional][deniedDay]);
          }
        }
      }
      deniedDaysArrayToObejct(dataTemp);
    })();
  }, []);

  const handleButton = () =>
    shedulesUser.day && navigation.navigate('Schedules');

  const handleLeftArrow = () => {
    setMonth(month === 1 ? 12 : month - 1);
    setYear(new Date().getFullYear());
  };
  const handleRightArrow = () => {
    setMonth(month === 12 ? 1 : month + 1);
    setYear(new Date().getFullYear());
  };

  if (!deniedDays) {
    return (
      <View style={style.container}>
        <LoadingAnimation />
      </View>
    );
  }

  // console.log([...deniedDays], 'DATA');

  return (
    <View style={style.container}>
      <Title title="Selecione um data" />

      <Calendar
        context={{date: ''}}
        onPressArrowLeft={subtractMonth => {
          handleLeftArrow();
          subtractMonth();
        }}
        onPressArrowRight={addMonth => {
          handleRightArrow();
          addMonth();
        }}
        minDate={String(new Date())}
        markedDates={{
          ...deniedDays,
          [shedulesUser.day]: {
            selected: true,
            marked: true,
            selectedColor: 'white',
          },
        }}
        // deniedDays
        onDayPress={day =>
          setShedulesUser({...shedulesUser, day: day.dateString})
        }
        disableArrowLeft={arrawLeftAvaible}
        style={{
          width: 350,
          marginTop: 40,
          padding: 5,
          borderRadius: 20,
        }}
        theme={{
          calendarBackground: '#E95401',
          dayTextColor: '#FFFFFF',
          selectedDayTextColor: '#E95401',
          selectedDayBackgroundColor: '#FFFFFF',
          textDisabledColor: '#FFFFFF40',
          textSectionTitleColor: '#FFFFFF',
          arrowColor: '#FFFFFF',
          monthTextColor: '#FFFFFF',
          textDayHeaderFontWeight: '700',
        }}
      />

      <Button
        text="Comfirmar"
        action={handleButton}
        waitingData={!!shedulesUser.day}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
  },
});
