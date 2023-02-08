import firebase from '@react-native-firebase/app';

export const findErrorChangeInformations = (
  phone,
  phoneNotFormated,
  name,
  email,
  setError,
  setMessageError,
) => {

  const user = firebase.auth().currentUser
  
  const regEmail =
  /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
  const isEmailValid = regEmail.exec(email);
  
  if (!isEmailValid && email.trim() !== '') {
    setError(true);
    setMessageError('Email Inválido');
    return null;
  }
  
  const regPhone = /^(\(\d{2}\))\s(\d{4,5})-(\d{4})$/;
  const isPhoneValid = regPhone.exec(phone);
  console.log(isEmailValid);
  
  if (!isPhoneValid && phone.trim() !== '') {
    setError(true);
    setMessageError('Número de telefone inválido');
    return null;
  }else if(user.phoneNumber === `+55${phoneNotFormated}`){
    setError(true);
    setMessageError('Esse númeor já está em uso.');
    return null;
  }

  const regName =
    /^(?:(?!\b(otario|cuzao|cusao|paunocu|filhodaputa|puta|merda|prostituta|buceta|rola|gozar)\b).)*$/iu;

  const isNameValid = regName.exec(name);
  
  if (isNameValid === null && name.trim() !== '') {
    setError(true);
    setMessageError('Nome Inválido');
    return null;
  }

  return true
};
