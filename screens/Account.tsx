import {ScrollView, StyleSheet, View, Share, Linking} from 'react-native';
import {Button, Text, List, Switch, Card, Avatar} from 'react-native-paper';
import {useAuth, AuthStatus} from "@/hooks/useAuth";
import Constants from 'expo-constants';
import {useThemeStore} from "@/stores/useThemeStore";
import {useTranslation} from "react-i18next";
import {useAccount} from "@/hooks/useAccount";
import {RouteProps} from "@/navigation/AccountStack";

type Props = {
    navigation: RouteProps
}

export default function Account({navigation} : Props) {

    const {logout, status} = useAuth();
    const {account} = useAccount();

    const { t } = useTranslation();

    const {theme, toggleTheme} = useThemeStore();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.account_container}>
                {
                    status === AuthStatus.Guest &&
                    <Button
                        theme={theme}
                        mode="contained"
                        style={styles.button}
                        onPress={() => navigation.navigate('Login')}
                        icon={'account'}
                    >
                        {t( 'Sign In')}
                    </Button>
                }
                {
                    status === AuthStatus.Authenticated &&
                    <Card>
                        <Card.Content style={styles.account}>
                            <Avatar.Image size={50} source={{uri: account?.avatar_url}}
                            />
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <Text variant="titleLarge">{account?.username}</Text>
                                <Text variant="bodyMedium">{account?.email}</Text>
                            </View>
                        </Card.Content>
                    </Card>
                }
            </View>
            <List.Section>
                <List.Subheader>{t( 'Settings')}</List.Subheader>
                <View style={styles.section}>
                    <List.Item
                        title="Enable dark mode"
                        left={() => <List.Icon icon="moon-waning-crescent" />}
                        right={() => <Switch value={theme.dark} onValueChange={toggleTheme} />}
                        style={styles.separator}
                    />
                    <List.Item
                        title="Language"
                        left={() => <List.Icon icon="earth" />}
                        right={() => <List.Icon icon="chevron-right" />}
                        onPress={() => navigation.navigate('Language')}
                        style={styles.separator}
                    />
                    <List.Item
                        title="Enabled videos autoplay"
                        left={() => <List.Icon icon="play-circle-outline" />}
                        right={() => <Switch value={false} onValueChange={(value) => console.log(value)} />}
                        style={styles.separator}
                    />
                </View>
            </List.Section>
            <List.Section >
                <List.Subheader>About</List.Subheader>
                <View style={styles.section}>
                    <List.Item
                        title="Share Application"
                        left={() => <List.Icon icon="share" />}
                        right={() => <List.Icon icon="chevron-right" />}
                        style={styles.separator}
                        onPress={() => Share.share({
                            title: 'Share ClipZone',
                            message: 'Check out ClipZone, a video sharing app that allows you to share your favorite videos with your friends and family. It is a simple and easy-to-use app that makes it easy to upload, share, and discover new videos. Whether you are a beginner or an experienced user, ClipZone has something for everyone.',
                        })}
                    />
                    <List.Item
                        title="Contact"
                        left={() => <List.Icon icon="email" />}
                        right={() => <List.Icon icon="chevron-right" />}
                        onPress={() => Linking.openURL('mailto:contact@antonbourtnik.fr?subject=Contact à propos de l\'application Pop Corn)')}
                    />
                </View>
            </List.Section>
            <List.Section >
                <List.Subheader>Legal</List.Subheader>
                <View style={styles.section}>
                    <List.Item
                        title="Terms of Service"
                        left={() => <List.Icon icon="scale-balance" />}
                        right={() => <List.Icon icon="chevron-right" />}
                        style={styles.separator}
                        onPress={() => Linking.openURL('https://clip-zone.com/terms')}
                    />
                    <List.Item
                        title="Privacy Policy"
                        left={() => <List.Icon icon="shield-account-outline" />}
                        right={() => <List.Icon icon="chevron-right" />}
                        onPress={() => Linking.openURL('https://clip-zone.com/terms)')}
                    />
                </View>
            </List.Section>
            {
                status === AuthStatus.Authenticated &&
                <Button compact={true} mode="text" onPress={logout}>
                    Logout
                </Button>
            }
            <View style={styles.footer}>
                <Text>App Version : {Constants.expoConfig?.version}</Text>
                <Text>Device ID : 123</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
   },
    account_container: {
        marginTop: 25,
        marginHorizontal: 10
    },
    button: {
        borderRadius: 10
    },
    account: {
        flexDirection: 'row',
        alignItems : 'center'
    },
    section: {
        backgroundColor: 'white',
        paddingHorizontal: 20
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
    },
    footer: {
        padding: 20,
        alignItems: 'center',
        gap: 10
    }
});