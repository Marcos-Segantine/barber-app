import {Modal, View, Text, StyleSheet, TextInput} from 'react-native';

import {Title} from '../Title';
import {Button} from '../Button';

import {changePhoneNumber} from '../../functions/User/changePhoneNumber';
import {changeEmail} from '../../functions/User/changeEmail';

import {useState} from 'react';

export const ChangeInformations = ({
  modalVisible,
  confirm,
  code,
  setCode,
  email,
  setEmail,
  phone,
}) => {
  const [error, setError] = useState('');
  const [messageError, setMessageError] = useState('');

  return (
    <Modal visible={modalVisible} transparent={true} animationType="slide">
      <View style={style.container}>
        {email ? (
          <View style={{alignItems: 'center', width: '100%'}}>
            <Title title={'Enviamos em email de verificação para você'} />
            <Text style={style.description}>
              Lembre-se que você só consiguira entrar na sua conta com o email
              verificado
            </Text>
            {error ? <Text style={{color: 'red'}}>{messageError}</Text> : null}
            <Button
              text={'Salvar email novo'}
              action={() =>
                changeEmail(email, setEmail, setError, setMessageError)
              }
            />
          </View>
        ) : null}

        {true ? (
          <View style={{alignItems: 'center', width: '100%', marginTop: 50}}>
            <Title title={'Insira o codigo de verificação'} />
            <Text style={style.description}>
              Acabamos de enviar um codigo de verificação para você digite-o
              abaixo para atualizar seu numero.
            </Text>
            <TextInput
              style={style.input}
              onChangeText={text => setCode(text)}
              keyboardType="phone-pad"
            />
            {error ? <Text style={{color: 'red'}}>{messageError}</Text> : null}
            <Button
              text={'Salvar número novo'}
              action={() =>
                changePhoneNumber(confirm, code, setError, setMessageError, phone)
              }
              waitingData={!!code}
            />
          </View>
        ) : null}
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  description: {
    width: '85%',
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
});
