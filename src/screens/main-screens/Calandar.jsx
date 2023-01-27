import {View, StyleSheet} from 'react-native';

import {useContext, useEffect, useState} from 'react';

import {Calendar, LocaleConfig} from 'react-native-calendars';

import {Title} from '../../components/Title';
import {Button} from '../../components/Button';

import {ShedulesUserContext} from '../../context/ShedulesUser';

import firestore from '@react-native-firebase/firestore';

import {LoadingAnimation} from '../../components/LoadingAnimation';

export const Calandar = ({navigation}) => {
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

  LocaleConfig.defaultLocale = 'pt-br';

  const currentDate = new Date();

  const [deniedDays, setDeniedDays] = useState(null);
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [arrawLeftAvaible, setArrawLeftAvaible] = useState(false);

  // const currentMonth = currentDate.getMonth() + 1

  const {shedulesUser, setShedulesUser} = useContext(ShedulesUserContext);

  useEffect(() => {
    firestore()
      .collection('denied_days')
      .get()
      .then(async ({_docs}) => {
        setDeniedDays(_docs[month - 1]._data);
      });
  }, [month]);

  const handleButton = () => {
    shedulesUser.day
      ? navigation.navigate('Schedules')
      : console.log('NÃO SELECIONOU UM DIA');
  };

  const handleLeftArrow = () => {
    if (month === 1) {
      setMonth(12);
      return;
    }

    setMonth(month - 1);
  };

  const handleRightArrow = () => {
    if (month === 12) {
      setMonth(1);
      return;
    }

    setMonth(month + 1);
  };

  return (
    <View style={style.container}>
      <Title title="Selecione um data" />

      {deniedDays ? (
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
      ) : (
        <LoadingAnimation />
      )}
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
    backgroundColor: '#1E1E1E',
    justifyContent: 'space-between',
  },
});
