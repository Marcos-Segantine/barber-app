import { Modal, View, Text, StyleSheet } from "react-native"

import { Button } from "../Button"

import { ContactImage } from "../../assets/imgs/ContactImage"
import { globalStyles } from "../../assets/globalStyles"

import { useEffect, useState } from "react"
import { Loading } from "../Loading"

import firestore from '@react-native-firebase/firestore';

import { formatPhoneNumber } from "../../utils/formatPhoneNumber"

import { handleError } from "../../handlers/handleError"

export const Contact = ({ modalContact, setModalVisible }) => {
    // const [isLoading, setIsLoading] = useState(true)
    const [contacts, setContacts] = useState(null)

    useEffect(() => {
        (async () => {
            try {

                const barbersRef = await firestore().collection('barbers').get()
                const barbersData = barbersRef.docs.splice(0, 3).map(barber => {
                    return {
                        name: barber.data().name,
                        phone: barber.data().phone
                    }
                })

                setContacts(barbersData)

            } catch ({ message }) {
                handleError("Contact", message)
            }
        })();

    }, [])

    return (
        <Modal
            visible={modalContact}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.container}>

                <ContactImage width={"100%"} height={"45%"} />

                <View style={styles.content}>

                    {
                        !!contacts ?
                            contacts.map((barber, index) => {
                                return (
                                    <View style={styles.contact} key={index}>
                                        <Text style={styles.info}>
                                            <Text style={{ fontFamily: globalStyles.fontFamilyBold }}>Nome: </Text>
                                            {barber.name}
                                        </Text>
                                        <Text style={styles.info}>
                                            <Text style={{ fontFamily: globalStyles.fontFamilyBold }}>Número: </Text>
                                            {formatPhoneNumber(barber.phone)}
                                        </Text>
                                    </View>
                                )
                            }) :
                            <Loading height={"100%"} />
                    }

                </View>

                <Button
                    text={"Voltar"}
                    action={() => setModalVisible(false)}
                    addStyles={{ width: "100%" }}
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: "space-around",
        paddingBottom: 20,
        paddingHorizontal: "5%",
    },

    content: {
        width: "100%",
    },

    contact: {
        marginBottom: 15
    },

    info: {
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyMedium,
        color: "#000000"
    }
})