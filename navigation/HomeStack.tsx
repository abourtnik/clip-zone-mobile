import type {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {videoScreens, VideoStackParamList} from "./VideoStack";
import Home from "@/screens/Home";

type StackParamList = {
    Home: undefined;
} & VideoStackParamList;

export type RouteProps = NativeStackNavigationProp<StackParamList>;

const Stack= createNativeStackNavigator<StackParamList>();

export default function HomeStack () {
    return (
        <Stack.Navigator id="HOME">
            <Stack.Screen name="Home" component={Home}/>
            {videoScreens(Stack)}
        </Stack.Navigator>
    );
}