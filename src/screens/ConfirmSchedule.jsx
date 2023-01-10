import { Text, View, StyleSheet } from "react-native"

import { Header } from "../shared/Header"
import { Footer } from "../shared/Footer"
import { Title } from '../components/Title'
import { Button } from "../components/Button"
import { useContext, useState } from "react"
import { ShedulesUserContext } from "../context/ShedulesUser"

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native"

export const ConfirmSchedule = ({ navigation }) => {
    const { shedulesUser } = useContext(ShedulesUserContext)
    const [ isAllRight, setIsAllRight ] = useState(false)

    const sheduleMouth = shedulesUser.day.split('').slice(5, 7).join('');
    const sheduleDay = shedulesUser.day.split('').slice(8).join('')
    const sheduleHour = shedulesUser.shedule

    const addShedule = (_data) => {
        _data[sheduleDay][shedulesUser.professional] ?
        (
            _data[sheduleDay][shedulesUser.professional] = {
                ..._data[sheduleDay][shedulesUser.professional],
                 [sheduleHour]: shedulesUser
            }
        )
        :
        (
            _data[sheduleDay] = {..._data[sheduleDay], [shedulesUser.professional]: {
                [sheduleHour]: shedulesUser
            }}
        )

        return _data;
    }

    const addSheduleWhenUndefined = (_data) => {
        firestore()
            .collection('schedules_month')
            .doc(`${sheduleMouth}_2023`)
            .get()
            .then(({ _data }) => {
                const newData = {..._data, [sheduleDay]: {
                    [shedulesUser.professional]: {
                        [shedulesUser.shedule]: shedulesUser
                    }
                }}

                firestore()
                    .collection('schedules_month')
                    .doc(`${sheduleMouth}_2023`)
                    .update(newData)
                    .then(() => {
                        console.log('User updated!');
                        setIsAllRight(true)
                    }).catch(error => {
                        switch (error.message) {
                            case "[firestore/not-found] Some requested document was not found.":
                                firestore()
                                    .collection('schedules_month')
                                    .doc(`${sheduleMouth}_2023`)
                                    .set(newData)
                                    .then(() => {
                                        console.log('User added!');
                                        setIsAllRight(true)
                                    });
                                break;
                        
                            default:
                                break;
                        }
                    })
                })

    }

    const handleComfirm = async() => {
            firestore()
                .collection('schedules_month')
                .doc(`${sheduleMouth}_2023`)
                .get()
                .then(({ _data }) => {
                    const newData = addShedule(_data)

                    firestore()
                        .collection('schedules_month')
                        .doc(`${sheduleMouth}_2023`)
                        .update(newData)
                        .then(() => {
                            console.log('User updated!');
                            setIsAllRight(true)
                        });


                }).catch(error => {
                    switch(error.message) {
                        case `Cannot convert undefined value to object`:
                                addSheduleWhenUndefined();
                            break;

                            default:
                                console.log("OTHER ERROR", error.message);
                            break;
                    }
                })

    }

    isAllRight ? 
        (
            setTimeout(() => {
                navigation.navigate("FinalScreen") 
            }, 1000)
        )
        :
        null

    return(
        <View style={style.container}>
            <Header />

            <Title 
                title="O seu agendamento:"
            />

            <Text style={style.subTitle}>Confira todos os dados</Text>

            <View style={style.contentData}>
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
            </View>

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