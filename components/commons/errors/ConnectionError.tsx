import { onlineManager } from '@tanstack/react-query'
import {Portal, Snackbar} from "react-native-paper";
import {useEffect, useState} from "react";
export function ConnectionError () {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = onlineManager.subscribe((isOnline) => {
            setVisible(!isOnline);
        })
        return () => unsubscribe();
    }, []);
    return (
        <Portal>
            <Snackbar
                visible={visible}
                onDismiss={() => setVisible(false)}
                action={{
                    label: 'Ignore',
                    onPress: () => setVisible(false),
                }}
                duration={Infinity}
            >
                No internet connection
            </Snackbar>
        </Portal>
    )
}