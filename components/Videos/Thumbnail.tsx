import {useState, PropsWithChildren, } from 'react'
import {View, StyleSheet, ImageBackground, ImageBackgroundProps} from 'react-native';

type Props = PropsWithChildren<ImageBackgroundProps>;
export function Thumbnail ({children, ...props} : Props) {

    const [loading, setLoading] = useState(true);

    return (
        <ImageBackground onLoadEnd={() => setLoading(false)} {...props}>
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
});