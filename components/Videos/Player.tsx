import {useEffect, useRef, useState} from 'react'
import {View, StyleSheet, ActivityIndicator, useWindowDimensions} from 'react-native';
import {VideoType} from "@/types";
import {ResizeMode, Video as ExpoVideo} from "expo-av";
import {getVideoFile} from "@/api/clipzone";
import {useSettingsStore} from "@/stores/useSettingsStore";
import {useNavigation} from "@react-navigation/native";
import {RouteProps} from "@/navigation/HomeStack";
import {useQuery} from "@tanstack/react-query";
import {getSource} from "@/functions/image";

type Props = {
    video: VideoType,
}
export const Player = ({video} : Props) => {

    const navigation = useNavigation<RouteProps>();

    const ref = useRef<ExpoVideo>(null);

    const [loading, setLoading] = useState(true);

    const autoPlay = useSettingsStore(state => state.autoPlay)

    const {height} = useWindowDimensions();

    const videoHeight = {height : height / 3};

    const {data: source} = useQuery({
        queryKey: ['video.player', video.uuid],
        queryFn: () => getSource(getVideoFile(video.file))
    });

    useEffect(() => {
        if (!loading && autoPlay) {
            ref.current?.playAsync()
        }
    }, [loading]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', (e) => {
            ref.current?.stopAsync()
        });
        return unsubscribe
    }, []);

    return (
        <ExpoVideo
            posterSource={{uri:video.thumbnail}}
            onLoad={() => setLoading(false)}
            ref={ref}
            style={[styles.player, videoHeight]}
            useNativeControls={true}
            resizeMode={ResizeMode.COVER}
            source={source}
            volume={0.5}
        >
            {
                loading &&
                <View style={[styles.loader, videoHeight]}>
                    <ActivityIndicator/>
                </View>
            }
        </ExpoVideo>
    );
}

const styles = StyleSheet.create({
    player: {
        width: '100%',
    },
    loader: {
        width: '100%',
        backgroundColor: '#E6E6E6',
        justifyContent: 'center',
        alignItems: 'center'
    }
});