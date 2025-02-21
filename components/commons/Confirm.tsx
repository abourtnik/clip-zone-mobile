import {StyleSheet, View} from "react-native";
import {Text, Modal, Portal, Button} from 'react-native-paper';

type Props = {
    open: boolean,
    onConfirm: () => void
    onCancel: () => void
    title?: string
}


export function Confirm ({open, onConfirm, onCancel, title } : Props) {

    return (
        <Portal>
            <Modal visible={open} onDismiss={onCancel} contentContainerStyle={styles.modal}>
                {title && <Text>{title}</Text>}
                <View style={styles.buttons}>
                    <Button mode={'text'} onPress={onCancel}>
                        Cancel
                    </Button>
                    <Button mode={'text'} onPress={onConfirm}>
                        Confirm
                    </Button>
                </View>
            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
    modal: {
        marginHorizontal: 15,
        backgroundColor: 'white',
        padding: 20
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 10
    }
});