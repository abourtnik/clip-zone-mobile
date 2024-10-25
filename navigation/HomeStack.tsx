import type {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Video from "../screens/Video";
import User from "../screens/User";
import Playlist from "../screens/Playlist";

type StackParamList = {
    Home: undefined;
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

const Stack= createNativeStackNavigator<StackParamList>();

export default function HomeStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}/>
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