import {useContext, useState} from 'react';
import {View, Modal, StyleSheet, Text, TextInput} from 'react-native';
import {UserContext} from '../../context/UserContext';
import {changePhoneNumber} from '../../functions/User/changePhoneNumber';
import {Button} from '../Button';
import {Title} from '../Title';

export const ChangePhone = ({
  visible,
  confirm,
  setCode,
  code,
  phone,
  setPhoneChange,
}) => {
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const {userData, setUserData} = useContext(UserContext);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={style.container}>
        <Title title={'Insira o codigo de verificação'} />
        <Text style={style.description}>
          Acabamos de enviar um codigo de verificação para você digite-o abaixo
          para atualizar seu numero.
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
            changePhoneNumber(
              confirm,
              code,
              setError,
              setMessageError,
              phone,
              userData,
              setUserData,
              setPhoneChange,
            )
          }
        />
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    flex: 1,
  },

  description: {
    width: '85%',
    marginTop: 30,
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
