import {useContext, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';

import {Button} from '../Button';
import {Title} from '../Title';

import {verifyPhoneNumber} from '../../functions/User/verifyPhoneNumber';
import {UserContext} from '../../context/UserContext';
import {useNavigation} from '@react-navigation/native';

import {formatPhoneNumber} from '../../functions/helpers/formatPhoneNumber' 

import {verifyCodeForGoogleSignIn} from '../../functions/User/verifyCodeForGoogleSignIn';

export const PhoneVerificationForGoogleSignIn = ({visible, setVisible}) => {
  const [getCodeModalVisible, setGetCodeModalVisible] = useState(false);

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState('');

  const [error, setError] = useState('');

  const {userData, setUserData} = useContext(UserContext);

  const navigation = useNavigation();

  const handlePhoneNumber = async () => {
    if (!phone) {
      setError('Por favor insira o número de telefone.');
      return;
    }

    const regex = /\d+/g;
    const phoneNumber = phone.match(regex).join('');

    try {
      await verifyPhoneNumber('+55' + phoneNumber, setConfirm);
      setVisible(false);
      setGetCodeModalVisible(true);
    } catch (error) {
      console.error(error);
      setError(
        'Ocorreu um erro ao verificar seu número. Por favor tente mais tarde.',
      );
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
            placeholder="(00) 00000-0000"
            value={phone}
            onChangeText={text => setPhone(formatPhoneNumber(text))}
            keyboardType="numeric"
          />

          <Pressable
            style={{
              width: '75%',
              marginTop: 5,
            }}
            onPress={() => {
              setVisible(false);
              setGetCodeModalVisible(false);
            }}>
            <Text
              style={{
                textAlign: 'right',
              }}>
              Voltar
            </Text>
          </Pressable>

          {error && <Text style={styles.errorMessage}>{error}</Text>}

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
            onChangeText={text => setCode(text)}
            keyboardType="numeric"
          />
          <Pressable
            style={{
              width: '75%',
              marginTop: 5,
            }}
            onPress={() => {
              setVisible(false);
              setGetCodeModalVisible(false);
            }}>
            <Text
              style={{
                textAlign: 'right',
              }}>
              Voltar
            </Text>
          </Pressable>

          {error && <Text style={styles.errorMessage}>{error}</Text>}

          <Button
            text={'Confirmar'}
            action={() =>
              verifyCodeForGoogleSignIn(
                confirm,
                code,
                setError,
                phone,
                userData,
                setUserData,
                setGetCodeModalVisible,
                navigation,
              )
            }
          />
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
    textAlign: 'center',
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

  errorMessage: {
    color: 'red',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 5,
  },
});
