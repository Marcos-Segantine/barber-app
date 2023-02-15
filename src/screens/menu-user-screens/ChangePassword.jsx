import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {globalStyles} from '../globalStyles';
import {Title} from '../../components/Title';
import {Button} from '../../components/Button';
import {UserContext} from '../../context/UserContext';
import {MessageError} from '../../components/MessageError';
import {firebase, firestore} from '@react-native-firebase/auth';

export const ChangePassword = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [messageError, setMessageError] = useState('');
  const {userData, setUserData} = useContext(UserContext);

  const handleNewPassword = async () => {
    if (
      !oldPassword.trim() ||
      !newPassword.trim() ||
      !confirmNewPassword.trim()
    ) {
      setModalVisible(true);
      setMessageError('Por favor preencha todos os campos');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setModalVisible(true);
      setMessageError('Os campos da nova senha não são iguais');
      return;
    }

    if (userData.password !== oldPassword) {
      setModalVisible(true);
      setMessageError('Senha Incorreta');
      return;
    }

    if (newPassword.length < 6) {
      setModalVisible(true);
      setMessageError('Nova senha muito pequena');
      return;
    }

    try {
      const user = firebase.auth().currentUser;
      await user.updatePassword(newPassword);
      await firestore()
        .collection('users')
        .doc(user.uid)
        .update({password: newPassword});
      setUserData({...userData, password: newPassword});
      navigation.navigate('Main');
    } catch (error) {
      console.log('Erro ao atualizar a senha: ', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.container}>
      <MessageError
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        messageError={messageError}
        action={() => setModalVisible(false)}
      />
      <Title title={'Redefinir senha'} />

      <View style={style.content}>
        <View style={style.inputContainer}>
          <Text style={style.textOrientation}>Digite sua senha atual.</Text>
          <TextInput
            placeholder="Senha atual"
            value={oldPassword}
            onChangeText={setOldPassword}
            style={style.input}
            secureTextEntry
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.textOrientation}>Informe sua nova senha.</Text>
          <TextInput
            placeholder="Senha nova"
            value={newPassword}
            onChangeText={setNewPassword}
            style={style.input}
            secureTextEntry
          />
          <TextInput
            placeholder="Confirme sua nova senha"
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            style={style.input}
            secureTextEntry
          />
        </View>
      </View>

      <Button text="Comfirmar" action={handleNewPassword} waitingData />
    </KeyboardAvoidingView>
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
