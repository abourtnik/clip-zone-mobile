import {Button, ButtonProps, Portal} from "react-native-paper";
import {StyleSheet} from "react-native";
import {VideoType} from "@/types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {Sheet} from "@/components/Premium";
import {useRef} from "react";
import BottomSheet from "@gorhom/bottom-sheet";

type Props = Omit<ButtonProps, 'children'> & {
    video: VideoType;
};

export function Download ({video, ...props} : Props) {

    const premium = useRef<BottomSheet>(null);

    const download = () => {
        premium.current?.expand()
    }

    return (
        <>
            <Portal>
                <Sheet sheetRef={premium}/>
            </Portal>
            <Button
                {...props}
                onPress={download}
                labelStyle={styles.button}
                icon={({ size, color }) => (
                    <MaterialCommunityIcons name="download" size={17} color={color} style={styles.button_icon}/>
                )}
                mode={'contained'}
                buttonColor={'rgba(0, 0, 0, 0.03)'}
                textColor={'black'}
            >
                Download
            </Button>
        </>

    )
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 7,
        marginHorizontal: 13,
        fontSize: 13,
        fontWeight: 'normal'
    },
    button_icon: {
        paddingRight: 10
    }
});
