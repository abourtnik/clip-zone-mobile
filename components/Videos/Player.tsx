import {useEffect, useState, Fragment, useRef} from 'react'
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {VideoType} from "@/types";
import {getVideoFile, viewVideo} from "@/api/clipzone";
import {useSettingsStore} from "@/stores/useSettingsStore";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getSource} from "@/functions/image";
import {useVideoPlayer,  VideoSource, VideoView} from 'expo-video';
import {useEventListener} from "expo";

type Props = {
    video: VideoType,
    play: boolean
}

const VIEW_COUNT_DURATION = 1;

export const Player = ({video, play} : Props) => {

    const hasViewed = useRef(false);

    const [loading, setLoading] = useState(true);

    const {data: source} = useQuery({
        queryKey: ['video.player', video.uuid],
        queryFn: () => getSource(getVideoFile(video.file))
    });

    const autoPlay = useSettingsStore(state => state.autoPlay)

    const player = useVideoPlayer(source as VideoSource, player => {
        player.volume = 0.5;
        player.timeUpdateEventInterval = 1;
    });

    const {mutate: view} = useMutation({
        mutationKey: ['videos.view', video.uuid],
        mutationFn: () => viewVideo(video.uuid),
    });

    useEventListener(player, 'statusChange', ({ status, error }) => {
        if (status === 'readyToPlay'){
            setLoading(false)
        }
    });

    useEffect(() => {
        if (play) {
            player.play()
        } else {
            player.pause()
        }

    }, [play]);

    useEffect(() => {
        if (!loading && autoPlay) {
            player.play()
        }
    }, [loading]);

    useEventListener(player, 'timeUpdate', (payload) => {
        if (payload.currentTime > VIEW_COUNT_DURATION && !hasViewed.current) {
            hasViewed.current = true;
            view()
        }
    });

    return (
        <Fragment>
            <VideoView
                player={player}
                fullscreenOptions={{
                    enable: true
                }}
                allowsPictureInPicture
                style={[styles.player]}
                contentFit={'contain'}
                nativeControls={true}
            >
                {
                    loading &&
                    <View style={[styles.loader]}>
                        <ActivityIndicator/>
                    </View>
                }
            </VideoView>
        </Fragment>

    )
}

const styles = StyleSheet.create({
    player: {
        width: '100%',
        aspectRatio: 16 / 9
    },
    loader: {
        width: '100%',
        zIndex: 10,
        aspectRatio: 16 / 9,
        backgroundColor: '#E6E6E6',
        justifyContent: 'center',
        alignItems: 'center'
    }
});