import {createNativeStackNavigator, type NativeStackNavigationProp} from "@react-navigation/native-stack";
import Subscriptions from "@/screens/Subscriptions";
import Channels from "@/screens/Channels";
import {videoScreens, VideoStackParamList} from "./VideoStack";

type StackParamList = {
    Subscriptions: undefined;
    Channels: undefined;
} & VideoStackParamList;

export type RouteProps = NativeStackNavigationProp<StackParamList>;

const Stack= createNativeStackNavigator<StackParamList>();

export default function SubscriptionStack () {
    return (
        <Stack.Navigator initialRouteName={'Subscriptions'}>
            <Stack.Screen name="Subscriptions" component={Subscriptions} />
            <Stack.Screen
                name="Channels"
                component={Channels}
                options={(props) => ({
                    headerBackTitleVisible: false,
                    title: 'All subscriptions'
                })}
            />
            {videoScreens(Stack)}
        </Stack.Navigator>
    );
}