import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {useContext, useEffect, useState} from 'react';

import {Button} from '../../components/Button';

import InitialScreenSvg from '../../assets/InitialScreenSvg';

import {globalStyles} from '../globalStyles';

import {UserVerified} from '../../context/UserVerified';
import {useIsFocused} from '@react-navigation/native';

import {clearSchedule} from '../../functions/schedules/clearSchedule';
import {ShedulesUserContext} from '../../context/ShedulesUser';

import {PhoneVerificationForGoogleSignIn} from '../../components/modals/PhoneVerificationForGoogleSignIn';

import auth from '@react-native-firebase/auth';
import {Header} from '../../shared/Header';

export const InitialScreen = ({navigation}) => {
  const [modalPhoneVerification, setModalPhoneVerification] = useState(false);

  const {userVerified} = useContext(UserVerified);
  const {shedulesUser, setShedulesUser} = useContext(ShedulesUserContext);

  const isFocused = useIsFocused();

  const handleButton = async () => {
    const user = auth().currentUser;

    if (user && userVerified && user.phoneNumber)
      navigation.navigate('Services');
    else if (user && userVerified && !user.phoneNumber)
      setModalPhoneVerification(true);
    else navigation.navigate('Login');
  };

  useEffect(() => {
    clearSchedule(shedulesUser, setShedulesUser);
  }, [isFocused]);

  return (
    <>
      <View style={style.container}>
        <View style={style.logoRound}></View>
        <View style={style.bottomContainer}>
          <Text style={style.text}>Eaí, procurando algum barbeiro?</Text>
          <View style={style.actionArea}>
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={handleButton}
              style={style.button}>
              <Text style={style.buttonText}>Agendar um horário</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
  },
  logoRound: {
    width: 300,
    height: 300,
    backgroundColor: '#ff9000',
    borderRadius: 150,
    marginTop: 48,
  },
  bottomContainer: {
    marginTop: 'auto',
    padding: 24,
    width: '100%',
    height: 300,
    backgroundColor: '#2e2e2e',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  text: {
    fontFamily: 'Satoshi-Bold',
    color: '#fff',
    fontSize: 32,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ff9000',
    borderRadius: 10,
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Satoshi-Regular',
    fontSize: 18,
  },
  actionArea: {
    marginTop: 24,
  },
});
