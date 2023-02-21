import { Modal, Text, StyleSheet, TextInput, View } from 'react-native';
import { Title } from '../Title';
import { Button } from '../Button';
import { changePhoneNumber } from '../../functions/User/changePhoneNumber';
import { useContext, useState, useCallback, useMemo } from 'react';
import { UserContext } from '../../context/UserContext';

const ChangeInformations = React.memo(({
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
  const { userData, setUserData } = useContext(UserContext);

  const handleNameChange = useCallback(() => setNameChange(false), [setNameChange]);
  const handleEmailChange = useCallback(() => setEmailChange(false), [setEmailChange]);

  const handlePhoneChange = useCallback(async () => {
    await changePhoneNumber(
      confirm,
      code,
      setError,
      setMessageError,
      phone,
      userData,
      setUserData
    );
    if (!error) {
      setPhoneChange(false);
    }
  }, [confirm, code, phone, userData, setUserData, error, setPhoneChange]);

  const showNameModal = useMemo(() => name, [name]);
  const showEmailModal = useMemo(() => email && !name, [email, name]);
  const showPhoneModal = useMemo(() => phone && !email && !name, [phone, email, name]);

  const messageErrorType = messageError.type;
  const messageErrorMessage = messageError.message;

  return (
    <>
      <Modal visible={showNameModal} transparent={true} animationType="slide">
        <View style={styles.container}>
          <Title title={'Seu nome foi atualizado com sucesso'} />
          <Button text={'Confirmar'} action={handleNameChange} />
        </View>
      </Modal>

      <Modal visible={showEmailModal} transparent={true} animationType="slide">
        <View style={styles.container}>
          <Title title={'Email de verificação enviado com sucesso'} />
          <Button text={'Confirmar'} action={handleEmailChange} />
        </View>
      </Modal>

      <Modal visible={showPhoneModal} transparent={true} animationType="slide">
        <View style={styles.container}>
          <Title title={'Telefone de verificação enviado com sucesso'} />

          <TextInput
            placeholder="Código"
            onChangeText={(text) => setCode(text)}
            style={styles.input}
          />
          {messageErrorType === 'phone' && (
            <Text style={styles.messageError}>{messageErrorMessage}</Text>
          )}

          <Button text={'Confirmar'} action={handlePhoneChange} />
        </View>
      </Modal>
    </>
  );
});
const styles = StyleSheet.create({
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
