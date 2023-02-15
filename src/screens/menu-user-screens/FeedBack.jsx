import {View, StyleSheet, TextInput} from 'react-native';

import {globalStyles} from '../globalStyles';

import {Title} from '../../components/Title';
import {Button} from '../../components/Button';
import {useContext, useState} from 'react';

import firestore from '@react-native-firebase/firestore';
import {UserContext} from '../../context/UserContext';

export const FeedBack = () => {
  const [feedback, setFeedback] = useState('');

  const verifyWords = () => {};

  const {userData} = useContext(UserContext);

  const handleFeedback = async () => {
    try {
      if (!feedback.trim()) {
        setModalVisible(true);
        setMessageError('Por favor, preencha o campo de feedback.');
        return;
      }

      const feedbackRef = firestore().collection('feedbacks').doc(userData.uid);
      const feedbackDoc = await feedbackRef.get();
      const feedbackData = feedbackDoc.exists
        ? feedbackDoc.data()
        : {feedbacks: []};
      const updatedFeedbacks = [...feedbackData.feedbacks, feedback];

      await feedbackRef.set({feedbacks: updatedFeedbacks});

      setModalVisible(true);
      setMessageError('Obrigado por compartilhar o seu feedback!');

      setFeedback('');
    } catch (error) {
      console.log('Erro ao enviar feedback: ', error);
    }
  };

  return (
    <View style={globalStyles.container}>
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

      <Button text={'Enviar'} action={handleFeedback} />
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
