import {useState, PropsWithChildren, } from 'react'
import {View, StyleSheet, ImageBackground, ImageBackgroundProps} from 'react-native';
import {useResponsive} from "@/hooks/useResponsive";

type Props = PropsWithChildren<ImageBackgroundProps>;
export function Thumbnail ({children, ...props} : Props) {

    const { hasMultipleColumns} = useResponsive();

    const [loading, setLoading] = useState(true);

    return (
        <ImageBackground imageStyle={hasMultipleColumns ? styles.image : {}} onLoadEnd={() => setLoading(false)} {...props}>
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