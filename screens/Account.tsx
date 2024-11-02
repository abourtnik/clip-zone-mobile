import {ScrollView, StyleSheet, View, Share, Linking} from 'react-native';
import {Button, Text, List, Switch, Card, Avatar} from 'react-native-paper';
import {useAuth, AuthStatus} from "@/hooks/useAuth";
import Constants from 'expo-constants';
import {useThemeStore} from "@/stores/useThemeStore";
import {useSettingsStore} from "@/stores/useSettingsStore";
import {useTranslation} from "react-i18next";
import {useAccount} from "@/hooks/useAccount";
import {RouteProps} from "@/navigation/AccountStack";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


type Props = {
    navigation: RouteProps
}

export default function Account({navigation} : Props) {

    const {logout, status} = useAuth();
    const {account} = useAccount();

    const { t } = useTranslation();

    const {theme, toggleTheme} = useThemeStore();

    const {autoPlay, setAutoplay} = useSettingsStore()

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
                                {
                                    account?.is_premium &&
                                    <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFC107', paddingHorizontal: 5, paddingVertical: 5, marginTop: 10, marginHorizontal: 10, borderRadius: 10, gap: 5,}}>
                                        <MaterialCommunityIcons name="star" color={'white'} size={15} />
                                        <Text style={{color: 'white', fontWeight: 'bold'}} variant="bodySmall">Premium account</Text>
                                    </View>
                                }
                            </View>
                        </Card.Content>
                    </Card>
                }
            </View>
            {
             /*   !account?.is_premium &&
                <View style={styles.premium}>
                    <MaterialCommunityIcons name="star" color={'white'} size={25} />
                    <Text style={styles.premium_text} variant="titleMedium">ClipZone Premium</Text>
                </View>*/
            }
            <List.Section>
                <List.Subheader>{t( 'Settings')}</List.Subheader>
                {/*<List.Item
                        title="Enable dark mode"
                        left={() => <List.Icon icon="moon-waning-crescent" />}
                        right={() => <Switch value={theme.dark} onValueChange={toggleTheme} />}
                        style={styles.item}
                    />
                    <List.Item
                        title="Language"
                        left={() => <List.Icon icon="earth" />}
                        right={() => <List.Icon icon="chevron-right" />}
                        onPress={() => navigation.navigate('Language')}
                        style={styles.item}
                    />*/}
                <List.Item
                    title="Videos autoplay"
                    left={() => <List.Icon icon="play-circle-outline" />}
                    right={() => <Switch value={autoPlay} onValueChange={setAutoplay} />}
                    style={styles.item}
                />
            </List.Section>
            <List.Section >
                <List.Subheader>About</List.Subheader>
                <List.Item
                    title="Share Application"
                    left={() => <List.Icon icon="share" />}
                    right={() => <List.Icon icon="chevron-right" />}
                    style={[styles.item, styles.border]}
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
                    style={styles.item}
                />
            </List.Section>
            <List.Section >
                <List.Subheader>Legal</List.Subheader>
                <List.Item
                    title="Terms of Service"
                    left={() => <List.Icon icon="scale-balance" />}
                    right={() => <List.Icon icon="chevron-right" />}
                    style={[styles.item, styles.border]}
                    onPress={() => Linking.openURL('https://clip-zone.com/terms')}
                />
                <List.Item
                    title="Privacy Policy"
                    left={() => <List.Icon icon="shield-account-outline" />}
                    right={() => <List.Icon icon="chevron-right" />}
                    style={styles.item}
                    onPress={() => Linking.openURL('https://clip-zone.com/terms)')}

                />
            </List.Section>
            {
                status === AuthStatus.Authenticated &&
                <Button compact={true} mode="text" onPress={logout}>
                    Logout
                </Button>
            }
            <View style={styles.footer}>
                <Text>App Version : {Constants.expoConfig?.version}</Text>
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
    premium: {
       backgroundColor: '#FFC107',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 25,
        marginHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        gap: 25,
        color: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity:  0.17,
        shadowRadius: 3.05,
        elevation: 4
    },
    premium_text: {
        color: 'white',
        fontWeight: 'bold'
    },
    item: {
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    border: {
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
    },
    footer: {
        padding: 20,
        alignItems: 'center',
        gap: 10
    }
});