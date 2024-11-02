import {createNativeStackNavigator, type NativeStackNavigationProp} from "@react-navigation/native-stack";
import Subscriptions from "@/screens/Subscriptions";
import Channels from "@/screens/Channels";
import Login from "@/screens/Login";
import Video from "@/screens/Video";
import User from "@/screens/User";
import Playlist from "@/screens/Playlist";

type StackParamList = {
    Subscriptions: undefined;
    Channels: undefined;
    Video: {
        uuid: string
    };
    Login: undefined;
    User: {
        id: number
        username: string
    };
    Playlist: {
        uuid: string
    };
};

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
            <Stack.Screen
                name="Video"
                component={Video}
                options={(props) => ({
                    headerBackTitleVisible: false,
                    title: ''
                })}
            />
            <Stack.Screen
                name="User"
                component={User}
                options={(props) => ({
                    headerBackTitleVisible : false,
                    title: props.route.params.username
                })}
            />
            <Stack.Screen
                name="Playlist"
                component={Playlist}
                options={(props) => ({
                    headerBackTitleVisible: false,
                    title: ''
                })}
            />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
}