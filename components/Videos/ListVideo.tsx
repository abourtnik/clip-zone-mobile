import {memo} from 'react'
import {View, StyleSheet, Pressable} from 'react-native';
import {Text } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import moment from "moment";
import {SearchVideoType, TinyVideoType} from "@/types";
import {RouteProps} from "@/navigation/HomeStack";
import {Thumbnail} from "./Thumbnail";
import {useResponsive} from "@/hooks/useResponsive";

type Props = {
    video: TinyVideoType | SearchVideoType,
}
export const ListVideo = memo(({video} : Props) => {

    const navigation = useNavigation<RouteProps>();

    const {hasMultipleColumns} = useResponsive();

    return (
        <Pressable
            style={({ pressed }) => [
                pressed && styles.pressed,
                styles.container,
                {flexDirection: hasMultipleColumns ? 'column' : 'row'}
            ]}
            onPress={() => navigation.navigate('Video', {uuid: video.uuid})}
        >
            <Thumbnail
                style={[
                    styles.thumbnail,
                    {height: hasMultipleColumns ? 230 : 80},
                ]}
                url={video.thumbnail}
            >
                <View style={styles.time_container}>
                    <Text variant="labelSmall" style={styles.time}>{video.formated_duration}</Text>
                </View>
            </Thumbnail>
            <View style={styles.infos}>
                <Text style={styles.title}>{video.title}</Text>
                <Text variant={'labelMedium'} style={styles.info}>{video.views} views • {typeof video.publication_date === "number" ? moment.unix(video.publication_date).fromNow() : moment(video.publication_date).fromNow()}</Text>
            </View>
        </Pressable>
    );
})

const styles = StyleSheet.create({
    container : {
        gap: 10,
        paddingVertical: 5,
    },
    thumbnail : {
        flex: 2,
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
    info_container: {
        paddingHorizontal: 10,
        paddingTop: 10,
        flexDirection: 'row',
        gap: 10
    },
    title : {
        marginBottom: 2
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