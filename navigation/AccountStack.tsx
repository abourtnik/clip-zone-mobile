import {createNativeStackNavigator, type NativeStackNavigationProp} from "@react-navigation/native-stack";
import Account from "../screens/Account";
import Language from "../screens/Language";
import Videos from "../screens/Videos";
import Playlists from "../screens/Playlists";
import {videoScreens, VideoStackParamList} from "./VideoStack";

type StackParamList = {
    Account: undefined;
    Language: undefined;
    Videos: undefined;
    Playlists: undefined;
} & VideoStackParamList;

export type RouteProps = NativeStackNavigationProp<StackParamList>;

const Stack= createNativeStackNavigator();

export default function AccountStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Language" component={Language} options={{
                title: 'Select language'
            }} />
            <Stack.Screen name="Videos" component={Videos} options={{
                title: 'Your videos'
            }} />
            <Stack.Screen name="Playlists" component={Playlists} options={{
                title: 'Your playlists'
            }} />
            {videoScreens(Stack)}
        </Stack.Navigator>
    );
}