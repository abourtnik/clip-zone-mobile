import {View, StyleSheet, Pressable, FlatList, ScrollView} from 'react-native';
import {Text, Avatar} from 'react-native-paper';
import {useQuery} from "@tanstack/react-query";
import {getVideo} from "@/api/clipzone";
import BottomSheet from '@gorhom/bottom-sheet';
import moment from "moment";
import {useRef} from "react";
import {CommentsBottomSheet} from "@/components/Comment";
import {ApiError, Loader, NetworkError} from "@/components/commons";
import {FullVideo as SuggestedVideo, Player, Description} from "../components/Videos";
import {useNavigation} from "@react-navigation/native";
import {RouteProps} from "@/navigation/HomeStack";
import {Download, Report, Save, Share, Subscribe} from "@/components/Actions";
import Interactions from "@/components/Interactions";
import {useResponsive} from "@/hooks/useResponsive";
import {STATUS_ICON, STATUS as VIDEO_STATUS} from "@/constants/videos";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


type Props = {
    route: {
        params: {
            uuid: string
        }
    }
}

export default function Video({ route } : Props) {

    const { uuid } = route.params;

    const navigation = useNavigation<RouteProps>();

    const comments = useRef<BottomSheet>(null);
    const description = useRef<BottomSheet>(null);

    const {numColumns, hasMultipleColumns} = useResponsive();

    const {
        data: video,
        isLoading,
        isError,
        error,
        refetch,
        isPaused
    } = useQuery({
        refetchOnMount: true,
        gcTime: 0,
        queryKey: ['video', uuid],
        queryFn: () => getVideo(uuid)
    });

    return (
        <>
            {isPaused && <NetworkError refetch={refetch}/>}
            {isLoading && <Loader/>}
            {isError && <ApiError refetch={refetch} error={error}/>}
            {
                video &&
                    <View style={styles.container}>
                        <Player video={video}/>
                        <View style={{flex: 1}}>
                            {
                                video &&
                                <FlatList
                                    ListHeaderComponent={
                                        <View>
                                            <Pressable
                                                style={({ pressed }) => [
                                                    pressed && styles.pressed,
                                                    styles.info_container
                                                ]}
                                                onPress={() => description.current?.expand()}>
                                                <Text style={styles.title} variant="titleMedium">{video.title}</Text>
                                                <View style={styles.infos}>
                                                    <Text style={styles.info} variant={"bodySmall"}>{video.views} views {moment(video.publication_date).fromNow()}</Text>
                                                    {video.status !== VIDEO_STATUS.PUBLIC && <MaterialCommunityIcons name={STATUS_ICON[video.status] as any} size={15} color={'black'} />}
                                                    <Text>...more</Text>
                                                </View>
                                            </Pressable>
                                            <Pressable
                                                style={({ pressed }) => [
                                                    pressed && styles.pressed,
                                                    styles.user_container
                                                ]}
                                                onPress={() => navigation.navigate('User', {id: video.user.id, username: video.user.username})}
                                            >
                                                <View style={styles.user_info_container}>
                                                    <Avatar.Image
                                                        size={30}
                                                        source={{
                                                            uri:video.user.avatar,
                                                        }}
                                                    />
                                                    <Text style={styles.username}>{video.user.username}</Text>
                                                    {video.user.show_subscribers &&  <Text style={styles.subscriber_count}>{video.user.subscribers}</Text>}
                                                </View>
                                                <Subscribe user={video.user}/>
                                            </Pressable>
                                            <ScrollView
                                                showsHorizontalScrollIndicator={false}
                                                horizontal={true}
                                                contentContainerStyle={styles.buttons_container}
                                            >
                                                <View>
                                                    <Interactions video={video}/>
                                                </View>
                                                <Share video={video}/>
                                                <Download video={video}/>
                                                {/*<Save video={video}/>*/}
                                                <Report video={video}/>
                                            </ScrollView>
                                            {
                                                video.allow_comments &&
                                                <Pressable
                                                    style={({ pressed }) => [
                                                        pressed && styles.pressed_comments,
                                                        styles.comments
                                                    ]}
                                                    onPress={() => comments.current?.expand()}
                                                >
                                                    <View style={styles.comments_info}>
                                                        <Text style={styles.comments_title}>Comments</Text>
                                                        {video.comments > 0 && <Text style={styles.comments_count}>{video.comments}</Text>}
                                                    </View>
                                                    <View style={styles.comments_body}>
                                                        {
                                                            video.first_comment &&
                                                            <>
                                                                <Avatar.Image
                                                                    size={25}
                                                                    source={{
                                                                        uri:video.first_comment.user_avatar,
                                                                    }}
                                                                />
                                                                <Text numberOfLines={2} style={{flex: 1}} variant={'bodySmall'}>{video.first_comment.content}</Text>
                                                            </>
                                                        }
                                                        {
                                                            !video.first_comment &&
                                                            <Text variant={'bodySmall'}>Be the first to comment</Text>
                                                        }
                                                    </View>
                                                </Pressable>
                                            }
                                            {
                                                !video.allow_comments &&
                                                <View style={styles.comments}>
                                                    <View style={styles.comments_info}>
                                                        <Text style={styles.comments_title}>Comments</Text>
                                                    </View>
                                                    <View style={styles.comments_body}>
                                                        <Text variant={'bodySmall'}>Comments are turned off for this video</Text>
                                                    </View>
                                                </View>
                                            }
                                        </View>
                                    }
                                    data={video.suggested}
                                    keyExtractor={item => item.uuid}
                                    renderItem={({item}) => (
                                        <View style={{flex:1/numColumns}}>
                                            <SuggestedVideo video={item} />
                                        </View>
                                    )}
                                    key={numColumns}
                                    numColumns={numColumns}
                                    columnWrapperStyle={hasMultipleColumns ? styles.wrapper : false}
                                />
                            }
                        <CommentsBottomSheet video={video} bottomSheetRef={comments}></CommentsBottomSheet>
                        <Description video={video} bottomSheetRef={description}></Description>
                    </View>
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    wrapper: {
        gap: 10,
        margin: 10
    },
    pressed : {
        backgroundColor : '#E8E8E8'
    },
    info_container : {
        paddingHorizontal: 15,
        paddingVertical: 7,
    },
    infos: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    title: {
        marginVertical: 10,
    },
    info:{
        color: '#606060'
    },
    user_container: {
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 7,
    },
    user_info_container: {
        flexDirection: 'row',
        alignItems : 'center',
        gap: 10
    },
    username: {
        fontWeight: 'bold'
    },
    subscriber_count: {
        color : 'grey'
    },
    buttons_container: {
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 15,
        gap: 8,
        alignItems: 'center',
    },
    comments: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        marginHorizontal: 15,
        paddingVertical : 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 15
    },
    pressed_comments : {
        backgroundColor: '#cecece'
    },
    comments_info : {
        flexDirection: 'row',
        gap: 10
    },
    comments_title: {
        fontWeight: 'bold'
    },
    comments_count: {
        color: '#606060'
    },
    comments_body: {
        flexDirection:'row',
        gap: 10,
        marginTop: 10,
        alignItems: 'center'
    },
    videos : {
        flex: 1,
        //marginTop: 50,
    }

});
