import {StyleSheet, Text, View, Pressable} from 'react-native';

export const Footer = () => {
  return (
    <View style={style.container}>
      <Text style={style.message}>Todos os direitos reservados @empresa</Text>

      <Pressable style={style.buttonContact}>
        <Text style={style.textContact}>Contato</Text>
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    paddingTop: 25,
    paddingBottom: 20,
  },

  message: {
    color: '#FFFFFF',
    fontSize: 10,
  },

  buttonContact: {
    borderColor: '#E95401',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 20,
    marginTop: 11,
    alignItems: 'center',
  },

  textContact: {
    color: '#FFFFFF',
  },
});
