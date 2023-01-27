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

  const handleFeedback = () => {
    firestore()
      .collection('feedbacks')
      .doc(userData.uid)
      .get()
      .then(({_data}) => {
        console.log(_data);

        let _data__Temp = _data;

        !!_data
          ? (_data__Temp.feedbacks.push(feedback),
            firestore()
              .collection('feedbacks')
              .doc(userData.uid)
              .update({..._data__Temp})
              .then(() => {
                console.log('feedback from user', userData.uid, 'updated');
              }))
          : firestore()
              .collection('feedbacks')
              .doc(`${userData.uid}`)
              .set({
                feedbacks: [feedback],
              })
              .then(() => {
                console.log('feedback from user', userData.uid, 'updated');
              });
      });
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
