import { Modal, StyleSheet, Text, View } from 'react-native';

import { Button } from '../Button';
import { Title } from '../Title';

import auth from '@react-native-firebase/auth';

export const ChangePassword = ({
  modalChangePassword,
  setModalChangePassword,
}) => {

  const handleSendEmailToChangePassword = async () => {
    const user = auth().currentUser
    try {
      await auth().sendPasswordResetEmail(user.email)
      setModalChangePassword(false)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal
      visible={modalChangePassword}
      transparent={false}
      animationType="slide">
      <View style={style.container}>
        <Title title={'Um email sera enviado para que voce possa alterar a senha'} />

        <Text style={style.text}>
          Ao clicar no link presente voce sera redirecionado a uma pagina para que possa alterar sua senha
        </Text>

        <Button text={'OK'} action={handleSendEmailToChangePassword} />
      </View>
    </Modal>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  text: {
    marginTop: 20,
    textAlign: 'center'
  },
});
