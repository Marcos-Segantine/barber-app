import {Text, Pressable, View, StyleSheet, TextInput} from 'react-native';

import {useContext, useState} from 'react';

import {Title} from '../../../components/Title';
import {Button} from '../../../components/Button';

import {globalStyles} from '../../globalStyles';

import {UserContext} from '../../../context/UserContext';

import {MessageError} from '../../../components/MessageError';

import {signInWithEmailAndPassword} from '../../../functions/Login/signInWithEmailAndPassword';
import {signInWithGoogle} from '../../../functions/Login/signInWithGoogle';

import {Path, Svg} from 'react-native-svg';
import {UserVerified} from '../../../context/UserVerified';

export const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isToClearEmailAndPassword, setIsToClearEmailAndPassword] =
    useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [messageError, setMessageError] = useState('');

  const {setUserData} = useContext(UserContext);

  const handleLoginByEmailAndPassword = async () => {
    signInWithEmailAndPassword(
      navigation,
      email,
      password,
      setUserData,
      setModalVisible,
      setMessageError,
    );
  };

  const {setUserVerified} = useContext(UserVerified);

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
        action={
          isToClearEmailAndPassword
            ? clearEmailAndPassword
            : () => setModalVisible(false)
        }
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

          <Pressable
            onPress={() =>
              signInWithGoogle(navigation, setUserVerified, setUserData)
            }>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="96px"
              height="96px">
              <Path d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
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

          <Button text="Entrar" action={handleLoginByEmailAndPassword} />
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
