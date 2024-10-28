import {RefObject} from 'react'
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import {IconButton, Text, Avatar, Button} from 'react-native-paper';
import BottomSheet, {BottomSheetBackdrop, BottomSheetScrollView} from "@gorhom/bottom-sheet";
import {VideoType} from "@/types";
import moment from "moment";
import {useNavigation} from "@react-navigation/native";
import {RouteProps} from "@/navigation/HomeStack";

type Props = {
    video: VideoType,
    bottomSheetRef: RefObject<BottomSheet>
}

const video_height = 242;

export function Description ({video, bottomSheetRef}: Props) {

    const navigation = useNavigation<RouteProps>();

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={[Dimensions.get('window').height - video_height]}
            index={-1}
            enablePanDownToClose={true}
            backdropComponent={(props) => (
                <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                    opacity={0.5}
                />
            )}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text variant={'titleMedium'}>Description</Text>
                    <IconButton
                        icon="close"
                        iconColor={'black'}
                        size={20}
                        onPress={() => bottomSheetRef.current?.close()}
                    />
                </View>
                <View style={styles.separator}></View>
                <BottomSheetScrollView contentContainerStyle={styles.content_container}>
                    <View style={styles.content}>
                        <Text variant={'titleMedium'} style={styles.title}>{video.title}</Text>
                        <View style={styles.infos}>
                            {
                                video.show_likes &&
                                <View style={styles.info}>
                                    <Text style={styles.counter}>{video.likes}</Text>
                                    <Text variant={'bodySmall'} style={styles.label}>Likes</Text>
                                </View>
                            }
                            <View style={styles.info}>
                                <Text style={styles.counter}>{video.views}</Text>
                                <Text variant={'bodySmall'} style={styles.label}>views</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.counter}>{moment(video.publication_date).format('YYYY')}</Text>
                                <Text variant={'bodySmall'} style={styles.label}>{moment(video.publication_date).format('DD MMM')}</Text>
                            </View>
                        </View>
                        {
                            video.short_description &&
                            <Pressable
                                style={({ pressed }) => [
                                    pressed && styles.pressed,
                                    styles.description
                                ]}
                            >
                                <Text>{video.short_description}</Text>
                            </Pressable>
                        }
                    </View>
                    <Pressable
                        style={({ pressed }) => [
                            pressed && styles.pressed,
                            styles.user
                        ]}
                        onPress={() => navigation.navigate('User', {id: video.user.id, username: video.user.username})}
                    >
                        <Avatar.Image
                            size={30}
                            source={{
                                uri:video.user.avatar,
                            }}
                        />
                        <View>
                            <Text style={styles.username}>{video.user.username}</Text>
                            {video.user.show_subscribers && <Text style={styles.subscribers}>{video.user.subscribers} subscribers</Text>}
                        </View>
                    </Pressable>
                    <View style={styles.buttons}>
                        <Button
                            labelStyle={styles.button}
                            mode={'outlined'}
                            compact={true}
                            icon={'video-outline'}
                            onPress={() => navigation.navigate('User', {id: video.user.id, username: video.user.username})}
                        >
                            Videos
                        </Button>
                        <Button
                            labelStyle={styles.button}
                            mode={'outlined'}
                            compact={true}
                            icon={'account-box'}
                            onPress={() => navigation.navigate('User', {id: video.user.id, username: video.user.username})}
                        >
                            About
                        </Button>
                    </View>
                </BottomSheetScrollView>
            </View>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingBottom: 20
    },
    header: {
        justifyContent: 'space-between',
        alignItems : 'center',
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        marginTop: 3
    },
    content_container: {
        paddingVertical: 10,
    },
    content : {
        paddingHorizontal: 15,
    },
    title : {
        textAlign : 'left',
        fontWeight: 'bold'
    },
    infos : {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20
    },
    info : {
        alignItems: 'center'
    },
    counter : {
        fontWeight: 'bold'
    },
    label : {
        color: '#606060',
    },
    description : {
        backgroundColor: '#F4F4F4',
        borderRadius: 10,
        padding: 10
    },
    pressed : {
        backgroundColor : '#E8E8E8'
    },
    user : {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    username : {
        fontWeight: 'bold'
    },
    subscribers : {
        color : 'grey'
    },
    buttons : {
        flexDirection:'row',
        gap: 8,
        paddingHorizontal: 15,
    },
    button : {
        marginVertical: 5,
        marginHorizontal: 10,
        fontSize: 13
    }
});