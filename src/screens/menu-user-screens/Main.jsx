import {View, StyleSheet, Pressable, Text, Modal} from 'react-native';

import {useContext, useState} from 'react';

import {Title} from '../../components/Title';

import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {UserContext} from '../../context/UserContext';
import {useNavigation} from '@react-navigation/native';

import {ChangePassword} from '../../components/Modals/ChangePassword';

export const Main = () => {
  const [modalChangePassword, setmodalChangePassword] = useState(false);

  const {userData, setUserData} = useContext(UserContext);

  const navigation = useNavigation();

  const handleLogOut = async () => {
    if (userData) {
      const keys = ['@barber_app__email', '@barber_app__password'];
      await AsyncStorage.multiRemove(keys);

      auth()
        .signOut()
        .then(() => {
          setUserData(null);
          navigation.navigate('InitialScreen');
        });
    }
  };

  const handleChangePassword = () => {
    firestore()
      .collection('users')
      .doc(userData.uid)
      .get()
      .then(({_data}) => {
        if (_data.password === null || !_data.password) {
          setmodalChangePassword(true);

          firebase
            .auth()
            .sendPasswordResetEmail(_data.email)
            .then('Email Send!!');
        } else navigation.navigate('ChangePassword');
      });
  };

  return (
    <>
      <ChangePassword
        modalChangePassword={modalChangePassword}
        setmodalChangePassword={setmodalChangePassword}
      />
      <View style={style.container}>
        <Title title={`Olá ${userData?.name}`} />

        <View style={style.contentLinks}>
          <Pressable style={style.link}>
            <Text
              style={style.text}
              onPress={() => navigation.navigate('YourSchedules')}>
              Seus agendamentos
            </Text>
          </Pressable>

          <Pressable
            style={style.link}
            onPress={() => navigation.navigate('YourInformation')}>
            <Text style={style.text}>Suas informações</Text>
          </Pressable>

          <Pressable style={style.link} onPress={handleChangePassword}>
            <Text style={style.text}>Redefinir senha</Text>
          </Pressable>

          <Pressable
            style={style.link}
            onPress={() => navigation.navigate('FeedBack')}>
            <Text style={style.text}>Enviar um feedback</Text>
          </Pressable>

          <Pressable style={style.link} onPress={handleLogOut}>
            <Text style={style.text}>Sair</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    flex: 1,
    alignItems: 'center',
  },

  contentLinks: {
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
  },

  link: {
    width: '80%',
    paddingVertical: 17,
    borderWidth: 3,
    borderColor: '#E95401',
    marginVertical: 5,
    borderRadius: 20,
  },

  text: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
  },
});
