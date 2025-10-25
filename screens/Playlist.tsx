import {View, StyleSheet, ScrollView, FlatList, Image, RefreshControl, Share} from 'react-native';
import {Avatar, Button, Text, IconButton} from 'react-native-paper';
import {useQuery} from "@tanstack/react-query";
import {getPlaylist} from "@/api/clipzone";
import {Alert, ApiError, Loader, NetworkError} from "@/components/commons";
import {ListVideo as Video} from "../components/Videos";
import {useResponsive} from "@/hooks/useResponsive";
import {LinearGradient} from "expo-linear-gradient";

type Props = {
    route: {
        params: {
            uuid: string
        }
    }
}

export default function Playlist({ route } : Props) {

    const { uuid } = route.params;

    const {numColumns, hasMultipleColumns} = useResponsive();

    const {
        data: playlist,
        isLoading,
        isError,
        error,
        isPaused,
        refetch
    } = useQuery({
        queryKey: ['playlist', uuid],
        queryFn: () => getPlaylist(uuid)
    });

    const share = () => {
        if (!playlist) return
        Share.share({title: playlist.title, message: playlist.route})
    }

    return (
        <>
            {isPaused && <NetworkError refetch={refetch}/>}
            {isLoading && <Loader/>}
            {isError && <ApiError refetch={refetch} error={error}/>}
            {
                playlist &&
                    <ScrollView style={styles.container}>
                        <LinearGradient style={styles.infos} colors={['#4c669f', '#3b5998', '#192f6a']}>
                            <Image resizeMode={'cover'} style={styles.thumbnail} source={{uri: playlist.thumbnail}}/>
                            <Text style={styles.title} variant="titleLarge">{playlist.title}</Text>
                            <View style={styles.user}>
                                <Avatar.Image size={30} source={{ uri: playlist.user.avatar}} />
                                <Text variant={'labelMedium'} style={styles.username}>de {playlist.user.username}</Text>
                            </View>
                            <Text style={styles.info} variant={'labelMedium'}>Playlist • {playlist.videos_count} videos</Text>
                            {playlist.description && <Text numberOfLines={2} style={styles.description} variant={'labelMedium'}>{playlist.description?.slice(0, 100)}</Text>}
                            <View style={styles.buttons}>
                                <Button buttonColor={'black'} textColor={'white'} style={styles.button} icon={'play'} mode={'contained'}>Tout lire</Button>
                                <IconButton
                                    icon="bookmark-outline"
                                    iconColor={'white'}
                                    size={20}
                                    mode={'contained'}
                                    containerColor={'#536790'}
                                />
                                {
                                    playlist.is_active &&
                                    <IconButton
                                        icon="share"
                                        iconColor={'white'}
                                        size={20}
                                        mode={'contained'}
                                        containerColor={'#536790'}
                                        onPress={share}
                                    />
                                }
                            </View>
                        </LinearGradient>
                        <View style={styles.videos}>
                            <FlatList
                                key={numColumns}
                                numColumns={numColumns}
                                columnWrapperStyle={hasMultipleColumns ? {gap: 7} : false}
                                scrollEnabled={false}
                                data={playlist.videos}
                                renderItem={({item}) => (
                                    <View style={{flex:1/numColumns}}>
                                        <Video video={item} />
                                    </View>
                                )}
                                keyExtractor={(_, index) => index.toString()}
                                refreshControl={
                                    <RefreshControl colors={["#9Bd35A", "#689F38"]} refreshing={isLoading} onRefresh={() => refetch()} />
                                }
                                ListEmptyComponent={
                                    <View style={styles.empty}>
                                        <Alert message={'This playlist does not contain any videos at the moment.'} />
                                    </View>
                                }
                            />
                        </View>
                    </ScrollView>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    infos : {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#6C747E',
    },
    thumbnail : {
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    title: {
        marginVertical: 15,
        color: 'white',
        fontWeight: 'bold'
    },
    user : {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
    },
    username : {
      color : 'white'
    },
    info : {
        color : 'white',
        marginBottom: 10,
    },
    description : {
        color : 'white',
        marginBottom: 10,
    },
    buttons: {
        flexDirection: 'row',
        gap: 5
    },
    button : {
        flex: 3,
        marginVertical: 5,
        fontSize: 13
    },
    videos : {
        margin: 10
    },
    empty: {
        marginHorizontal: 15
    },
});
