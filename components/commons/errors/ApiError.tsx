import {Button, Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";

type Props = {
    refetch: Function
    error: Error
}

export function ApiError ({refetch, error}: Props) {

    return (
        <View style={styles.container}>
            <Text style={styles.title} variant="bodyLarge">Oups! Something went wrong!</Text>
            <Text style={styles.text}>{error.message ?? 'We are working on fixing the problem. Please try again.'}</Text>
            <Button icon="reload" mode="contained" onPress={() => refetch()}>
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