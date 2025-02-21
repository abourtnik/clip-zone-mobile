import {memo} from 'react'
import {View, StyleSheet, Pressable, Share} from 'react-native';
import {Text, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import moment from "moment";
import {CursorPaginator, MyVideoType} from "@/types";
import {RouteProps} from "@/navigation/HomeStack";
import {Thumbnail} from "./Thumbnail";
import {useResponsive} from "@/hooks/useResponsive";
import { useActionSheet } from '@expo/react-native-action-sheet';
import {deleteVideo} from "@/api/clipzone";
import {useAuthMutation} from "@/hooks/useAuthMutation";
import {InfiniteData, useQueryClient} from "@tanstack/react-query";
import {produce} from "immer";
import {useConfirm} from "@/hooks/useConfirm";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {STATUS_ICON, STATUS as VIDEO_STATUS} from "@/constants/videos";


type Props = {
    video: MyVideoType,
}
export const MyVideo = memo(({video} : Props) => {

    const navigation = useNavigation<RouteProps>();

    const {hasMultipleColumns} = useResponsive();

    const { showActionSheetWithOptions } = useActionSheet();

    const queryClient = useQueryClient();

    const {confirm} = useConfirm();

    const {mutateAsync} = useAuthMutation({
        mutationKey: ['videos.delete', video.id],
        mutationFn: () => deleteVideo(video.uuid),
        onSuccess: () => {
            queryClient.setQueriesData({queryKey: ['user-videos']}, (oldData: InfiniteData<CursorPaginator<MyVideoType>> | undefined) => {
                if (!oldData) return undefined;
                return produce(oldData, draft => {
                    draft.pages.forEach(page => {
                        page.data = page.data.filter(v => v.id !== video.id);
                    });
                });
            })
        }
    });

    const showActions = () => {
        showActionSheetWithOptions({
            options : ['Share', 'Delete', 'Cancel'],
            cancelButtonIndex : 2,
        }, actionPress)
    }

    const actionPress = async (index: number|undefined) => {
        switch (index) {
            case 0:
                Share.share({title: video.title, message: video.route})
                break;
            case 1:
                if (await confirm({title: 'Delete this video ?'})) {
                    mutateAsync()
                }
        }
    }

    return (
        <Pressable
            style={({ pressed }) => [
                pressed && styles.pressed,
                styles.container,
                {flexDirection: hasMultipleColumns ? 'column' : 'row'}
            ]}
            onPress={() => navigation.navigate('Video', {uuid: video.uuid})}
            onLongPress={() => showActions()}
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
                <Text numberOfLines={2} style={styles.title}>{video.title}</Text>
                <Text variant={'labelSmall'} style={styles.info}>{video.views} views • {moment(video.date).fromNow()}</Text>
                <View style={{flexDirection: 'row', gap: 15, marginTop: 10, alignItems: 'center'}}>
                    <MaterialCommunityIcons name={STATUS_ICON[video.status]} size={15} color={'black'} />
                    {
                        video.status !== VIDEO_STATUS.DRAFT &&
                        <>
                            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                                <MaterialCommunityIcons name="thumb-up" size={15} color={'black'} />
                                <Text variant={'bodySmall'} >{video.like_count}</Text>
                            </View>
                            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                                <MaterialCommunityIcons name="message-text" size={15} color={'black'} />
                                <Text variant={'bodySmall'} >{video.comments_count}</Text>
                            </View>
                        </>
                    }
                    {
                        video.status === VIDEO_STATUS.DRAFT &&
                        <Text variant={'bodySmall'}>Draft</Text>
                    }
                </View>
            </View>
            <IconButton
                //style={{flex: 1}}
                icon="dots-vertical"
                iconColor={'black'}
                size={20}
                onPress={showActions}
            />
        </Pressable>
    );
})

const styles = StyleSheet.create({
    container : {
        gap: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    thumbnail : {
        flex: 3,
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