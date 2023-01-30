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
            'Email para atualização de senha enviado com sucesso'
          }
        />

        <Text style={style.text}>
          Vale resaltar que usuários que usam o Google para entrar em sua conta não prescisam de senha para acessar o app. Basta clicar na opção 'entrar com o Google' na tela de login ou registro
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
