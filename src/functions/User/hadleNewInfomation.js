import {findErrorChangeInformations} from './findErrorChangeInformations';
import {verifyPhoneNumber} from './verifyPhoneNumber';

import {changeEmail} from './changeEmail';
import {changeName} from './changeName';

export const hadleNewInfomation = async (
  phone,
  phoneNotFormated,
  name,
  email,

  setPhone,
  setName,
  setEmail,

  setPhoneChange,
  setNameChange,
  setEmailChange,

  setError,
  setMessageError,

  setIsToShowLoading,

  userData,
  setUserData,

  setConfirm,
) => {
  const theresError = findErrorChangeInformations(
    phone,
    phoneNotFormated,
    name,
    email,
    setError,
    setMessageError,
  );
  if (!theresError) return;

  setError(false)
  setMessageError("")

  if (phone.trim()) {
    setIsToShowLoading(true);

    await verifyPhoneNumber('+55' + phone, setConfirm);

    setPhoneChange(true);
    setIsToShowLoading(false);

    setPhone("")

    if (name.trim()) {
      setNameChange(true);
      changeName(name, userData, setUserData);
      setName("")
    }

    if (email.trim()) {
      setEmailChange(true);
      changeEmail(email);
      setEmail("")
    }

    return;
  }

  if (name.trim()) {
    changeName(name, userData, setUserData);
    setNameChange(true);
    setName("")
  }

  if (email.trim()) {
    setEmailChange(true);
    changeEmail(email);
    setEmail("")
  }
};
