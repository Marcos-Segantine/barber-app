import {View, StyleSheet} from 'react-native';

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
