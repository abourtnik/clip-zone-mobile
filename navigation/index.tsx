import { NavigationContainer } from '@react-navigation/native';
import {AuthStatus, useAuth} from "@/hooks/useAuth";
import {useThemeStore} from "@/stores/useThemeStore";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import HomeStack from "./HomeStack";
import SubscriptionStack from "./SubscriptionStack";
import SearchStack from "./SearchStack";
import AccountStack from "./AccountStack";
import {useAccount} from "@/hooks/useAccount";
import { Avatar } from 'react-native-paper';
import {Platform,} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {ToastError} from "@/components/commons";

const Tab = createBottomTabNavigator();

export default function Navigation() {

    const theme = useThemeStore(state => state.theme)

    const { status } = useAuth();

    const { account } = useAccount();

    const insets = useSafeAreaInsets();

    return (
        <NavigationContainer theme={theme}>
            <Tab.Navigator
                safeAreaInsets={{
                    bottom: Platform.OS === "android" ? 10 : insets.bottom
                }}
                initialRouteName="HomeTab"
                screenOptions={{
                    headerShown : false,
                }}
            >
                <Tab.Screen
                    name="HomeTab"
                    component={HomeStack}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="SearchTab"
                    component={SearchStack}
                    options={{
                        tabBarLabel: 'Search',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="magnify" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="SubscriptionsTab"
                    component={SubscriptionStack}
                    options={{
                        tabBarLabel: 'Subscriptions',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="video" color={color} size={size} />
                        ),
                    }}
                />
                {
                    status === AuthStatus.Guest &&
                    <Tab.Screen
                        name="AccountTab"
                        component={AccountStack}
                        options={{
                            tabBarLabel: 'Account',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="account" color={color} size={size} />
                            ),
                        }}
                    />
                }
                {
                    status === AuthStatus.Authenticated &&
                    <Tab.Screen
                        name="AccountTab"
                        component={AccountStack}
                        options={{
                            tabBarLabel: account?.username,
                            tabBarIcon: ({ color, size }) => (
                                <Avatar.Image size={size} source={{
                                    uri: account?.avatar_url,
                                }} />
                            ),
                        }}
                    />
                }

            </Tab.Navigator>
            <ToastError/>
        </NavigationContainer>
    );
}