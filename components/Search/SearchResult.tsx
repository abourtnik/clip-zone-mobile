import {Pressable, View, StyleSheet} from "react-native";
import {Text} from "react-native-paper";
import {SearchVideoType} from "@/types";
import {useNavigation} from "@react-navigation/native";
import {RouteProps} from "@/navigation/HomeStack";
import {Thumbnail} from "../Videos";

type Props = {
    result: SearchVideoType
}
export default function SearchResult ({result}: Props) {

    const navigation = useNavigation<RouteProps>();

    return (
        <Pressable style={({ pressed }) => [
            pressed && styles.pressed,
            styles.main
        ]}
        onPress={() => navigation.navigate('Video', {uuid: result.uuid})}
        >
            <Thumbnail style={styles.thumbnail} url={result.thumbnail}>
                <View style={styles.time_container}>
                    <Text variant="labelSmall" style={styles.time}>22</Text>
                </View>
            </Thumbnail>
            <View style={styles.container}>
                <Text style={styles.text}>{result.title}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        gap: 10,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    thumbnail: {
        flex: 2,
        height : 80,
        borderRadius: 10,
        overflow: 'hidden',
        resizeMode: 'stretch'
    },
    time_container: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 3,
        paddingVertical: 1,
        borderRadius: 3
    },
    time: {
        color: 'white',
        fontWeight: 'bold'
    },
    pressed : {
        backgroundColor : '#E8E8E8'
    },
    container : {
        flex: 3
    },
    text: {
        fontWeight:'bold'
    }
});
