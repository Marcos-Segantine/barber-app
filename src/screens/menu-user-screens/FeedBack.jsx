import { View, StyleSheet, TextInput } from 'react-native';

import { useContext, useState } from 'react';
import { globalStyles } from '../globalStyles';

import { Title } from '../../components/Title';
import { Button } from '../../components/Button';

import { Feedback } from '../../components/modals/Feedback';

import { UserContext } from '../../context/UserContext';

import { handleFeedback } from '../../functions/user/handleFeedback';

export const FeedBack = () => {
  const [feedback, setFeedback] = useState('');

  const verifyWords = () => { };

  const { userData } = useContext(UserContext);

  return (
    <View style={globalStyles.container}>
      <Feedback />
      <Title title={'Sua opinião importa muito para nós'} />

      <TextInput
        style={style.input}
        placeholder="Nós envie um feedback de nossos serviços ou do app"
        value={feedback}
        onChangeText={setFeedback}
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
      />

      <Button text={'Enviar'} action={() =>
        handleFeedback(
          feedback,
          setFeedback,
          setModalVisible,
          userData
        )} />
    </View>
  );
};

const style = StyleSheet.create({
  input: {
    width: '80%',
    height: '50%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: 3,
    borderColor: '#E95401',
    borderRadius: 20,
    paddingHorizontal: 10,
    fontWeight: '700',
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 50,
    marginBottom: 25,
  },
});
