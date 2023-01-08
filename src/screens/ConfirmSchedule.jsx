import { Text, View, StyleSheet } from "react-native"

import { Header } from "../shared/Header"
import { Footer } from "../shared/Footer"
import { Title } from '../components/Title'
import { Button } from "../components/Button"
import { useContext } from "react"
import { ShedulesUserContext } from "../context/ShedulesUser"

import firestore from '@react-native-firebase/firestore';

export const ConfirmSchedule = ({ navigation }) => {
    const { shedulesUser } = useContext(ShedulesUserContext)

    const handleComfirm = async() => {
        
        firestore()
            .collection('schedules_month')
            .doc('1_2023')
            .get()
            .then(({ _data }) => {
                console.log(_data);
                _data['01']['09 - 10'] = shedulesUser
                console.log(_data);

                const newData = _data
                
                firestore()
                    .collection('schedules_month')
                    .doc('1_2023')
                    .update(newData)
                    .then(() => {
                        console.log('User updated!');
                    });
            })


            
    }

    return(
        <View style={style.container}>
            <Header />

            <Title 
                title="O seu agendamento:"
            />

            <Text style={style.subTitle}>Confira todos os dados</Text>

            {/* <View style={style.contentData}>
                <View style={style.data}>
                    <Text style={style.textData}>{shedulesUser.day}</Text>
                </View>

                <View style={style.data}>
                    <Text style={style.textData}>{shedulesUser.service}</Text>
                </View>

                <View style={style.data}>
                    <Text style={style.textData}>{shedulesUser.professional}</Text>
                </View>

                <View style={style.data}>
                    <Text style={style.textData}>{shedulesUser.shedule}</Text>
                </View>

                <View style={style.data}>
                    <Text style={style.textData}>Data: 09/09/22</Text>
                </View> 
            </View> */}

            <Button text="Comfirmar" action={handleComfirm} />
            <Footer />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#1E1E1E",
    },

    subTitle: {
        fontSize: 12,
        color: "#FFFFFF60"
    },

    contentData: {
        width: "85%",
        marginTop: 30
    },

    data: {
        borderColor: '#E95401',
        borderRadius: 20,
        borderWidth: 2,
        paddingVertical: 15,
        alignItems: "center",
        marginVertical: 5,
    },

    textData: {
        color: "#FFFFFF",
        fontWeight: '700',
        fontSize: 16,
    },
})