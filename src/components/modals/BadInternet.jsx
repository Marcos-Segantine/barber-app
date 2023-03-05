import {Modal, StyleSheet, Text, View} from 'react-native';

import {Title} from '../Title';

export const BadInternet = ({visible}) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={style.container}>
        <Title title={'Erro de conexão'} />
        <Text style={style.text}>
          Sua conexão com a internet apresenta falhas, por favor conecte-se
          novamente
        </Text>
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
    textAlign: 'center',
    width: '90%',
  },
});
