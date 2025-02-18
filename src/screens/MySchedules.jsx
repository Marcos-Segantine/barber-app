import { Dimensions, ScrollView, View } from "react-native"
import { useContext, useEffect, useState } from "react"

import { UserContext } from "../context/UserContext"
import { SomethingWrongContext } from "../context/SomethingWrongContext"

import { globalStyles } from "../assets/globalStyles"

import { HeaderScreens } from "../components/HeaderScreens"
import { Menu } from "../components/Menu"
import { Schedule } from "../components/Schedule"
import { Button } from "../components/Button"
import { NoSchedule } from "../components/NoSchedule"
import { Loading } from "../components/Loading"

import { listenerUserSchedules } from "../services/user/listenerUserSchedules"


export const MySchedules = ({ navigation }) => {
    const [schedulesUser, setSchedulesUser] = useState(null)
    const { userData } = useContext(UserContext)
    const { setSomethingWrong } = useContext(SomethingWrongContext)

    useEffect(() => {
        listenerUserSchedules(userData, setSchedulesUser, setSomethingWrong)

    }, []);

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height / 2;

    if (schedulesUser == null) return <Loading flexSize={1} />

    return (
        <>
            <ScrollView
                contentContainerStyle={[globalStyles.container, { justifyContent: schedulesUser.length ? "flex-start" : "space-between" }, { flex: schedulesUser.length <= 1 && 1 }]}
                overScrollMode="never"
                bounces={false}
            >
                <HeaderScreens screenName={"Meus Horários"} />

                {
                    !schedulesUser.length && <NoSchedule width={screenWidth} height={screenHeight} />
                }

                <View style={{ marginBottom: 50, width: "100%" }}>
                    {
                        schedulesUser && (
                            schedulesUser.map((schedule, index) => (
                                <Schedule
                                    schedule={schedule}
                                    key={index}
                                />
                            ))
                        )
                    }
                </View>

                {
                    schedulesUser?.length < 2 &&
                    <Button
                        text={"Agendar um horário"}
                        action={() => navigation.navigate("NewSchedule", { headerText: "Agendar Horário", scheduleToUpdate: null, isToUpdateSchedule: null })}
                        addStyles={{ alignSelf: "center", position: "absolute", bottom: "5%", width: "80%" }}
                    />
                }
            </ScrollView>
            <Menu />
        </>
    )
}
