import {StyleSheet, View, Pressable, Share} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {CursorPaginator, MyVideoType, TinyPlaylistType} from "@/types";
import {useNavigation} from "@react-navigation/native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {RouteProps} from "@/navigation/HomeStack";
import {Thumbnail} from "@/components/Videos";
import {useActionSheet} from "@expo/react-native-action-sheet";
import {InfiniteData, useQueryClient} from "@tanstack/react-query";
import {useConfirm} from "@/hooks/useConfirm";
import {useAuthMutation} from "@/hooks/useAuthMutation";
import {deletePlaylist} from "@/api/clipzone";
import {produce} from "immer";


type Props = {
    playlist: TinyPlaylistType,
}

export function MyPlaylist({playlist} : Props) {

    const navigation = useNavigation<RouteProps>();

    const { showActionSheetWithOptions } = useActionSheet();

    const queryClient = useQueryClient();

    const {confirm} = useConfirm();

    const {mutateAsync} = useAuthMutation({
        mutationKey: ['playlist.delete', playlist.id],
        mutationFn: () => deletePlaylist(playlist.uuid),
        onSuccess: () => {
            queryClient.setQueriesData({queryKey: ['user-playlists']}, (oldData: InfiniteData<CursorPaginator<MyVideoType>> | undefined) => {
                if (!oldData) return undefined;
                return produce(oldData, draft => {
                    draft.pages.forEach(page => {
                        page.data = page.data.filter(p => p.id !== playlist.id);
                    });
                });
            })
        }
    });

    const showActions = () => {
        showActionSheetWithOptions({
            options : ['Share', 'Delete', 'Cancel'],
            cancelButtonIndex : 2,
            disabledButtonIndices: playlist.is_active ? [] : [0],
        }, actionPress)
    }

    const actionPress = async (index: number|undefined) => {
        switch (index) {
            case 0:
                Share.share({title: playlist.title, message: playlist.route})
                break;
            case 1:
                if (await confirm({title: 'Delete this playlist ?'})) {
                    mutateAsync()
                }
        }
    }

    return (
        <Pressable
            style={({ pressed }) => [
                pressed && styles.pressed,
                styles.container
            ]}
            onPress={() => navigation.navigate('Playlist', {uuid: playlist.uuid})}
            onLongPress={() => showActions()}
        >
            <Thumbnail style={styles.thumbnail} url={playlist.thumbnail}>
                <View style={styles.count_container}>
                    <MaterialCommunityIcons name="format-list-bulleted" color={'white'} size={12} />
                    <Text variant="labelSmall" style={styles.count}>{playlist.videos_count}</Text>
                </View>
            </Thumbnail>
            <View style={styles.infos}>
                <Text numberOfLines={2} style={styles.title}>{playlist.title}</Text>
                <Text variant={'labelMedium'} style={styles.info}>{playlist.videos_count} videos</Text>
                <View style={{flexDirection: 'row', gap: 15, marginTop: 10, alignItems: 'center'}}>
                    <Text variant="labelSmall">{playlist.status}</Text>
                </View>
            </View>
            <IconButton
                icon="dots-vertical"
                iconColor={'black'}
                size={20}
                onPress={showActions}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container : {
        flexDirection: 'row',
        gap: 10,
        paddingVertical: 7,
        paddingHorizontal: 10,
    },
    thumbnail : {
        height: 94,
        width: 168,
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