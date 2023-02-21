import {Modal, StyleSheet, View, Text, TextInput} from 'react-native';

import {Title} from '../Title';
import {Button} from '../Button';
import {useContext, useEffect, useState} from 'react';

import {verifyPhoneNumber} from '../../functions/User/verifyPhoneNumber';
import {changePhoneNumber} from '../../functions/User/changePhoneNumber';
import {UserContext} from '../../context/UserContext';
import {useNavigation} from '@react-navigation/native';

export const PhoneVerificationModal = ({visible, setVisible, phone}) => {
  const [code, setCode] = useState();
  const [confirm, setConfirm] = useState();

  const [error, setError] = useState('');
  const [message, setMessageError] = useState('');

  const {userData, setUserData} = useContext(UserContext);

  const navigation = useNavigation();

  useEffect(() => {
    console.log("MODAL PHONE");
    const callerVerifyPhoneNumber = async () => {
      await verifyPhoneNumber('+' + phone, setConfirm);
    };

    visible && callerVerifyPhoneNumber();
  }, []);

  const handleCode = async () => {
    try {
      await changePhoneNumber(
        confirm,
        code,
        setError,
        setMessageError,
        phone,
        userData,
        setUserData,
      );

      setVisible(false);
      navigation.navigate('Services');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalVerifyPhone}>
        <Title title={'Telefone de verificação enviado com sucesso'} />

        <TextInput
          placeholder="Código"
          onChangeText={text => setCode(text)}
          style={styles.input}
          keyboardType="numeric"
        />

        {error ? <Text>{message.message}</Text> : null}

        <Button text={'Confirmar'} action={handleCode} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalVerifyPhone: {
    backgroundColor: '#1E1E1E',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },

  input: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#E95401',
    width: '80%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 15,
  },
});
