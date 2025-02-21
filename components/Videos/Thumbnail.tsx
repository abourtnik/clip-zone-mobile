import {PropsWithChildren, useState} from 'react'
import {View, StyleSheet, ImageBackground, ImageBackgroundProps} from 'react-native';
import {useResponsive} from "@/hooks/useResponsive";
import {useQuery} from "@tanstack/react-query";
import {getSource} from "@/functions/image";

type Props = PropsWithChildren<ImageBackgroundProps> & {
    url?: string;
}
export function Thumbnail ({children, url, ...props} : Props) {

    const { hasMultipleColumns} = useResponsive();

    const [loading, setLoading] = useState(true);

    const {data: source} = useQuery({
        queryKey: ['video.thumbnail', url],
        queryFn: () => getSource(url),
        enabled: !!url
    });

    return (
        <ImageBackground
            onLoadEnd={() => setLoading(false)}
            imageStyle={hasMultipleColumns ? styles.image : {}}
            source={source}
            {...props}
        >
            {children}
            {loading && <View style={styles.loader}></View>}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    loader : {
        flex: 1,
        backgroundColor: '#E6E6E6'
    },
    image: {
        borderRadius: 10
    }
});