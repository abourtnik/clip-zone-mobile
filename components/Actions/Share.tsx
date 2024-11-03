import {Button, ButtonProps} from "react-native-paper";
import {StyleSheet, Share as NativeShare} from "react-native";
import {VideoType} from "@/types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = Omit<ButtonProps, 'children'> & {
    video: VideoType;
};

export function Share ({video, ...props} : Props) {

    const share = async () => {
        await NativeShare.share({
            title: video.title,
            message: video.route,
        })
    }

    return (
        <Button
            {...props}
            onPress={share}
            labelStyle={styles.button}
            icon={({ size, color }) => (
                <MaterialCommunityIcons name="share" size={17} color={color} style={styles.button_icon}/>
            )}
            mode={'contained'}
        >
            Share
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