import {memo} from 'react'
import {View, StyleSheet, Pressable} from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import moment from "moment";
import {TinyVideoType} from "@/types";
import {RouteProps} from '@/navigation/HomeStack';
import {Thumbnail} from "./Thumbnail";

type Props = {
    video: TinyVideoType,
    height?: number
}
export const FullVideo = memo(({video, height = 230} : Props) => {

    const navigation = useNavigation<RouteProps>();

    const thumbnailHeight = {height : height};

    return (
        <Pressable
            style={({ pressed }) => [
                pressed && styles.pressed,
                styles.container
            ]}
            onPress={() => navigation.push('Video', {uuid: video.uuid})}
        >
            <Thumbnail style={[styles.thumbnail, thumbnailHeight]} url={video.thumbnail}>
                <View style={styles.time_container}>
                    <Text variant="labelSmall" style={styles.time}>{video.formated_duration}</Text>
                </View>
            </Thumbnail>
            <View style={styles.info_container}>
                <Pressable
                    onPress={() => navigation.navigate('User', {id: video.user.id, username: video.user.username})}
                >
                    <Avatar.Image size={30} source={{ uri: video.user.avatar}} />
                </Pressable>
                <View style={styles.infos}>
                    <Text style={styles.title}>{video.title}</Text>
                    <Text variant={'labelMedium'} style={styles.info}>{video.user.username} • {video.views} views • {moment(video.publication_date).fromNow()}</Text>
                </View>
            </View>
        </Pressable>
    );
})

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingBottom: 20,
        position: 'relative',
    },
    thumbnail : {
        //resizeMode :'cover',
    },
    time_container: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 3,
        paddingVertical: 1,
        borderRadius: 3
    },
    time: {
        color: 'white',
        fontWeight: 'bold'
    },
    info_container: {
        paddingHorizontal: 10,
        paddingTop: 10,
        flexDirection: 'row',
        gap: 10,
    },
    title : {

    },
    infos : {
        gap: 5,
        flex: 1
    },
    info: {
        color: '#606060'
    },
    pressed : {
        backgroundColor : '#E8E8E8'
    },
});