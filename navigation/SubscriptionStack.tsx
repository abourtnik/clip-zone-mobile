import {createNativeStackNavigator, type NativeStackNavigationProp} from "@react-navigation/native-stack";
import Subscriptions from "@/screens/Subscriptions";
import Login from "@/screens/Login";

type StackParamList = {
    Subscription: undefined;
    Login: undefined;
};

export type RouteProps = NativeStackNavigationProp<StackParamList>;

const Stack= createNativeStackNavigator();

export default function SubscriptionStack () {
    return (
        <Stack.Navigator initialRouteName={'Home'}>
            <Stack.Screen name="Subscription" component={Subscriptions} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
}