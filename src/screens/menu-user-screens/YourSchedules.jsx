import {Text, View, StyleSheet, Pressable, ScrollView} from 'react-native';

import {Title} from '../../components/Title';
import {useContext, useEffect, useState} from 'react';

import {UserContext} from '../../context/UserContext';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

import {globalStyles} from '../globalStyles';

import {LoadingAnimation} from '../../components/LoadingAnimation';

import {dateFormated} from '../../functions/helpers/dateHelper';

export const YourSchedules = () => {
  const [schedules, setShedules] = useState(null);

  const {userData} = useContext(UserContext);

  const navigation = useNavigation();

  const isFocused = useIsFocused();

  useEffect(() => {
    firestore()
      .collection('schedules_by_user')
      .doc(userData.uid)
      .get()
      .then(res => {
        setShedules(res._data.schedules);
      });
  }, [isFocused]);

  return (
    <View style={globalStyles.container}>
      <Title
        title={
          schedules?.length === 0
            ? 'Você não tem nenhum horario marcado'
            : 'Seus agendamentos'
        }
      />
      <ScrollView
        style={style.contentScrollView}
        contentContainerStyle={{alignItems: 'center'}}>
        {schedules ? (
          schedules?.map((item, index) => {
            return (
              <Pressable
                style={style.schedulesDay}
                key={index}
                onPress={() => navigation.navigate('ScheduleDetail', {item})}>
                <Text style={style.text}>Dia: {dateFormated(item)}</Text>
                <Text style={style.text}>Horario: {item.shedule}</Text>
              </Pressable>
            );
          })
        ) : (
          <LoadingAnimation />
        )}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  contentScrollView: {
    width: '100%',
    marginTop: 50,
  },

  schedulesDay: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#E95401',
    width: '70%',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },

  text: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 17,
  },
});
