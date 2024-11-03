import {useEffect, useState} from "react";
import {Button, ButtonProps, Portal, Modal, Text, RadioButton} from "react-native-paper";
import {StyleSheet, View,} from "react-native";
import {useAccount} from "@/hooks/useAccount";
import {report} from "@/api/clipzone";
import {ReportReason, VideoType, REPORT_REASONS} from "@/types";
import {useAuthMutation} from "@/hooks/useAuthMutation";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import moment from "moment/moment";

type Props = Omit<ButtonProps, 'children'> & {
    video: VideoType;
};

export function Report ({video, ...props} : Props) {

    const {isAuthenticated, account, isGuest} = useAccount();

    const [reported, setReported] = useState<boolean>(video?.reported_by_auth_user ?? false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [value, setValue] = useState<ReportReason | null>(null);

    useEffect(() => {
        setReported(video?.reported_by_auth_user ?? false);
    }, [video?.reported_by_auth_user ?? false]);

    const {isPending, mutate} = useAuthMutation({
        mutationFn: () => report(video.id, value as ReportReason),
        mutationKey: ['report', video.id],
        onSuccess: () => {
            setShowModal(false);
            setReported(v => !v);
        },
        authError: 'Sign in to report inappropriate content.'
    })

    if (isAuthenticated && account && account.id === video.user.id) {
        return <></>
    }

    return (
        <>
            <Portal>
                <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.modal}>
                    <Text variant={'titleMedium'}>Report Video</Text>
                    <View style={styles.form}>
                        <RadioButton.Group onValueChange={(value) => setValue(value)} value={value as ReportReason}>
                            {
                                REPORT_REASONS.map((reason, index) => (
                                    <View key={index} style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                                        <RadioButton.Android value={reason} />
                                        <Text>{reason}</Text>
                                    </View>
                                ))
                            }
                        </RadioButton.Group>
                    </View>
                    <View style={styles.buttons_container}>
                        <Button mode={'text'} onPress={() => setShowModal(false)}>Cancel</Button>
                        <Button disabled={!value || isPending} loading={isPending} labelStyle={styles.button} mode={'contained'} onPress={() => mutate()}>Report</Button>
                    </View>
                </Modal>
            </Portal>
            <Button
                {...props}
                onPress={() => isGuest ? mutate() : setShowModal(true)}
                labelStyle={styles.button}
                disabled={reported}
                textColor={reported ? 'black' : 'white'}
                buttonColor={reported ? '#E8E8E8' : '#6750A4'}
                icon={({ size, color }) => (
                    <MaterialCommunityIcons name="flag-outline" size={20} color={color} style={styles.button_icon}/>
                )}
                mode={'contained'}
            >
                {reported ? 'Reported ' + moment(video.report_at).fromNow() : 'Report '}
            </Button>
        </>

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
    },
    form: {
        marginVertical: 15,
    },
    modal: {
        marginHorizontal: 15,
        backgroundColor: 'white',
        padding: 20
    },
    buttons_container: {
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'flex-end',
       gap: 10,
    },
});