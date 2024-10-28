import {Portal, Snackbar} from "react-native-paper";
import {useErrorStore} from "@/stores/useErrorStore";
import {useNavigation} from "@react-navigation/native";
import {RouteProps} from "@/navigation/HomeStack";

export function ToastError () {

    const {type, error, reset} = useErrorStore();

    const navigation = useNavigation<RouteProps>();

    const ACTIONS = {
        'AUTH' : {
            label: 'Sign in',
            onPress: () => navigation.navigate('Login'),
        },
        'API' : {
            label: 'Close',
            onPress: reset,
        },
    }

    return (
        <Portal>
            <Snackbar
                visible={!!error}
                onDismiss={reset}
                action={ACTIONS[type ?? 'API']}
                duration={4000}
            >
                {error}
            </Snackbar>
        </Portal>
    )
}