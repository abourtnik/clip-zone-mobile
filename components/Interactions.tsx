import {StyleSheet, View, Pressable} from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {Text} from "react-native-paper";
import {VideoType} from "@/types";

type Props = {
    video: VideoType,
}

export default function Interactions ({video}: Props) {

    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [
                    pressed && styles.pressed,
                    styles.interaction
                ]}
            >
                <FontAwesome5 name="thumbs-up" size={17} color="black" />
                {video.show_likes && video.likes as number > 0 && <Text>{video.likes as number}</Text>}
            </Pressable>
            <View style={styles.separator}></View>
            <Pressable
                style={({ pressed }) => [
                    pressed && styles.pressed,
                    styles.interaction
                ]}
            >
                <FontAwesome5 name="thumbs-down" size={17} color="black" />
                {video.show_likes && video.dislikes as number > 0 && <Text>{video.dislikes as number}</Text>}
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    container : {
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
        paddingVertical: 8,
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