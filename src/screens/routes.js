import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Calandar} from './main-screens/Calandar';
import {ConfirmSchedule} from './main-screens/ConfirmSchedule';
import {FinalScreen} from './main-screens/FinalScreen';
import {InitialScreen} from './main-screens/InitialScreen';
import {Login} from './main-screens/Login';
import {Professionals} from './main-screens/Professionals';
import {Register} from './main-screens/Register';
import {Schedules} from './main-screens/Schedules';
import {Services} from './main-screens/Services';
import {ForgotPassword} from './main-screens/ForgotPassword';

import {Main} from './menu-user-screens/Main';
import {ChangePassword} from './menu-user-screens/ChangePassword';
import {CancelScreen} from './menu-user-screens/CancelScreen';
import {InfoSchedule} from './menu-user-screens/InfoSchedule';
import {YourInformation} from './menu-user-screens/YourInformation';
import {YourSchedules} from './menu-user-screens/YourSchedules';
import {ScheduleDetail} from './menu-user-screens/ScheduleDetail';
import {FeedBack} from './menu-user-screens/FeedBack';

const {Screen, Navigator} = createNativeStackNavigator();

export const UserScreens = () => {
  return (
    <Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
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

      <Screen name="ChangePassword" component={ChangePassword} />

      <Screen name="FeedBack" component={FeedBack} />
    </Navigator>
  );
};
