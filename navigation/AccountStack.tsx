import {createNativeStackNavigator, type NativeStackNavigationProp} from "@react-navigation/native-stack";
import Account from "../screens/Account";
import Login from "../screens/Login";
import Language from "../screens/Language";

type StackParamList = {
    Account: undefined;
    Login: undefined;
    Language: undefined;
};

export type RouteProps = NativeStackNavigationProp<StackParamList>;

const Stack= createNativeStackNavigator();

export default function AccountStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Language" component={Language} options={{
                title: 'Select language'
            }} />
        </Stack.Navigator>
    );
}