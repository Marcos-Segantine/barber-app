import {Modal, StyleSheet, Text, View} from 'react-native';
import {useMemo} from 'react';

import auth from '@react-native-firebase/auth';

import {Button} from '../Button';

export const EmailVerificationModal = ({
  email,
  password,
  MessageErrorEmailVerified,
  setModalMessageEmailVerification,
  setMessageErrorEmailVerified,
  modalMessageEmailVerification,
}) => {
  const checkEmailVerified = async () => {
    try {
      const {user} = await auth().signInWithEmailAndPassword(email, password);

      if (user.emailVerified) {
        setMessageErrorEmailVerified(false);
        setModalMessageEmailVerification(false);
      } else {
        setModalMessageEmailVerification(true);
        setMessageErrorEmailVerified('Seu email não foi verificado!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const modalContent = useMemo(() => {
    return (
      <View style={style.modalVerifyEmail}>
        <Text style={style.textModalVerifyEmail}>
          Enviamos um email de verificação para:
        </Text>
        <Text style={style.textEmail}>{email}</Text>
        <Text style={style.subText}>
          Sua conta foi criada com sucesso, agora é ó você ir na sua caixa de
          mensagens e verifica-la para poder usar o aplicativo.
        </Text>
        <Button text={'Continuar'} action={checkEmailVerified} />
        {MessageErrorEmailVerified && (
          <Text style={style.messageErrorEmailVerified}>
            Seu email não foi verificado!
          </Text>
        )}
      </View>
    );
  }, [email, checkEmailVerified, MessageErrorEmailVerified]);

  return (
    <Modal
      animationType="slide"
      visible={modalMessageEmailVerification}
      transparent={true}>
      {modalContent}
    </Modal>
  );
};

const style = StyleSheet.create({
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
