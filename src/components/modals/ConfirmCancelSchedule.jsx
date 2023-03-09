import { Modal, Text, StyleSheet, View } from "react-native"

import { Title } from "../Title"
import { Button } from "../Button"

import { UserContext } from '../../context/UserContext';

import { useContext } from "react";

import { cancelScheduleButton } from "../../functions/schedules/cancelScheduleButton"
import { useNavigation } from "@react-navigation/native";

export const ConfirmCancelSchedule = ({ modalVisible, setModalVisible, schedule }) => {
    const { userData } = useContext(UserContext);

    const navigation = useNavigation()

    const handleConfirm = () => {
        setModalVisible(false)
        cancelScheduleButton(userData, schedule, navigation)
    }

    return (
        <Modal visible={modalVisible} transparent={true} animationType="slide">
            <View style={styles.container}>
                <Title title={"Atençao"} />
                <Text style={styles.text}>
                    Essa açao e irreversivel, realmente deseja cancelar seu horario?
                </Text>

                <Button text={"Confirmar"} action={handleConfirm} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1E1E1E',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center'
    },
});
