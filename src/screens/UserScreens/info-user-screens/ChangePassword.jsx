import {View, Text, StyleSheet, TextInput} from 'react-native';

import {globalStyles} from '../../globalStyles';

import {Title} from '../../../components/Title';
import {Button} from '../../../components/Button';
import {useContext, useState} from 'react';

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {UserContext} from '../../../context/UserContext';

export const ChangePassword = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [comfirmNewPassword, setComfirmPassword] = useState('');

  const {userData, setUserData} = useContext(UserContext);

  const handleNewPassword = () => {
    if (
      !oldPassword.trim() ||
      !newPassword.trim() ||
      !comfirmNewPassword.trim()
    ) {
      console.log('CAMPOS VAZIOS');

      return;
    } else if (newPassword !== comfirmNewPassword) {
      console.log('SENHAS NÃO SAO IGUAIS');

      return;
    } else if (userData.password !== oldPassword) {
      console.log('SENHA INCORRETA');

      return;
    }

    const user = firebase.auth().currentUser;

    user
      .updatePassword(newPassword)
      .then(() => {
        firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then(({_data}) => {
            _data.password = newPassword;

            setUserData({...userData, password: newPassword})

            firestore()
              .collection('users')
              .doc(user.uid)
              .update({..._data})
              .then(() => {
                console.log('User password updated');

                navigation.navigate('Main');
              });
          });
      })
      .catch(error => {
        console.log('Erro ao atualizar a senha: ', error);
      });
  };

  return (
    <View style={globalStyles.container}>
      <Title title={'Redefinir senha'} />

      <View style={style.content}>
        <View style={{width: '80%'}}>
          <Text style={style.textOrietation}>Digite sua senha atual.</Text>
          <TextInput
            placeholder="Senha atual"
            value={oldPassword}
            onChangeText={setOldPassword}
            style={style.input}
          />
        </View>

        <View style={{width: '80%'}}>
          <Text style={style.textOrietation}>Informe sua nova senha.</Text>
          <TextInput
            placeholder="Senha nova"
            value={newPassword}
            onChangeText={setNewPassword}
            style={style.input}
          />
          <TextInput
            placeholder="Confirme sua nova senha"
            value={comfirmNewPassword}
            onChangeText={setComfirmPassword}
            style={style.input}
          />
        </View>
      </View>

      <Button text="Comfirmar" action={handleNewPassword} waitingData={true} />
    </View>
  );
};

const style = StyleSheet.create({
  content: {
    marginTop: 25,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },

  textOrietation: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 15,
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
});
