import {Modal, View, Text, StyleSheet} from 'react-native';

import {Title} from '../Title';
import {Button} from '../Button';
import {useNavigation} from '@react-navigation/native';

export const AlertMessagePasswordCanChange = ({
  modalVisible,
  setModalVisible,
}) => {
  const navigation = useNavigation();

  const handleCLick = () => {
    setModalVisible(false);
    navigation.navigate('InitialScreen');
  };

  return (
    <Modal visible={modalVisible} transparent={false} animationType="slide">
      <View style={style.container}>
        <Title title={'Confira sua caixa de email para alterar sua senha'} />

        <Text style={style.text}>
          <Text style={{fontWeight: '700', color: '#FFFFFF', fontSize: 20}}>
            OBS:{' '}
          </Text>
          Essa ação{' '}
          <Text style={{fontWeight: '700', color: '#FFFFFF'}}>
            não é obrigatoria
          </Text>
          , caso você saia de sua conta e queira entrar novamente basta clicar
          na opção ""Entrar usando sua conta do Google. Porém caso você queira
          poder entrar na sua conta(essa feita com o Google) usando email e
          senha deverá definir uma nova senha.
        </Text>
        <Button text={'OK'} action={handleCLick} />
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
  },

  text: {
    width: '85%',
    marginTop: 20,
    marginBottom: 70,
  },
});
