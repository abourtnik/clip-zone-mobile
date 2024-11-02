import {useEffect, useRef, useState} from 'react'
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {VideoType} from "@/types";
import {ResizeMode, Video as ExpoVideo} from "expo-av";
import {getVideoFile} from "@/api/clipzone";
import {useSettingsStore} from "@/stores/useSettingsStore";

type Props = {
    video: VideoType,
}
export const Player = ({video} : Props) => {

    const ref = useRef<ExpoVideo>(null);

    const [loading, setLoading] = useState(true);

    const autoPlay = useSettingsStore(state => state.autoPlay)

    useEffect(() => {
        if (!loading && autoPlay) {
            ref.current?.playAsync()
        }
    }, [loading]);

    return (
        <ExpoVideo
            posterSource={{uri:video.thumbnail}}
            onLoad={() => setLoading(false)}
            ref={ref}
            style={styles.player}
            useNativeControls={true}
            resizeMode={ResizeMode.COVER}
            source={{uri: getVideoFile(video.file)}}
            volume={0.5}
        >
            {
                loading &&
                <View style={styles.loader}>
                    <ActivityIndicator/>
                </View>
            }
        </ExpoVideo>
    );
}

const styles = StyleSheet.create({
    player: {
        width: '100%',
        height: 242,
    },
    loader: {
        width: '100%',
        height: 242,
        backgroundColor: '#E6E6E6',
        justifyContent: 'center',
        alignItems: 'center'
    }
});