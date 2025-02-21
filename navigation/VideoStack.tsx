import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import Video from "@/screens/Video";
import User from "@/screens/User";
import Playlist from "@/screens/Playlist";
import Login from "@/screens/Login";

export type VideoStackParamList = {
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
    Login: undefined;
};

const sharedScreens = [
    {
        name: "Video",
        component: Video,
        options: {
            headerBackTitleVisible: false,
            title: ""
        }
    },
    {
        name: "User",
        component: User,
        options: (props: NativeStackScreenProps<VideoStackParamList, 'User'>) => ({
            headerBackTitleVisible: false,
            title: props.route.params.username
        })
    },
    {
        name: "Playlist",
        component: Playlist,
        options: {
            headerBackTitleVisible: false,
            title: ""
        }
    },
    {
        name: "Login",
        component: Login
    }
];

export function videoScreens(Stack : any) {
    return sharedScreens.map((screen) => (
        <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={screen.options}
        />
    ));
}