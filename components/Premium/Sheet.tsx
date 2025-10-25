import {View, StyleSheet, Linking} from 'react-native';
import {BottomSheetBackdrop, BottomSheetModal, BottomSheetView} from "@gorhom/bottom-sheet";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {RefObject} from "react";
import {Text, Button} from "react-native-paper";

type Props = {
    sheetRef: RefObject<BottomSheetModal | null>
}
export const Sheet = ({sheetRef}: Props) => {

    return (
        <BottomSheetModal
            ref={sheetRef}
            snapPoints={[360]}
            enablePanDownToClose={true}
            enableDynamicSizing={false}
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
                    <View style={styles.header}>
                        <Text variant={'titleLarge'} style={[styles.header_text, {color: 'red'}]}>ClipZone</Text>
                        <Text variant={'titleLarge'} style={[styles.header_text, {color: '#FFC107'}]}>Premium</Text>
                    </View>
                    <Text variant={'titleMedium'} style={styles.title}>Unleash the full potential of your creative journey with our premium plan</Text>
                    <Text variant={'titleSmall'}>30 days trial • Then 5 € / month • Cancel anytime</Text>
                    <View style={styles.list}>
                        <View style={styles.item}>
                            <MaterialCommunityIcons name="upload" size={20} color={'black'}/>
                            <Text variant={'bodyMedium'}>Unlimited videos uploads and storage space</Text>
                        </View>
                        <View style={styles.item}>
                            <MaterialCommunityIcons name="download" size={17} color={'black'}/>
                            <Text variant={'bodyMedium'}>Save videos for when you really need them – like when you’re on a plane or commuting.</Text>
                        </View>
                        <View style={styles.item}>
                            <MaterialCommunityIcons name="account" size={17} color={'black'}/>
                            <Text variant={'bodyMedium'}>Channel promotion</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.button_container}>
                    <Button labelStyle={styles.button} textColor={'black'} mode="text" onPress={() => sheetRef.current?.close()}>
                        Not now
                    </Button>
                    <Button buttonColor={'#FFC107'} labelStyle={styles.button} mode="contained" onPress={() => Linking.openURL('https://clip-zone.com/premium')}>
                        Start Trial
                    </Button>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
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
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    header_text: {
        fontWeight: 'bold',
    },
    title: {
        fontWeight: 'bold',
    },
    list: {
      marginTop: 10,
        flexDirection: 'column',
        gap: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    button_container: {
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        marginTop: 10,
        paddingTop: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    button: {
        marginVertical: 6,
        fontSize: 14,
        fontWeight: 'bold',
    }
});