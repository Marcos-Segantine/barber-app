import {findErrorChangeInformations} from './findErrorChangeInformations';
import {verifyPhoneNumber} from './verifyPhoneNumber';
import {changeEmail} from './changeEmail';
import {changeName} from './changeName';

export const handleNewInformation = async ({
  phone,
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
}) => {
  const hasError = findErrorChangeInformations(
    phone,
    name,
    email,
    setError,
    setMessageError,
  );
  if (!hasError) {
    return;
  }

  setError(false);
  setMessageError('');

  if (phone.trim()) {
    setIsToShowLoading(true);
    await verifyPhoneNumber('+55' + phone, setConfirm);
    setIsToShowLoading(false);
    setPhoneChange(true);
    setPhone('');
  }

  if (name.trim()) {
    setNameChange(true);
    await changeName(name, userData, setUserData);
    setName('');
  }

  if (email.trim()) {
    setEmailChange(true);
    await changeEmail(email);
    setEmail('');
  }
};
