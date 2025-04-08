import {useEffect, useState, Fragment} from 'react'
import {View, StyleSheet, ActivityIndicator, useWindowDimensions} from 'react-native';
import {VideoType} from "@/types";
import {getVideoFile} from "@/api/clipzone";
import {useSettingsStore} from "@/stores/useSettingsStore";
import {useQuery} from "@tanstack/react-query";
import {getSource} from "@/functions/image";
import {useVideoPlayer,  VideoSource, VideoView} from 'expo-video';
import {useEventListener} from "expo";

type Props = {
    video: VideoType,
    play: boolean
}

export const Player = ({video, play} : Props) => {

    const [loading, setLoading] = useState(true);

    const {data: source} = useQuery({
        queryKey: ['video.player', video.uuid],
        queryFn: () => getSource(getVideoFile(video.file))
    });

    const autoPlay = useSettingsStore(state => state.autoPlay)

    const player = useVideoPlayer(source as VideoSource, player => {
        player.volume = 0.5;
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

    const {height} = useWindowDimensions();

    const videoHeight = {height : height / 3};

    useEffect(() => {
        if (!loading && autoPlay) {
            player.play()
        }
    }, [loading]);

    return (
        <Fragment>
            <VideoView
                player={player}
                allowsFullscreen
                allowsPictureInPicture
                style={[styles.player, videoHeight]}
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
        </Fragment>

    )
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