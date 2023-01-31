import {View, StyleSheet, TextInput} from 'react-native';
import {useState} from 'react';

import {globalStyles} from '../globalStyles';

import {Title} from '../../components/Title';
import {Button} from '../../components/Button';

import auth from '@react-native-firebase/auth';

import {ChangeInformations} from '../../components/Modals/ChangeInformations';

import {changeEmail} from '../../functions/User/changeEmail';

export const ChangeInformation = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const verifyPhoneNumber = async phoneNumber => {
    const confirmation = await auth().verifyPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  };

  const hadleNewInfomation = async () => {
    if (email.trim()) {
      changeEmail(email);
      setModalVisible(true);
    }

    if (phone.trim()) {
      verifyPhoneNumber('+' + phone);
      setModalVisible(true);
    }
  };

  return (
    <View style={globalStyles.container}>
      <ChangeInformations
        modalVisible={modalVisible}
        confirm={confirm}
        code={code}
        setCode={setCode}
        email={email}
        setEmail={setEmail}
        phone={phone}
      />
      <Title title={'Mudar informações'} />
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
