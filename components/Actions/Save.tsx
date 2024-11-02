import {Button, ButtonProps} from "react-native-paper";
import {StyleSheet,} from "react-native";
import {VideoType} from "@/types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = Omit<ButtonProps, 'children'> & {
    video: VideoType;
};

export function Save ({video, ...props} : Props) {

    return (
        <Button
            {...props}
            labelStyle={styles.button}
            icon={({ size, color }) => (
                <MaterialCommunityIcons name="bookmark-outline" size={20} color={color} style={styles.button_icon}/>
            )}
            mode={'contained'}
        >
            Save
        </Button>

    )
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 6,
        marginHorizontal: 10,
        fontSize: 13
    },
    button_icon: {
        paddingRight: 15
    }
});
