import {createNativeStackNavigator, type NativeStackNavigationProp} from "@react-navigation/native-stack";
import Search from "../screens/Search";
import {videoScreens, VideoStackParamList} from "./VideoStack";

const Stack= createNativeStackNavigator();

type StackParamList = {
    Search: undefined;
} & VideoStackParamList;

export type RouteProps = NativeStackNavigationProp<StackParamList>;

export default function SearchStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Search" component={Search} options={{
                headerShown : false
            }}/>
            {videoScreens(Stack)}
        </Stack.Navigator>
    );
}