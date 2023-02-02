import {useContext, useState} from 'react';
import {View, Modal, StyleSheet, Text, TextInput} from 'react-native';
import { UserContext } from '../../context/UserContext';
import {Button} from '../Button';
import {Title} from '../Title';

export const ChangeName = ({visible, setNameChange}) => {
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState('');


  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={style.container}>
        <Title title={'Seu nome foi atualizado com sucesso!'} />
        <Text style={style.description}>
          Acabamos de enviar um email de verificação para você. Seu email só
          eserá atualizado caso você verifique este novo endereço.
        </Text>
        <Button
          text={'OK'}
          action={() => setNameChange(false)}
        />
        {/* {error ? <Text style={{color: 'red'}}>{messageError}</Text> : null} */}
      </View>
    </Modal>
  );
};

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
    marginTop: 20,
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
