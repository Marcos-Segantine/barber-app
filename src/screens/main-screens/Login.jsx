import {
  Text,
  Pressable,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {useContext, useState} from 'react';

import {Title} from '../../components/Title';
import {Button} from '../../components/Button';

import {UserContext} from '../../context/UserContext';

import {MessageError} from '../../components/MessageError';

import {signInWithEmailAndPassword} from '../../functions/login/signInWithEmailAndPassword';
import {clearEmailAndPassword} from '../../functions/login/clearEmailAndPassword';

import {SignInWithGoogle} from '../../components/modals/SignInWithGoogle';

export const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [messageError, setMessageError] = useState('');

  const {setUserData} = useContext(UserContext);

  return (
    <>
      <MessageError
        modalVisible={modalVisible}
        messageError={messageError}
        setModalVisible={setModalVisible}
        action={() =>
          clearEmailAndPassword(setEmail, setPassword, setModalVisible)
        }
      />

      <ScrollView contentContainerStyle={style.container}>
        <Title title="Autenticação" />

        <View style={style.form}>
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            style={style.input}
            placeholder="Email"
            placeholderTextColor={'#FFFFFF80'}
            keyboardType="email-address"
            cursorColor="#ff9000"
          />

          <TextInput
            value={password}
            onChangeText={text => setPassword(text)}
            style={style.input}
            placeholder="Digite sua senha"
            placeholderTextColor={'#FFFFFF80'}
            secureTextEntry={true}
            cursorColor="#ff9000"
          />

          <View style={style.linksHelpUser}>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={style.linkHelp}>Cadastrar</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={style.linkHelp}>Esqueci minha senha</Text>
            </Pressable>
          </View>
          <View style={style.actionArea}>
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => {
                signInWithEmailAndPassword(
                  navigation,
                  email,
                  password,
                  setUserData,
                  setModalVisible,
                  setMessageError,
                );
              }}
              style={style.button}>
              <Text style={style.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <SignInWithGoogle />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    paddingBottom: 24,
  },

  actionArea: {
    width: '100%',
    marginTop: 24,
    flexDirection: 'row',
  },

  form: {
    width: '80%',
    alignItems: 'center',
    marginTop: '5%',
  },

  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 2,
    borderBottomColor: '#ff9000',
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Satoshi-Regular',
  },

  button: {
    width: '80%',
    height: 60,
    backgroundColor: '#ff9000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },

  linksHelpUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 24,
  },

  linkHelp: {
    color: '#ffffff',
    fontFamily: 'Satoshi-Regular',
  },

  text: {
    color: '#FFFFFF',
    marginTop: 40,
    fontWeight: '700',
    fontSize: 15,
  },
});
