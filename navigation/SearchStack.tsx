import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Search from "../screens/Search";
import Video from "../screens/Video";

const Stack= createNativeStackNavigator();

export default function SearchStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Search" component={Search} options={{
                headerShown : false
            }}/>
            <Stack.Screen name="Video" component={Video} />
        </Stack.Navigator>
    );
}