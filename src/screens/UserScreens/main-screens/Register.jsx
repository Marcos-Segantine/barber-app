import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
} from 'react-native';

import {Title} from '../../../components/Title';
import {Button} from '../../../components/Button';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {MessageError} from '../../../components/MessageError';

import {Path, Svg} from 'react-native-svg';

import {createUserByGoogle} from '../../../functions/Register/createUserByGoogle';

export const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [comfirmPassword, setComfirmPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [messageError, setMessageError] = useState('');

  const [modalMessageEmailVerification, setModalMessageEmailVerification] =
    useState(false);

  const [MessageErrorEmailVerified, setMessageErrorEmailVerified] =
    useState(false);

  const [canUserContinue, setCanUserContinue] = useState(false);

  const handleContinue = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        const user = auth().currentUser;

        if (!user?.emailVerified) {
          setCanUserContinue(false);
          setModalMessageEmailVerification(true);
          setMessageErrorEmailVerified(true);
        } else {
          setCanUserContinue(true);
          setMessageErrorEmailVerified(false);

          console.log(user.emailVerified, 'user.emailVerified');
          navigation.navigate('Services');
        }
      });
  };

  const handleResgister = () => {
    if (!email || !password || !comfirmPassword || !phone || !name) {
      setModalVisible(true);
      setMessageError('Por favor preencha todos os campos');

      return;
    } else if (password !== comfirmPassword) {
      setModalVisible(true);
      setMessageError('Senhas não são iguais');

      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async res => {
        firestore().collection('users').doc(res.user.uid).set({
          name: name,
          email: email,
          password: password,
          phone: phone,
          uid: res.user.uid,
        });

        firestore().collection('schedules_by_user').doc(res.user.uid).set({
          schedules: [],
        });

        await AsyncStorage.setItem('@barber_app__email', email);
        await AsyncStorage.setItem('@barber_app__password', password);

        const user = auth().currentUser;

        user
          .sendEmailVerification()
          .then(() => {
            console.log('Email de verificação enviado!');
            setModalMessageEmailVerification(true);
          })
          .catch(error => {
            console.log(error);
            setModalMessageEmailVerification(false);
          });

        canUserContinue ? navigation.navigate('Services') : null;
      })
      .catch(err => {
        console.log(err.message);
        setModalVisible(true);

        switch (err.message) {
          case '[auth/invalid-email] The email address is badly formatted.':
            setMessageError('Email inválido');
            break;

          case '[auth/email-already-in-use] The email address is already in use by another account.':
            setMessageError('Email já está em uso');
            break;

          default:
            setMessageError('Ocorreu um erro');
            break;
        }
      });
  };

  return (
    <ScrollView contentContainerStyle={style.container}>
      <Modal
        animationType="slide"
        visible={modalMessageEmailVerification}
        transparent={true}>
        <View style={style.modalVerifyEmail}>
          <Text style={style.textModalVerifyEmail}>
            Enviamos um email de verificação para:
          </Text>
          <Text style={style.textEmail}>{email}</Text>
          <Text style={style.subText}>
            Sua conta foi criada com sucesso, agora é ó você ir na sua caixa de
            mensagens e verifica-la para poder usar o aplicativo.
          </Text>

          <Button text={'Continuar'} action={handleContinue} />

          {MessageErrorEmailVerified ? (
            <Text style={style.messageErrorEmailVerified}>
              Seu email não foi verificado!
            </Text>
          ) : null}
        </View>
      </Modal>

      <MessageError
        modalVisible={modalVisible}
        messageError={messageError}
        setModalVisible={setModalVisible}
        action={() => setModalVisible(false)}
      />
      <Title title="Cadastre-se agora" />

      <View style={style.form}>
        <TextInput
          onChangeText={text => setName(text)}
          placeholder="Nome completo"
          placeholderTextColor={'#FFFFFF80'}
          style={style.input}
        />
        <TextInput
          onChangeText={text => setEmail(text)}
          placeholder="Email"
          placeholderTextColor={'#FFFFFF80'}
          style={style.input}
        />
        <TextInput
          onChangeText={text => setPhone(text)}
          placeholder="Telefone"
          placeholderTextColor={'#FFFFFF80'}
          style={style.input}
        />
        <TextInput
          onChangeText={text => setPassword(text)}
          placeholder="Crie uma senha"
          placeholderTextColor={'#FFFFFF80'}
          style={style.input}
        />
        <TextInput
          onChangeText={text => setComfirmPassword(text)}
          placeholder="Crie uma senha"
          placeholderTextColor={'#FFFFFF80'}
          style={style.input}
        />
      </View>

      <View style={style.linksHelpUser}>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={style.linkHelp}>Login</Text>
        </Pressable>
      </View>

      <Pressable onPress={() => createUserByGoogle(navigation)}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="96px"
          height="96px">
          <Path
            fill="#fbc02d"
            d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
          />
          <Path
            fill="#e53935"
            d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
          />
          <Path
            fill="#4caf50"
            d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
          />
          <Path
            fill="#1565c0"
            d="M43.611 20.083L43.595 20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
          />
        </Svg>
      </Pressable>

      <Button text="Cadastrar" action={handleResgister} />
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    paddingBottom: 70,
  },

  form: {
    width: '80%',
    marginTop: 15,
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
    width: '80%',
    alignItems: 'flex-end',
    marginTop: 10,
    paddingHorizontal: 15,
  },

  linkHelp: {
    color: '#FFFFFF',
  },

  modalVerifyEmail: {
    backgroundColor: '#1E1E1E',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },

  textModalVerifyEmail: {
    fontWeight: '700',
    fontSize: 25,
    textAlign: 'center',
  },

  textEmail: {
    fontWeight: '900',
    fontSize: 25,
    textAlign: 'center',
    color: '#FFFFFF',
    marginVertical: 20,
  },

  messageErrorEmailVerified: {
    color: 'red',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 5,
  },

  subText: {
    fontSize: 12,
    width: '80%',
  },
});
