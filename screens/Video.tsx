import {View, StyleSheet, ScrollView, Pressable, ActivityIndicator, FlatList} from 'react-native';
import {Button, Text, Avatar} from 'react-native-paper';
import { Video as ExpoVideo, ResizeMode } from 'expo-av';
import {useQuery} from "@tanstack/react-query";
import {getVideo, getVideoFile} from "@/api/clipzone";
import BottomSheet from '@gorhom/bottom-sheet';
import moment from "moment";
import {useRef, useEffect, useState} from "react";
import {CommentsBottomSheet} from "@/components/Comment";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Description} from "@/components/Description";
import {ApiError, Loader} from "@/components/commons";
import {FullVideo as SuggestedVideo} from "../components/Videos";
import {useNavigation} from "@react-navigation/native";
import {RouteProps} from "@/navigation/HomeStack";
import Interactions from "../components/Interactions";
import {Subscribe} from "@/components/commons/Subscribe";

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

    const videoRef = useRef(null);
    const comments = useRef<BottomSheet>(null);
    const description = useRef<BottomSheet>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //videoRef.current.playAsync()
    }, []);

    const {
        data: video,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['video', uuid],
        queryFn: () => getVideo(uuid)
    });

    return (
        <>
            {isLoading && <Loader/>}
            {isError && <ApiError refetch={refetch}/>}
            {
                video &&
                    <View style={styles.container}>
                        <ExpoVideo
                            posterSource={{uri:video.thumbnail}}
                            onLoad={() => setLoading(false)}
                            ref={videoRef}
                            style={styles.video}
                            useNativeControls={true}
                            resizeMode={ResizeMode.COVER}
                            source={{uri: getVideoFile(video.file)}}
                            volume={0.5}
                        >
                            {
                                loading &&
                                <View style={styles.loading_video}>
                                    <ActivityIndicator/>
                                </View>
                            }
                        </ExpoVideo>
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
                                            <View>
                                                <ScrollView
                                                    showsHorizontalScrollIndicator={false}
                                                    horizontal={true}
                                                    contentContainerStyle={styles.buttons_container}
                                                >
                                                    <View>
                                                        <Interactions video={video}/>
                                                    </View>
                                                    <Button
                                                        labelStyle={styles.button}
                                                        icon={({ size, color }) => (
                                                            <MaterialCommunityIcons name="share" size={17} color={color} style={styles.button_icon}/>
                                                        )}
                                                        mode={'contained'}
                                                    >
                                                        Share
                                                    </Button>
                                                    <Button
                                                        labelStyle={styles.button}
                                                        icon={({ size, color }) => (
                                                            <MaterialCommunityIcons name="download" size={18} color={color} style={styles.button_icon}/>
                                                        )}
                                                        mode={'contained'}>
                                                        Download
                                                    </Button>
                                                    <Button
                                                        labelStyle={styles.button}
                                                        icon={({ size, color }) => (
                                                            <MaterialCommunityIcons name="bookmark-outline" size={20} color={color} style={styles.button_icon}/>
                                                        )}
                                                        mode={'contained'}
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        labelStyle={styles.button}
                                                        icon={({ size, color }) => (
                                                            <MaterialCommunityIcons name="flag-outline" size={20} color={color} style={styles.button_icon}/>
                                                        )}
                                                        mode={'contained'}
                                                    >
                                                        Report
                                                    </Button>
                                                </ScrollView>
                                            </View>
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
                                    renderItem={({item}) => <SuggestedVideo video={item} />}
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
    pressed : {
        backgroundColor : '#E8E8E8'
    },
    video: {
        width: '100%',
        height: 242,
    },
    loading_video: {
        width: '100%',
        height: 242,
        backgroundColor: '#E6E6E6',
        justifyContent: 'center',
        alignItems: 'center'
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
    button: {
        marginVertical: 6,
        marginHorizontal: 10,
        fontSize: 13
    },
    button_icon: {
        paddingRight: 15
    },
    buttons_container: {
        marginHorizontal: 10,
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
