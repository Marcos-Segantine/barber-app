import {
  Text,
  Pressable,
  View,
  StyleSheet,
  TextInput,
  Modal,
} from 'react-native';

import {useContext, useState} from 'react';

import auth from '@react-native-firebase/auth';

import {Title} from '../../../components/Title';
import {Button} from '../../../components/Button';

import firestore from '@react-native-firebase/firestore';

import {globalStyles} from '../../globalStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {UserContext} from '../../../context/UserContext';

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
            setMessageError('Email eǒu senha inválidos');
            break;
        }
      });
  };

  const clearEmailAndPassword = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={style.modalContainer}>
          <View>
            <Text style={style.messageError}>{messageError}.</Text>
            <Text style={style.secondMessageError}>Tente novamente.</Text>
          </View>

          <Pressable
            style={style.okButtonModal}
            onPress={() => {
              clearEmailAndPassword();
              setModalVisible(false);
            }}>
            <Text style={style.textOkButtonModal}>OK</Text>
          </Pressable>
        </View>
      </Modal>

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

            <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
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
  modalContainer: {
    width: '80%',
    backgroundColor: '#1E1E1E',
    top: '35%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 20,
    borderColor: '#E95401',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
    minHeight: 300,
  },

  messageError: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 25,
    textAlign: 'center',
  },

  secondMessageError: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 25,
    marginTop: 10,
    textAlign: 'center',
  },

  okButtonModal: {
    backgroundColor: '#E95401',
    width: '65%',
    alignItems: 'center',
    marginTop: 40,
    borderRadius: 10,
    paddingVertical: 10,
  },

  textOkButtonModal: {
    fontWeight: '700',
    color: '#FFFFFF',
    fontSize: 20,
  },

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
