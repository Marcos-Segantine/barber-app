import {useNavigation} from '@react-navigation/native';
import {View, Modal, StyleSheet, Text} from 'react-native';
import {Button} from '../Button';
import {Title} from '../Title';

import { changeEmail } from '../../functions/User/changeEmail';

export const ChangeEmail = ({visible, email, setEmailChange}) => {
  const navigation = useNavigation();
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={style.container}>
        <Title title={'Email atualizado com sucesso!'} />
        <Button
          text={'OK'}
          action={() => {
            setEmailChange(false);
            changeEmail(email)
          }}
        />
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    flex: 1,
  },

  description: {
    width: '85%',
    marginTop: 20,
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
});
