import {changePhoneNumber} from './changePhoneNumber';

export const verifyCodeForGoogleSignIn = async (
  confirm,
  code,
  setError,
  phone,
  userData,
  setGetCodeModalVisible,
  navigation,
) => {
  if (!code) {
    setError('Por favor preencha o campo acima.');
    return;
  }

  try {
    await changePhoneNumber(confirm, code, setError, phone, userData);

    setGetCodeModalVisible(false);
    navigation.navigate('Services');
  } catch (error) {
    if (error === 'Código inválido') {
      setError('Código inválido');
      return;
    }
    console.error(error);
    setError(
      'Ocorreu um erro ao verificar seu número. Por favor tente novamente mais tarde.',
    );
  }
};
