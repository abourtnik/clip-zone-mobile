import {StyleSheet, View, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import {TinyPlaylistType} from "@/types";
import {useNavigation} from "@react-navigation/native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {RouteProps} from "@/navigation/HomeStack";
import {Thumbnail} from "@/components/Videos";


type Props = {
    playlist: TinyPlaylistType,
}

export function Playlist({playlist} : Props) {

    const navigation = useNavigation<RouteProps>();

    return (
        <Pressable
            style={({ pressed }) => [
                pressed && styles.pressed,
                styles.container
            ]}
            onPress={() => navigation.navigate('Playlist', {uuid: playlist.uuid})}
        >
            <Thumbnail style={styles.thumbnail} source={{uri: playlist.thumbnail}}>
                <View style={styles.count_container}>
                    <MaterialCommunityIcons name="format-list-bulleted" color={'white'} size={12} />
                    <Text variant="labelSmall" style={styles.count}>{playlist.videos_count}</Text>
                </View>
            </Thumbnail>
            <View style={styles.infos}>
                <Text style={styles.title}>{playlist.title}</Text>
                <Text variant={'labelMedium'} style={styles.info}>{playlist.videos_count} videos</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container : {
        flexDirection: 'row',
        gap: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    thumbnail : {
        flex: 2,
        height : 80,
        borderRadius: 10,
        overflow: 'hidden',
        resizeMode: 'stretch'
    },
    count_container: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 3,
        paddingVertical: 1,
        borderRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    count: {
        color: 'white',
        fontWeight: 'bold'
    },
    info_container: {
        paddingHorizontal: 10,
        paddingTop: 10,
        flexDirection: 'row',
        gap: 10
    },
    title : {

    },
    infos : {
        flex: 3
    },
    info: {
        color: 'grey'
    },
    pressed : {
        backgroundColor : '#E8E8E8'
    },
});