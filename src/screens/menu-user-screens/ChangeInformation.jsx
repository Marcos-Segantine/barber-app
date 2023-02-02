import {View, StyleSheet, TextInput} from 'react-native';
import {useContext, useState} from 'react';

import {globalStyles} from '../globalStyles';

import {Title} from '../../components/Title';
import {Button} from '../../components/Button';

import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

import {changeName} from '../../functions/User/changeName';

import {ChangePhone} from '../../components/Modals/ChangePhone';
import {ChangeEmail} from '../../components/Modals/ChangeEmail';
import {ChangeName} from '../../components/Modals/ChangeName';
import {UserContext} from '../../context/UserContext';

export const ChangeInformation = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  const [phoneChange, setPhoneChange] = useState(false);
  const [emailChange, setEmailChange] = useState(false);
  const [nameChange, setNameChange] = useState(false);

  const {userData, setUserData} = useContext(UserContext);

  const verifyPhoneNumber = async phoneNumber => {
    const confirmation = await auth().verifyPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  };

  const hadleNewInfomation = () => {
    if (name.trim()) {
      changeName(name, userData, setUserData);
      setNameChange(true);
    }

    if (email.trim()) {
      firebase
        .auth()
        .currentUser.updateEmail(email)
        .then(function () {
          console.log('EMAIL UPDATED');
          setEmailChange(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    if (phone.trim()) {
      verifyPhoneNumber('+' + phone).then(() => {
        setPhoneChange(true);
      });
    }
  };

  return (
    <View style={globalStyles.container}>
      <ChangeName visible={nameChange} setNameChange={setNameChange} />

      <ChangePhone
        visible={phoneChange}
        confirm={confirm}
        setCode={setCode}
        code={code}
        phone={phone}
        setPhoneChange={setPhoneChange}
      />

      <ChangeEmail
        visible={emailChange}
        email={email}
        setEmailChange={setEmailChange}
      />

      <Title title="Mudar informações" />
      <TextInput
        value={name}
        style={style.input}
        placeholder="Nome"
        onChangeText={text => setName(text)}
      />
      <TextInput
        value={email}
        style={style.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        value={phone}
        style={style.input}
        placeholder="Telefone"
        onChangeText={text => setPhone(text)}
        keyboardType="phone-pad"
      />
      <Button text="Salvar" action={hadleNewInfomation} />
    </View>
  );
};

const style = StyleSheet.create({
  input: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#E95401',
    width: '80%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 15,
  },
});
