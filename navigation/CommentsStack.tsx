import React, {useMemo} from 'react';
import {createNativeStackNavigator, NativeStackNavigationOptions, type NativeStackNavigationProp} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {List as CommentsList} from "@/components/Comment/List";
import {Replies} from "@/components/Comment/Replies";
import {VideoType, CommentType} from "@/types";
import {IconButton} from "react-native-paper";
import {useBottomSheet} from "@gorhom/bottom-sheet";

const Stack= createNativeStackNavigator();

type Props = {
    video: VideoType,
}

type StackParamList = {
    Comments: {
        video: VideoType
    };
    Replies: {
        comment: CommentType
    };
};

export type RouteProps = NativeStackNavigationProp<StackParamList>;

export default function CommentsStack ({video}: Props)  {

    const { close } = useBottomSheet();

    const screenOptions = useMemo<NativeStackNavigationOptions>(
        () => ({
            headerMode: 'screen',
            headerShown: true,
            safeAreaInsets: { top: 0 },
            cardStyle: {
                backgroundColor: 'white',
                overflow: 'visible',
            },
        }),
        []
    );

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen
                    name="Comments"
                    options={{
                        headerShown: false,
                    }}
                    initialParams={{video: video}}
                    component={CommentsList}
                />
                <Stack.Screen
                    name="Replies"
                    component={Replies}
                    options={{
                        headerShown: true,
                        headerBackTitleVisible: false,
                        headerRight: () => <IconButton
                            icon="close"
                            iconColor={'black'}
                            size={20}
                            onPress={() => close()}
                        />
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};