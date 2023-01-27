import {
  Text,
  Pressable,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';

import {useContext, useState} from 'react';

import {Title} from '../../components/Title';
import {Button} from '../../components/Button';

import {UserContext} from '../../context/UserContext';

import {MessageError} from '../../components/MessageError';

import {signInWithEmailAndPassword} from '../../functions/Login/signInWithEmailAndPassword';

import {SignInWithGoogle} from '../../components/Modals/SignInWithGoogle';

export const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [messageError, setMessageError] = useState('');

  const {setUserData} = useContext(UserContext);

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

      <ScrollView contentContainerStyle={style.container}>
        <Title title="Preencha os campos" />

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

          <Button
            text="Entrar"
            action={() =>
              signInWithEmailAndPassword(
                navigation,
                email,
                password,
                setUserData,
                setModalVisible,
                setMessageError,
              )
            }
          />
        </View>

        <Text style={style.text}>Ou entre usando sua conta do Google</Text>

        <SignInWithGoogle />
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    paddingBottom: 20,
    flex: 1,
  },

  form: {
    width: '80%',
    alignItems: 'center',
    marginTop: '5%',
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

  text: {
    color: '#FFFFFF',
    marginTop: 40,
    fontWeight: '700',
    fontSize: 15,
  },
});
