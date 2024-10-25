import * as React from 'react';
import {View, StyleSheet, Image} from "react-native";
import {Text, Button} from "react-native-paper";

import {RouteProps} from "@/navigation/SubscriptionStack";
import {AuthStatus, useAuth} from "@/hooks/useAuth";

type Props = {
    navigation: RouteProps
}
export default function Subscriptions({navigation} : Props ) {

    const {status} = useAuth();

    return (
        <>
            {
                status === AuthStatus.Authenticated &&
                <View style={styles.container}>
                   <Text>Show videos</Text>
                </View>
            }
            {
                status === AuthStatus.Guest &&
                <View style={styles.container}>
                    <Image source={require("@/assets/images/subscriptions.png")}/>
                    <Text variant="titleLarge" style={styles.title}>Don’t miss new videos</Text>
                    <Text variant="bodyMedium" style={styles.text}>Sign In to see updates from your favorite channels</Text>
                    <Button mode={'contained'} style={styles.button} onPress={() => navigation.navigate('Login')}>Sign In</Button>
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 10,
    },
    title: {
        fontWeight: 'bold',
    },
    text: {
        color: 'grey'
    },
    button: {
        marginTop: 10,
    }

});