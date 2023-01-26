import {Modal, StyleSheet, Text, View} from 'react-native';

import {Button} from '../Button';

export const EmailVerificationModal = ({
  email,
  handleContinue,
  MessageErrorEmailVerified,
  modalMessageEmailVerification,
}) => {
  return (
    <Modal
      animationType="slide"
      visible={modalMessageEmailVerification}
      transparent={true}>
      <View style={style.modalVerifyEmail}>
        <Text style={style.textModalVerifyEmail}>
          Enviamos um email de verificação para:
        </Text>
        <Text style={style.textEmail}>{email}</Text>
        <Text style={style.subText}>
          Sua conta foi criada com sucesso, agora é ó você ir na sua caixa de
          mensagens e verifica-la para poder usar o aplicativo.
        </Text>

        <Button text={'Continuar'} action={handleContinue} />

        {MessageErrorEmailVerified ? (
          <Text style={style.messageErrorEmailVerified}>
            Seu email não foi verificado!
          </Text>
        ) : null}
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  modalMessageEmailVerification: {
    color: 'red',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 5,
  },

  modalVerifyEmail: {
    backgroundColor: '#1E1E1E',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },

  textModalVerifyEmail: {
    fontWeight: '700',
    fontSize: 25,
    textAlign: 'center',
  },

  textEmail: {
    fontWeight: '900',
    fontSize: 25,
    textAlign: 'center',
    color: '#FFFFFF',
    marginVertical: 20,
  },

  subText: {
    fontSize: 12,
    width: '80%',
  },

  messageErrorEmailVerified: {
    color: 'red',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 5,
  },
});
