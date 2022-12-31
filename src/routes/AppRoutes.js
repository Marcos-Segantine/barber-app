import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Services } from "../screens/Services";

const { Screen, Navigator } = createNativeStackNavigator()

export const AppRoutes = () => {
    return(
        <Navigator>
            <Screen 
                name="Services"
                component={Services}
                options={{
                    headerShown: false
                }}
            />
        </Navigator>
    )
}