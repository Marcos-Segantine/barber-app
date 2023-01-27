import {View, Text, StyleSheet, TextInput} from 'react-native';

import {globalStyles} from '../globalStyles';

import {Title} from '../../components/Title';
import {Button} from '../../components/Button';
import {useContext, useState} from 'react';

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {UserContext} from '../../context/UserContext';

import {MessageError} from '../../components/MessageError';

export const ChangePassword = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [comfirmNewPassword, setComfirmPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [messageError, setMessageError] = useState('');

  const {userData, setUserData} = useContext(UserContext);

  const handleNewPassword = () => {
    if (
      !oldPassword.trim() ||
      !newPassword.trim() ||
      !comfirmNewPassword.trim()
    ) {
      setModalVisible(true);
      setMessageError('Por favor preencha todos os campos');

      return;
    } else if (newPassword !== comfirmNewPassword) {
      setModalVisible(true);
      setMessageError('Os campos da nova senha não são iguais');

      return;
    } else if (userData.password !== oldPassword) {
      setModalVisible(true);
      setMessageError('Senha Incorreta');

      return;
    } else if (newPassword.length < 6) {
      setModalVisible(true);
      setMessageError('Nova senha muito pequena');

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

            setUserData({...userData, password: newPassword});

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
      <MessageError
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        messageError={messageError}
        action={() => setModalVisible(false)}
      />
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
