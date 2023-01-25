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

import { SignInWithGoogle } from '../../../components/SignInWithGoogle';

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

      <SignInWithGoogle />

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
