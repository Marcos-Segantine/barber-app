import {Modal, Text, StyleSheet, TextInput, View} from 'react-native';

import {Title} from '../Title';
import {Button} from '../Button';

import {changePhoneNumber} from '../../functions/User/changePhoneNumber';

import {useContext, useState} from 'react';
import {UserContext} from '../../context/UserContext';

export const ChangeInformations = ({
  confirm,
  phone,
  name,
  email,
  setPhoneChange,
  setNameChange,
  setEmailChange,
}) => {
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState({});

  const [code, setCode] = useState('');

  const {userData, setUserData} = useContext(UserContext);

  return (
    <>
      <Modal visible={name} transparent={true} animationType="slide">
        <View style={style.container}>
          <Title title={'Seu nome foi atualizado com sucesso'} />

          <Button text={'Confirmar'} action={() => setNameChange(false)} />
        </View>
      </Modal>

      <Modal
        visible={email && name === false}
        transparent={true}
        animationType="slide">
        <View style={style.container}>
          <Title title={'Email de verificação enviado com sucesso'} />

          <Button text={'Confirmar'} action={() => setEmailChange(false)} />
        </View>
      </Modal>

      <Modal
        visible={phone && email === false && name === false}
        transparent={true}
        animationType="slide">
        <View style={style.container}>
          <Title title={'Email de verificação enviado com sucesso'} />

          <TextInput
            placeholder="Código"
            onChangeText={text => setCode(text)}
            style={style.input}
          />
          {messageError.type === 'phone' ? (
            <Text style={style.messageError}>{messageError.message}</Text>
          ) : null}

          <Button
            text={'Confirmar'}
            action={async () => {
              await changePhoneNumber(
                confirm,
                code,
                setError,
                setMessageError,
                phone,
                userData,
                setUserData,
              );
              error ? null : setPhoneChange(false);
            }}
          />
        </View>
      </Modal>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    textAlign: 'center',
    width: '90%',
  },

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

  messageError: {
    color: 'red',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 5,
  },
});
