import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Calandar } from "./main-screens/Calandar";
import { ConfirmSchedule } from "./main-screens/ConfirmSchedule";
import { FinalScreen } from "./main-screens/FinalScreen";

import { InitialScreen } from "./main-screens/InitialScreen";
import { Login } from "./main-screens/Login";
import { CancelScreen } from "./info-user-screens/CancelScreen";
import { InfoSchedule } from "./info-user-screens/InfoSchedule";
import { YourInformation } from "./info-user-screens/YourInformation";
import { YourSchedules } from "./info-user-screens/YourSchedules";
import { Professionals } from "./main-screens/Professionals";
import { Register } from "./main-screens/Register";
import { Schedules } from "./main-screens/Schedules";
import { Services } from "./main-screens/Services";
import { Main } from "./info-user-screens/Main";

const { Screen, Navigator } = createNativeStackNavigator()

export const UserScreens = () => {
    return(
        <Navigator initialRouteName="InitialScreen">
            <Screen 
                name="InitialScreen"
                component={InitialScreen}
                options={{
                    headerShown: false
                }}
            />
            <Screen 
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />

            <Screen 
                name="Register"
                component={Register}
                options={{
                    headerShown: false
                }}
            />

            <Screen 
                name="Services"
                component={Services}
                options={{
                    headerShown: false
                }}
            />

            <Screen 
                name="Professionals"
                component={Professionals}
                options={{
                    headerShown: false
                }}
            />

            <Screen
                name='Calandar'
                component={Calandar}
                options={{
                headerShown: false
                }}
            />

            <Screen
                name='ConfirmSchedule'
                component={ConfirmSchedule}
                options={{
                headerShown: false
                }}
            />

            <Screen
                name='FinalScreen'
                component={FinalScreen}
                options={{
                headerShown: false
                }}
            />

            <Screen
                name='Schedules'
                component={Schedules}
                options={{
                headerShown: false
                }}
            />

            <Screen
                name='Main'
                component={Main}
                options={{
                headerShown: false
                }}
            />

            <Screen
                name='YourSchedules'
                component={YourSchedules}
                options={{
                headerShown: false
                }}
            />

            <Screen
                name='InfoSchedule'
                component={InfoSchedule}
                options={{
                headerShown: false
                }}
            />

            <Screen
                name='CancelScreen'
                component={CancelScreen}
                options={{
                headerShown: false
                }}
            />

            <Screen
                name='YourInformation'
                component={YourInformation}
                options={{
                headerShown: false
                }}
            />
        </Navigator>
    )
}