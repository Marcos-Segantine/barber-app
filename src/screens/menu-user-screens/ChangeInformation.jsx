import {View, StyleSheet, TextInput, Text} from 'react-native';
import {useContext, useState} from 'react';

import {globalStyles} from '../globalStyles';

import {Title} from '../../components/Title';
import {Button} from '../../components/Button';

import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

import {ChangeInformations} from '../../components/Modals/ChangeInformations';

import {UserContext} from '../../context/UserContext';

import {changeEmail} from '../../functions/User/changeEmail';
import {changeName} from '../../functions/User/changeName';

export const ChangeInformation = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [confirm, setConfirm] = useState(null);

  const [phoneChange, setPhoneChange] = useState(false);
  const [emailChange, setEmailChange] = useState(false);
  const [nameChange, setNameChange] = useState(false);

  const [error, seterror] = useState(false);
  const [messageError, setMessageError] = useState('');

  const {userData, setUserData} = useContext(UserContext);

  const verifyPhoneNumber = async phoneNumber => {
    const confirmation = await auth().verifyPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  };

  const hadleNewInfomation = async () => {
    const user = firebase.auth().currentUser;

    if (phone.trim()) {
      await verifyPhoneNumber('+' + phone);
      setPhoneChange(true);

      if (name.trim()) {
        setNameChange(true);
        changeName(name, userData, setUserData);
      }

      if (email.trim()) {
        user
          .updateEmail(email)
          .then(function () {
            user.sendEmailVerification().then(() => {
              console.log("EMAIL VERIFICAION SEND");
            })
            setEmailChange(true);
            changeEmail(email);
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      return;
    }

    if (name.trim()) {
      changeName(name, userData, setUserData);
      setNameChange(true);
    }

    if (email.trim()) {
      firebase
        .auth()
        .currentUser.updateEmail(email)
        .then(function () {
          setEmailChange(true);
          user.sendEmailVerification().then(() => {
            console.log("EMAIL VERIFICAION SEND");
          })
          changeEmail(email);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <View style={globalStyles.container}>
      <ChangeInformations
        confirm={confirm}
        phone={phoneChange}
        name={nameChange}
        email={emailChange}
        setPhoneChange={setPhoneChange}
        setNameChange={setNameChange}
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
      {error ? <Text style={style.errorMessage}>{messageError}.</Text> : null}
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

  errorMessage: {
    color: 'red',
  },
});
