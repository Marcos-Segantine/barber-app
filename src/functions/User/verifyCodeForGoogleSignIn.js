import {changePhoneNumber} from './changePhoneNumber';

export const verifyCodeForGoogleSignIn = async (
  confirm,
  code,
  setError,
  phone,
  userData,
  setUserData,
  setGetCodeModalVisible,
  navigation,
) => {
  if (!code) {
    setError('Por favor preencha o campo acima.');
    return;
  }

  try {
    await changePhoneNumber(
      confirm,
      code,
      setError,
      phone,
      userData,
      setUserData,
    );

    if (error) return;

    setGetCodeModalVisible(false);
    navigation.navigate('Services');
  } catch (error) {
    console.log();
    console.error(error);
    setError(
      'Ocorreu um erro ao verificar seu número. Por favor tente mais tarde.',
    );
  }
};
