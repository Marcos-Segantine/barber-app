import {
  Text,
  Pressable,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';

import {useContext, useState} from 'react';

import auth from '@react-native-firebase/auth';

import {Title} from '../../../components/Title';
import {Button} from '../../../components/Button';

import firestore from '@react-native-firebase/firestore';

import {globalStyles} from '../../globalStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {UserContext} from '../../../context/UserContext';

import {MessageError} from '../../../components/MessageError';

export const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [messageError, setMessageError] = useState('');

  const {setUserData} = useContext(UserContext);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setMessageError('Por favor preencha todos os campos'),
        setModalVisible(true);

      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async res => {
        await AsyncStorage.setItem('@barber_app__email', email);
        await AsyncStorage.setItem('@barber_app__password', password);

        firestore()
          .collection('users')
          .where('uid', '==', res.user.uid)
          .get()
          .then(res => {
            setUserData(res._docs[0]?._data);
          });

        navigation.navigate('Services');
      })
      .catch(err => {
        setModalVisible(true);

        switch (err.message) {
          case '[auth/invalid-email] The email address is badly formatted.':
            setMessageError('Email inválido');
            break;
          case '[auth/wrong-password] The password is invalid or the user does not have a password.':
            setMessageError('Senha inválida');
            break;

          case '[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.':
            setMessageError('Usuário não encontrado');
            break;

          default:
            setMessageError('Email e/ou senha inválidos');
            break;
        }
      });
  };

  const clearEmailAndPassword = () => {
    setEmail('');
    setPassword('');
    setModalVisible(false);
  };

  return (
    <>
      <MessageError
        modalVisible={modalVisible}
        messageError={messageError}
        setModalVisible={setModalVisible}
        action={clearEmailAndPassword}
      />

      <View style={globalStyles.container}>
        <Title title="Entre agora" />

        <View style={style.form}>
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            style={style.input}
            placeholder="Email"
            placeholderTextColor={'#FFFFFF80'}
            keyboardType="email-address"
          />

          <TextInput
            value={password}
            onChangeText={text => setPassword(text)}
            style={style.input}
            placeholder="Digite sua senha"
            placeholderTextColor={'#FFFFFF80'}
            secureTextEntry={true}
          />
          <View style={style.linksHelpUser}>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={style.linkHelp}>Cadastrar</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={style.linkHelp}>Esqueci minha senha</Text>
            </Pressable>
          </View>

          <Button text="Entrar" action={handleLogin} />
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  form: {
    width: '80%',
    alignItems: 'center',
    marginTop: '15%',
  },

  input: {
    borderWidth: 3,
    borderColor: '#E95401',
    borderRadius: 20,
    width: '100%',
    marginVertical: 5,
    paddingHorizontal: 13,
    paddingVertical: 17,
    fontWeight: '700',
    fontSize: 14,
    color: '#FFFFFF80',
  },

  linksHelpUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },

  linkHelp: {
    color: '#FFFFFF',
  },
});
