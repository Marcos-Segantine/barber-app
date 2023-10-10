import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { Welcome } from "../screens/Welcome"
import { LoginWay } from "../screens/LoginWay"
import { Register } from "../screens/Register"
import { Login } from "../screens/Login"
import { Profile } from "../screens/Profile"
import { ForgotPassword } from "../screens/ForgotPassword"
import { CreateNewPassword } from "../screens/CreateNewPassword"
import { Home } from "../screens/Home"
import { MySchedules } from "../screens/MySchedules"
import { FillProfile } from "../screens/FillProfile"
import { NewSchedule } from "../screens/NewSchedule"
import { OurServices } from "../screens/OurServices"
import { ConfirmSchedule } from "../screens/ConfirmSchedule"
import { PrivacyPolicies } from "../screens/PrivacyPolicies"
import { Security } from "../screens/Security"
import { GetCode } from "../screens/GetCode"

const { Screen, Navigator } = createNativeStackNavigator()

export const Routes = () => {
    return (
        <Navigator initialRouteName="Welcome" screenOptions={{
            gestureEnabled: false,
            headerShown: false,
            gestureDirection: 'horizontal',
            animation: 'slide_from_right',
            navigationBarColor: 'rgba(0,0,0,0.002))',
            statusBarColor: 'transparent',
        }}>

            <Screen name="Welcome" component={Welcome} />
            <Screen name="LoginWay" component={LoginWay} />
            <Screen name="Login" component={Login} />
            <Screen name="Register" component={Register} />
            <Screen name="Profile" component={Profile} />
            <Screen name="ForgotPassword" component={ForgotPassword} />
            <Screen name="CreateNewPassword" component={CreateNewPassword} />
            <Screen name="Home" component={Home} />
            <Screen name="MySchedules" component={MySchedules} />
            <Screen name="FillProfile" component={FillProfile} />
            <Screen name="NewSchedule" component={NewSchedule} />
            <Screen name="OurServices" component={OurServices} />
            <Screen name="ConfirmSchedule" component={ConfirmSchedule} />
            <Screen name="PrivacyPolicies" component={PrivacyPolicies} />
            <Screen name="Security" component={Security} />
            <Screen name="GetCode" component={GetCode} />

        </Navigator>
    )
}