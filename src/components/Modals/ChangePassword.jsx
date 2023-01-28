import {Modal, StyleSheet, Text, View} from 'react-native';

import {Button} from '../Button';
import {Title} from '../Title';

export const ChangePassword = ({
  modalChangePassword,
  setmodalChangePassword,
}) => {
  return (
    <Modal
      visible={modalChangePassword}
      transparent={false}
      animationType="slide">
      <View style={style.container}>
        <Title
          title={
            'Usuários que utilizaram a conta do Google para usar o app não prescisam mudar de senha.'
          }
        />

        <Text style={style.text}>
          Basta clicar na opção "Entrar usando o Google" na tela de login ou
          cadastro.
        </Text>

        <Button text={'OK'} action={() => setmodalChangePassword(false)} />
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
  },
});
