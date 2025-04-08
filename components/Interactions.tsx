import {StyleSheet, View, Pressable} from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Text} from "react-native-paper";
import {VideoType} from "@/types";
import {useAuthMutation} from "@/hooks/useAuthMutation";
import {interact} from "@/api/clipzone";
import {useReducer} from "react";
import {useAccount} from "@/hooks/useAccount";
import {AUTH_ERROR} from "@/constants";

type Props = {
    video: VideoType,
}

interface State {
    liked: boolean;
    disliked: boolean;
    counterLike: number;
    counterDislike: number;
}

type Action = 'LIKE' | 'DISLIKE';

const reducer = (state: State, action: Action) : State => {
    switch (action) {
        case 'LIKE':
            return {
                ...state,
                liked: !state.liked,
                disliked : false,
                counterLike: state.liked ? state.counterLike - 1 : state.counterLike + 1,
                counterDislike: state.disliked ? state.counterDislike - 1 : state.counterDislike
            }
        case 'DISLIKE':
            return {
                ...state,
                disliked: !state.disliked,
                liked : false,
                counterDislike: state.disliked ? state.counterDislike - 1 : state.counterDislike + 1,
                counterLike: state.liked ? state.counterLike - 1 : state.counterLike
            }
        default:
            return state;
    }
}

export default function Interactions ({video}: Props) {

    const {isAuthenticated} = useAccount();

    const {mutate} = useAuthMutation({
        mutationFn: (type: any) => interact(type, video.id),
        mutationKey: ['interaction', video.id],
        authError: AUTH_ERROR.INTERACT
    })

    const [state, dispatch] = useReducer(reducer, {
        liked: video?.liked_by_auth_user ?? false,
        disliked : video?.disliked_by_auth_user ?? false,
        counterLike : video.likes,
        counterDislike : video.dislikes
    } as State);

    const handleClick = async (type: Action) => {
        if (isAuthenticated) {
            dispatch(type)
        }
        mutate(type.toLocaleLowerCase() as any)
    }


    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => handleClick('LIKE')}
                style={({ pressed }) => [
                    pressed && styles.pressed,
                    styles.interaction
                ]}
            >
                {state.liked ? <FontAwesome name="thumbs-up" size={17} color="black" /> : <FontAwesome name="thumbs-o-up" size={17} color="black" /> }
                {video.show_likes && state.counterLike > 0 && <Text>{state.counterLike}</Text>}
            </Pressable>
            <View style={styles.separator}></View>
            <Pressable
                onPress={() => handleClick('DISLIKE')}
                style={({ pressed }) => [
                    pressed && styles.pressed,
                    styles.interaction
                ]}
            >
                {state.disliked ? <FontAwesome name="thumbs-down" size={17} color="black" /> : <FontAwesome name="thumbs-o-down" size={17} color="black" /> }
                {video.show_likes && state.counterDislike > 0 && <Text>{state.counterDislike}</Text>}
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 15,
        flexDirection : 'row'
    },
    interaction: {
        flex: 1,
        alignItems: 'center',
        flexDirection : 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 7,
        borderRadius: 15,
        gap: 10
    },
    separator: {
        borderRightWidth: 1,
        borderColor: '#DEDEDE',
        marginVertical: 5
    },
    pressed : {
        backgroundColor: '#cecece'
    }
});