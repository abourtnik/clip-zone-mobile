import {useEffect, useState} from 'react'
import {View, StyleSheet, ActivityIndicator, useWindowDimensions} from 'react-native';
import {VideoType} from "@/types";
import {getVideoFile} from "@/api/clipzone";
import {useSettingsStore} from "@/stores/useSettingsStore";
import {useNavigation} from "@react-navigation/native";
import {RouteProps} from "@/navigation/HomeStack";
import {useQuery} from "@tanstack/react-query";
import {getSource} from "@/functions/image";
import { useEventListener } from 'expo';
import {useVideoPlayer,  VideoSource, VideoView} from 'expo-video';

type Props = {
    video: VideoType,
}

export const Player = ({video} : Props) => {

    const navigation = useNavigation<RouteProps>();

    const [loading, setLoading] = useState(true);

    const autoPlay = useSettingsStore(state => state.autoPlay)

    const {height} = useWindowDimensions();

    const videoHeight = {height : height / 3};

    const {data: source} = useQuery({
        queryKey: ['video.player', video.uuid],
        queryFn: () => getSource(getVideoFile(video.file))
    });

    const player = useVideoPlayer(source as VideoSource, player => {
        player.volume = 0.5;
    });

    useEventListener(player, 'statusChange', ({ status, error }) => {
        if (status === 'readyToPlay'){
            setLoading(false)
        }
    });

    useEffect(() => {
        if (!loading && autoPlay) {
            player.play()
        }
    }, [loading]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', (e) => {
            player.pause();
            player.currentTime = 0;
        });
        return unsubscribe
    }, []);

    return (
        <VideoView
            style={[styles.player, videoHeight]}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            contentFit={'cover'}
            nativeControls={true}
        >
            {
                loading &&
                <View style={[styles.loader, videoHeight]}>
                    <ActivityIndicator/>
                </View>
            }
        </VideoView>
    );
}

const styles = StyleSheet.create({
    player: {
        width: '100%',
    },
    loader: {
        width: '100%',
        zIndex: 10,
        backgroundColor: '#E6E6E6',
        justifyContent: 'center',
        alignItems: 'center'
    }
});