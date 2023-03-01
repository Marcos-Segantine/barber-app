import {View, StyleSheet} from 'react-native';

import {useContext, useEffect, useState} from 'react';

import {Calendar, LocaleConfig} from 'react-native-calendars';

import {Title} from '../../components/Title';
import {Button} from '../../components/Button';

import {ShedulesUserContext} from '../../context/ShedulesUser';

import {LoadingAnimation} from '../../components/LoadingAnimation';

import {handleRightArrow} from '../../functions/calendar/handleRightArrow';
import {handleLeftArrow} from '../../functions/calendar/handleLeftArrow';
import {getDeniedDays} from '../../functions/calendar/getDeniedDays';

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

  const initialMonth =
    new Date().getMonth() + 1 > 10
      ? new Date().getMonth() + 1
      : `0${new Date().getMonth() + 1}`;

  const {shedulesUser, setShedulesUser} = useContext(ShedulesUserContext);
  const [deniedDays, setDeniedDays] = useState(null);
  const [month, setMonth] = useState(initialMonth);
  const [year, setYear] = useState(new Date().getFullYear());
  const [arrawLeftAvaible, setArrawLeftAvaible] = useState(false);

  useEffect(() => {
    getDeniedDays(shedulesUser, setDeniedDays, month, year);
  }, [month]);

  const handleButton = () =>
    shedulesUser.day && navigation.navigate('Schedules');

  if (!deniedDays) {
    return (
      <View style={style.container}>
        <LoadingAnimation />
      </View>
    );
  }

  return (
    <View style={style.container}>
      <Title title="Selecione um data" />

      <Calendar
        context={{date: ''}}
        onPressArrowLeft={subtractMonth => {
          handleLeftArrow(month, setMonth, setYear);
          subtractMonth();
        }}
        onPressArrowRight={addMonth => {
          handleRightArrow(month, setMonth, setYear);
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
