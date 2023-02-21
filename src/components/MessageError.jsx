import {Modal, StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useCallback} from 'react';

export const MessageError = React.memo(
  ({modalVisible, setModalVisible, messageError, action}) => {
    const handleAction = useCallback(() => {
      action();
    }, [action]);

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={style.modalContainer}>
          <View>
            <Text style={style.messageError}>{messageError}.</Text>
            <Text style={style.secondMessageError}>Tente novamente.</Text>
          </View>

          <Pressable style={style.okButtonModal} onPress={handleAction}>
            <Text style={style.textOkButtonModal}>OK</Text>
          </Pressable>
        </View>
      </Modal>
    );
  },
);

const style = StyleSheet.create({
  modalContainer: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    marginTop: 'auto',
    borderColor: '#E95401',
    borderTopWidth: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
    minHeight: 300,
  },

  messageError: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 25,
    textAlign: 'center',
  },

  secondMessageError: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 25,
    marginTop: 10,
    textAlign: 'center',
  },

  okButtonModal: {
    backgroundColor: '#E95401',
    width: '65%',
    alignItems: 'center',
    marginTop: 40,
    borderRadius: 10,
    paddingVertical: 10,
  },

  textOkButtonModal: {
    fontWeight: '700',
    color: '#FFFFFF',
    fontSize: 20,
  },
});
