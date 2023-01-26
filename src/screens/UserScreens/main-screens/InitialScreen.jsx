import {View, StyleSheet} from 'react-native';

import {useContext, useEffect} from 'react';

import {Button} from '../../../components/Button';

import {UserContext} from '../../../context/UserContext';

import InitialScreenSvg from '../../../assets/InitialScreenSvg';

import {globalStyles} from '../../globalStyles';

import {UserVerified} from '../../../context/UserVerified';
import {useIsFocused} from '@react-navigation/native';

import {clearSchedule} from '../../../functions/Schedules/clearSchedule';
import {ShedulesUserContext} from '../../../context/ShedulesUser';

export const InitialScreen = ({navigation}) => {
  const {userData} = useContext(UserContext);

  const {userVerified} = useContext(UserVerified);
  const {shedulesUser, setShedulesUser} = useContext(ShedulesUserContext);

  const isFocused = useIsFocused();

  const handleButton = async () => {
    if (userData?.email && userVerified) navigation.navigate('Services');

    userData ? navigation.navigate('Services') : navigation.navigate('Login');
  };

  useEffect(() => {
    clearSchedule(shedulesUser, setShedulesUser);
  }, [isFocused]);

  return (
    <View style={globalStyles.container}>
      <View style={style.hero}>
        <InitialScreenSvg />
      </View>

      <Button text="Agende seu horário" action={handleButton} />
    </View>
  );
};

const style = StyleSheet.create({
  hero: {
    alignItems: 'center',
  },
});
