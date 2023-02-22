import {useContext, useState} from 'react';
import {Modal, View, Text, TextInput, StyleSheet} from 'react-native';

import {Button} from '../Button';
import {Title} from '../Title';

import {verifyPhoneNumber} from '../../functions/User/verifyPhoneNumber';
import {changePhoneNumber} from '../../functions/User/changePhoneNumber';
import {UserContext} from '../../context/UserContext';
import {useNavigation} from '@react-navigation/native';

export const PhoneVerificationForGoogleSignIn = ({visible, setVisible}) => {
  const [getCodeModalVisible, setGetCodeModalVisible] = useState(false);

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState('');

  const [error, setError] = useState('');
  const [messageError, setMessageError] = useState('');

  const {userData, setUserData} = useContext(UserContext);

  const navigation = useNavigation();

  const handlePhoneNumber = async () => {
    try {
      await verifyPhoneNumber('+' + phone, setConfirm).then(async () => {
        setVisible(false);
        setGetCodeModalVisible(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

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

      if (error) return;

      setGetCodeModalVisible(false);
      navigation.navigate('Services');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.container}>
          <Title title={'Por favor nos informe seu númeoro de telefone'} />
          <Text style={styles.text}>
            Verificamos que você não tem um número para contato cadastrado
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Número de telefone"
            onChangeText={text => setPhone(text)}
            keyboardType="numeric"
          />

          {error && <Text>{message.message}</Text>}

          <Button text={'Confirmar'} action={handlePhoneNumber} />
        </View>
      </Modal>

      <Modal visible={getCodeModalVisible} transparent animationType="slide">
        <View style={styles.container}>
          <Title
            title={'Insira o codigo que acabamos de enviar no campo abaixo.'}
          />
          <TextInput
            style={styles.input}
            placeholder="Código"
            onChangeText={text => setPhone(text)}
            keyboardType="numeric"
          />

          {error && <Text>{message.message}</Text>}

          <Button text={'Confirmar'} action={handleCode} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: '85%',
    marginVertical: 10,
    textAlign: 'center'
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
