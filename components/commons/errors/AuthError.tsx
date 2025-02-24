import {Button, Portal, Text} from "react-native-paper";
import {useAuthStore} from "@/stores/useAuthStore";
import {useNavigation} from "@react-navigation/native";
import {RouteProps} from "@/navigation/HomeStack";
import BottomSheet, {BottomSheetBackdrop, BottomSheetView} from "@gorhom/bottom-sheet";
import {Linking, StyleSheet, View} from "react-native";
import {useRef, useEffect} from "react";
import {useAuth} from "@/hooks/useAuth";

export function AuthError () {

    const {error, reset} = useAuthStore();
    const {manualLogout} = useAuth();

    const navigation = useNavigation<RouteProps>();

    const bottomSheet = useRef<BottomSheet>(null);

    useEffect(() => {
        error ? bottomSheet.current?.expand() : bottomSheet.current?.close()

        if (error && error.code === 401) {
            manualLogout()
        }

    }, [error]);

    const login = () => {
        reset()
        navigation.navigate('Login')
    }

    const register = () => {
        reset()
        Linking.openURL('https://clip-zone.com/register')
    }


    return (
        <Portal>
            <BottomSheet
                ref={bottomSheet}
                snapPoints={[180]}
                onClose={reset}
                index={-1}
                enablePanDownToClose={true}
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        {...props}
                        disappearsOnIndex={-1}
                        appearsOnIndex={0}
                        opacity={0.5}
                    />
                )}
            >
                <BottomSheetView style={styles.container} >
                    <View style={styles.content}>
                        <Text variant={'titleMedium'} style={styles.title}>{error?.title}</Text>
                        <Text style={styles.description} variant={'titleSmall'}>{error?.description}</Text>
                    </View>
                    <View style={styles.button_container}>
                        <Button labelStyle={styles.button} mode="outlined" onPress={register}>
                            Register
                        </Button>
                        <Button labelStyle={styles.button} textColor={'white'} mode="contained" onPress={login}>
                            Sign In
                        </Button>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </Portal>
    )
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        marginTop: 10,
    },
    content: {
        paddingHorizontal: 20,
        flexDirection: 'column',
        gap: 7,
    },
    title: {
        fontWeight: 'bold',
    },
    description: {
        color: 'grey',
    },
    button_container: {
        marginTop: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
    },
    button: {
        marginVertical: 10,
        fontSize: 14,
        fontWeight: 'bold',
    }
});