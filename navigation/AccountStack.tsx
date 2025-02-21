import {createNativeStackNavigator, type NativeStackNavigationProp} from "@react-navigation/native-stack";
import Account from "../screens/Account";
import Login from "../screens/Login";
import Language from "../screens/Language";
import Videos from "../screens/Videos";
import Playlists from "../screens/Playlists";
import Video from "../screens/Video";
import User from "@/screens/User";
import Playlist from "@/screens/Playlist";

type StackParamList = {
    Account: undefined;
    Login: undefined;
    Language: undefined;
    Videos: undefined;
    Playlists: undefined;
    Video: {
        uuid: string
    };
    User: {
        id: number
        username: string
    };
    Playlist: {
        uuid: string
    };
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
            <Stack.Screen name="Videos" component={Videos} options={{
                title: 'Your videos'
            }} />
            <Stack.Screen name="Playlists" component={Playlists} options={{
                title: 'Your playlists'
            }} />
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
        </Stack.Navigator>
    );
}