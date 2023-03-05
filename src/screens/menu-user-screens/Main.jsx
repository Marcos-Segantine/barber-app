import { View, StyleSheet, Pressable, Text } from 'react-native';

import { useContext, useState } from 'react';

import { Title } from '../../components/Title';

import { UserContext } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';

import { ChangePassword } from '../../components/Modals/ChangePassword';

import { handleLogOut } from '../../functions/User/handleLogOut';
import { handleChangePassword } from '../../functions/User/handleChangePassword';

export const Main = () => {
  const [modalChangePassword, setModalChangePassword] = useState(false);

  const { userData, setUserData } = useContext(UserContext);

  const navigation = useNavigation();

  return (
    <>
      <ChangePassword
        modalChangePassword={modalChangePassword}
        setModalChangePassword={setModalChangePassword}
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

          <Pressable style={style.link} onPress={() => handleChangePassword(userData, setModalChangePassword, navigation)}>
            <Text style={style.text}>Redefinir senha</Text>
          </Pressable>

          <Pressable
            style={style.link}
            onPress={() => navigation.navigate('FeedBack')}>
            <Text style={style.text}>Enviar um feedback</Text>
          </Pressable>

          <Pressable style={style.link} onPress={() => handleLogOut(setUserData, navigation)}>
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
