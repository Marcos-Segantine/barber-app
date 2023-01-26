import {Text, StyleSheet, View} from 'react-native';

import {Title} from '../../../components/Title';
import {Button} from '../../../components/Button';

import {useContext} from 'react';
import {UserContext} from '../../../context/UserContext';

import {cancelScheduleButton} from '../../../functions/Schedules/cancelScheduleButton';

import { dateFormated } from '../../../functions/dateFormated';

export const ScheduleDetail = ({route, navigation}) => {
  const {item} = route.params;

  const {userData} = useContext(UserContext);

  const date = dateFormated(item)

  return (
    <View style={style.container}>
      <Title title={date} />

      <View style={style.content}>
        <Text style={style.info}>Horario: {item.shedule}</Text>
        <Text style={style.info}>Serviço: {item.service}</Text>
        <Text style={style.info}>Barbeiro: {item.professional}</Text>
      </View>

      <Button
        text="Cancelar Horario"
        action={() => cancelScheduleButton(userData, item, navigation)}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    flex: 1,
    alignItems: 'center',
  },

  content: {
    marginTop: 25,
    width: '100%',
    alignItems: 'center',
  },

  info: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 15,
    borderWidth: 3,
    borderColor: '#E95401',
    width: '80%',
    textAlign: 'center',
    borderRadius: 20,
    paddingVertical: 15,
  },
});
