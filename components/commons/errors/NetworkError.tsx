import {Button, Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";

type Props = {
    refetch: Function
}

export function NetworkError ({refetch}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title} variant="bodyLarge">No internet connection</Text>
            <Text style={styles.text}>Please check your internet connection and try again.</Text>
            <Button icon="reload" mode="contained" onPress={() => refetch}>
                Try again
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold'
    },
    text: {
        marginVertical: 10
    }
});