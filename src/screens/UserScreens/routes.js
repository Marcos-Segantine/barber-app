import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Calandar} from './main-screens/Calandar';
import {ConfirmSchedule} from './main-screens/ConfirmSchedule';
import {FinalScreen} from './main-screens/FinalScreen';

import {InitialScreen} from './main-screens/InitialScreen';
import {Login} from './main-screens/Login';
import {CancelScreen} from './info-user-screens/CancelScreen';
import {InfoSchedule} from './info-user-screens/InfoSchedule';
import {YourInformation} from './info-user-screens/YourInformation';
import {YourSchedules} from './info-user-screens/YourSchedules';
import {Professionals} from './main-screens/Professionals';
import {Register} from './main-screens/Register';
import {Schedules} from './main-screens/Schedules';
import {Services} from './main-screens/Services';
import {Main} from './info-user-screens/Main';
import {ScheduleDetail} from './info-user-screens/ScheduleDetail';
import {ForgotPassword} from './main-screens/ForgotPassword';

const {Screen, Navigator} = createNativeStackNavigator();

export const UserScreens = () => {
  return (
    <Navigator initialRouteName="InitialScreen" screenOptions={{headerShown: false}}>

      <Screen name="InitialScreen" component={InitialScreen} />

      <Screen name="Login" component={Login} />

      <Screen name="Register" component={Register} />

      <Screen name="Services" component={Services} />

      <Screen name="Professionals" component={Professionals} />

      <Screen name="Calandar" component={Calandar} />

      <Screen name="ConfirmSchedule" component={ConfirmSchedule} />

      <Screen name="FinalScreen" component={FinalScreen} />

      <Screen name="Schedules" component={Schedules} />

      <Screen name="Main" component={Main} />

      <Screen name="YourSchedules" component={YourSchedules} />

      <Screen name="InfoSchedule" component={InfoSchedule} />

      <Screen name="CancelScreen" component={CancelScreen} />

      <Screen name="YourInformation" component={YourInformation} />
      <Screen name="ScheduleDetail" component={ScheduleDetail} />

      <Screen name="ForgotPassword" component={ForgotPassword} />
    </Navigator>
  );
};
