import {Button, Portal, Text} from "react-native-paper";
import {useErrorStore} from "@/stores/useErrorStore";
import BottomSheet, {BottomSheetBackdrop, BottomSheetView} from "@gorhom/bottom-sheet";
import { StyleSheet, View} from "react-native";
import {useRef, useEffect} from "react";

export function MainError () {

    const {error, reset} = useErrorStore();

    const bottomSheet = useRef<BottomSheet>(null);

    useEffect(() => {
        error ? bottomSheet.current?.expand() : bottomSheet.current?.close()
    }, [error]);

    return (
        <Portal>
            <BottomSheet
                ref={bottomSheet}
                snapPoints={[160]}
                index={-1}
                onClose={reset}
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
                        <Text variant={'titleMedium'} style={styles.title}>Oups, an error occurred !</Text>
                        <Text variant={'bodyMedium'} style={styles.error}>{error}</Text>
                    </View>
                    <View style={styles.button_container}>
                        <Button labelStyle={styles.button} mode="outlined" onPress={reset}>
                           Close
                        </Button>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </Portal>
    )
}
const styles= StyleSheet.create({
    container : {
        flex: 1,
        marginVertical: 10,
    },
    content: {
        paddingHorizontal: 20,
        flexDirection: 'column',
        gap: 7,
    },
    title: {
        fontWeight: 'bold',
    },
    error: {
        color: 'grey',
    },
    button_container: {
        marginVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        marginVertical: 6,
        fontSize: 14,
        fontWeight: 'bold',
    }
});