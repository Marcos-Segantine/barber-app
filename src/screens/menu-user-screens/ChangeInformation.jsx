import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
} from 'react-native';

import { UserContext } from '../../context/UserContext';
import { globalStyles } from '../globalStyles';
import { hadleNewInfomation } from '../../functions/User/hadleNewInfomation';
import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import { ChangeInformations } from '../../components/Modals/ChangeInformations';
import { LoadingAnimation } from '../../components/LoadingAnimation';

export const ChangeInformation = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneNotFormated, setPhoneNotFormated] = useState('');

  const [confirm, setConfirm] = useState(null);
  const [phoneChange, setPhoneChange] = useState(false);
  const [emailChange, setEmailChange] = useState(false);
  const [nameChange, setNameChange] = useState(false);

  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [isToShowLoading, setIsToShowLoading] = useState(false);

  const { userData, setUserData } = useContext(UserContext);

  const hadlePhoneChange = (text) => {
    setPhoneNotFormated(text);
    let cleaned = text.replace(/\D/g, '');
    let match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      setPhone(`(${match[1]}) ${match[2]}-${match[3]}`);
    } else {
      setPhone(text);
    }
  };

  const handleSave = () => {
    hadleNewInfomation(
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
      setConfirm
    );
  };

  return (
    <View style={globalStyles.container}>
      <ChangeInformations
        confirm={confirm}
        phone={phoneChange}
        name={nameChange}
        email={emailChange}
        setPhoneChange={setPhoneChange}
        setNameChange={setNameChange}
        setEmailChange={setEmailChange}
      />

      {isToShowLoading ? (
        <LoadingAnimation isToShow={isToShowLoading} />
      ) : (
        <View style={styles.wrapper}>
          <Title title="Mudar informações" />
          <TextInput
            value={name}
            style={styles.input}
            placeholder="Nome"
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            value={email}
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            value={phone}
            placeholder="Número"
            onChangeText={hadlePhoneChange}
            keyboardType="numeric"
          />
          {error && <Text style={styles.errorMessage}>{messageError}.</Text>}
          <Button text="Salvar" action={handleSave} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
  },

  input: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#E95401',
    width: '80%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 15,
  },

  errorMessage: {
    color: 'red',
  },
});
