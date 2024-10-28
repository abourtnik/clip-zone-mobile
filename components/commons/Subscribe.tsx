import {useEffect, useState} from "react";
import {Button, ButtonProps,} from "react-native-paper";
import {StyleSheet,} from "react-native";
import {useAccount} from "@/hooks/useAccount";
import {subscribe} from "@/api/clipzone";
import {TinyUserType} from "@/types";
import {useAuthMutation} from "@/hooks/useAuthMutation";

type Props = Omit<ButtonProps, 'children'> & {
    user: TinyUserType;
};

export function Subscribe ({user, ...props} : Props) {

    const {isAuthenticated, account} = useAccount();

    const [subscribed, setSubscribed] = useState(user?.subscribed_by_auth_user ?? false);

    useEffect(() => {
        setSubscribed(user?.subscribed_by_auth_user ?? false);
    }, [user?.subscribed_by_auth_user ?? false]);

    const {isPending, mutate} = useAuthMutation({
        mutationFn: () => subscribe(user.id),
        mutationKey: ['subscribe', user.id],
        onSuccess: () => setSubscribed(v => !v),
        authError: 'Sign in to subscribe to this channel'
    })

    if (isAuthenticated && account && account.id === user.id) {
        return <></>
    }

    return (
        <>
            <Button
                {...props}
                onPress={() => mutate()}
                labelStyle={styles.button}
                mode={'contained'}
                loading={isPending}
                disabled={isPending}
                textColor={subscribed ? 'black' : 'white'}
                buttonColor={subscribed ? '#E8E8E8' : '#272727'}
            >
                {subscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 6,
        marginHorizontal: 25,
        fontSize: 13,
    }
});
