import {Button, Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import {Fragment, useEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import {RouteProps} from "@/navigation/HomeStack";
import {useAuthStore} from "@/stores/useAuthStore";
import {auth, AUTH_ERROR} from "@/constants";

type Props = {
    refetch: Function
    error: Error
}

export function ApiError ({refetch, error}: Props) {

    return (
        <View style={styles.container}>
            <Text style={styles.title} variant="bodyLarge">Oups! Something went wrong!</Text>
            {error.cause === 401 && <Error401 />}
            {
                error.cause !== 401 &&
                <Fragment>
                    <Text style={styles.text}>{error.message ?? 'We are working on fixing the problem. Please try again.'}</Text>
                    <Button icon="reload" mode="contained" onPress={() => refetch()}>
                        Try again
                    </Button>
                </Fragment>
            }
        </View>
    )
}

function Error401 () {

    const navigation = useNavigation<RouteProps>();

    const setAuthError = useAuthStore((state) => state.setError);

    useEffect( () => {
        setAuthError(auth[AUTH_ERROR.UNAUTHENTICATED])
    }, [])

    return (
        <Fragment>
            <Text style={styles.text}>Your session has expired. Please login again.</Text>
            <Button icon="login" mode="contained" onPress={() => navigation.navigate('Login')}>
                Login
            </Button>
        </Fragment>
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