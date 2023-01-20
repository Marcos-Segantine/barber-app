import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';

import {Title} from '../../../components/Title';
import {Button} from '../../../components/Button';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [comfirmPassword, setComfirmPassword] = useState('');

  const handleResgister = () => {
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

        navigation.navigate('Services');
      })
      .catch(err => console.log(err));
  };

  return (
    <ScrollView contentContainerStyle={style.container}>
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

      <Button text="Cadastrar" action={handleResgister} />
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
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
});
