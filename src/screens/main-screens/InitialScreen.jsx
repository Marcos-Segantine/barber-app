import {View, StyleSheet} from 'react-native';

import {useContext, useEffect, useState} from 'react';

import {Button} from '../../components/Button';

import {UserContext} from '../../context/UserContext';

import InitialScreenSvg from '../../assets/InitialScreenSvg';

import {globalStyles} from '../globalStyles';

import {UserVerified} from '../../context/UserVerified';
import {useIsFocused} from '@react-navigation/native';

import {clearSchedule} from '../../functions/schedules/clearSchedule';
import {ShedulesUserContext} from '../../context/ShedulesUser';
import auth from '@react-native-firebase/auth';

import {PhoneVerificationForGoogleSignIn} from '../../components/Modals/PhoneVerificationForGoogleSignIn';

export const InitialScreen = ({navigation}) => {
  const [modalPhoneVerification, setModalPhoneVerification] = useState(false);

  const {userData} = useContext(UserContext);

  const {userVerified} = useContext(UserVerified);
  const {shedulesUser, setShedulesUser} = useContext(ShedulesUserContext);

  const isFocused = useIsFocused();

  const handleButton = async () => {
    if (userData?.email && userVerified) navigation.navigate('Services');
    else navigation.navigate('Login');
  };

  useEffect(() => {
    clearSchedule(shedulesUser, setShedulesUser);

    const {phoneNumber} = auth().currentUser;

    if (!phoneNumber) {
      setModalPhoneVerification(true);
    }
  }, [isFocused]);

  return (
    <View style={globalStyles.container}>
      <PhoneVerificationForGoogleSignIn
        visible={modalPhoneVerification}
        setVisible={setModalPhoneVerification}
      />
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
