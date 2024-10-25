import {Text} from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import {View, StyleSheet} from "react-native";

type Type = 'primary' | 'danger'

type Props = {
    message: string,
    type?: Type
}

export function Alert ({message, type = 'primary'}: Props) {
    return (
        <View style={[styles.container, styles[type]]}>
            <Text style={[styles.message, styles[type]]}>{message}</Text>
            {/*<Ionicons style={styles.close} name="close" size={20} color="black" />*/}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    message: {
        //width: '90%',
    },
    primary: {
        color: '#052c65',
        backgroundColor: '#cfe2ff',
        borderColor: '#9ec5fe'
    },
    danger: {
        color: '#721c24',
        backgroundColor: '#f8d7da',
        borderColor: '#f5c6cb',
    },
    close: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: '#721c24',
        paddingTop: 5,
        paddingHorizontal: 5
    },
});