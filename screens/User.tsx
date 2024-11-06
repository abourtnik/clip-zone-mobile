import {View, StyleSheet, Pressable, Image, Linking, useWindowDimensions} from 'react-native';
import {Text, Avatar} from 'react-native-paper';
import {useQuery} from "@tanstack/react-query";
import {getUser} from "@/api/clipzone";
import {ApiError, Loader, NetworkError} from "@/components/commons";
import { TabBar, TabView} from 'react-native-tab-view';
import {useRef, useState} from "react";
import {HomeTab, PlaylistsTab, VideosTab, About} from "@/components/User";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BottomSheet from "@gorhom/bottom-sheet";
import {Subscribe} from "@/components/Actions";

type Props = {
    route: {
        params: {
            id: number
        }
    }
}

export default function User({ route } : Props) {

    const { id } = route.params;

    const about = useRef<BottomSheet>(null);

    const {
        data: user,
        isLoading,
        isError,
        refetch,
        isPaused
    } = useQuery({
        queryKey: ['user', id],
        queryFn: () => getUser(id)
    });

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);

    return (
        <>
            {isPaused && <NetworkError refetch={refetch}/>}
            {isLoading && <Loader/>}
            {isError && <ApiError refetch={refetch}/>}
            {
                user &&
                <View style={styles.container}>
                    <Image resizeMode={'cover'} style={styles.banner} source={{uri: user.banner}}/>
                    <View style={styles.user}>
                        <Avatar.Image size={60} source={{ uri: user.avatar}} />
                        <View>
                            <Text style={styles.username} variant={'titleLarge'}>{user.username}</Text>
                            <Text variant={'bodySmall'}>@{user.slug}</Text>
                            <View style={styles.infos}>
                                {user.show_subscribers && <Text style={styles.info} variant={'bodySmall'}>{user.subscribers} subscribers • </Text>}
                                <Text variant={'bodySmall'} style={styles.info}>{user.videos_count} videos</Text>
                            </View>
                        </View>
                    </View>
                    <Pressable
                        style={({ pressed }) => [
                            pressed && styles.pressed,
                        ]}
                        onPress={() => about.current?.expand()}
                    >
                        <View style={styles.description_container}>
                            {user.description && <Text numberOfLines={2} variant={'bodySmall'} style={styles.description}>{user.short_description}</Text>}
                            {!user.description && <Text variant={'bodySmall'} style={styles.description}>More about this channel</Text>}
                            <MaterialCommunityIcons name="chevron-right" size={20} color={'#606060'} style={{flex: 1}}/>
                        </View>
                    </Pressable>
                    {
                        user.website &&
                        <Pressable
                            style={({ pressed }) => [
                                pressed && styles.pressed,
                            ]}
                            onPress={() => Linking.openURL('https://'+ user.website)}
                        >
                            <Text style={styles.website}>{user.website}</Text>
                        </Pressable>
                    }
                    <Subscribe style={styles.button} user={user}/>
                    <TabView
                        lazy
                        navigationState={{
                            index: index,
                            routes: [
                                { key: 'home', title: 'Home' },
                                { key: 'videos', title: 'Videos' },
                                { key: 'playlists', title: 'Playlists' },
                            ]
                        }}
                        renderTabBar={props => (
                            <TabBar
                                {...props}
                                renderLabel={({ route, focused, color }) => (
                                    <Text style={{ color }}>
                                        {route.title}
                                    </Text>
                                )}
                                tabStyle={{ width: 'auto' }}
                                activeColor={'black'}
                                inactiveColor={'gray'}
                                indicatorStyle={{ backgroundColor: 'black' }}
                                style={{ backgroundColor: 'transparent', marginHorizontal: 15, }}
                            />
                        )}
                        renderScene={({ route }) => {
                            switch (route.key) {
                                case 'home':
                                    return <HomeTab user={user} />;
                                case 'videos':
                                    return <VideosTab user={user} />;
                                case 'playlists':
                                    return <PlaylistsTab user={user} />;
                                default:
                                    return null;
                            }
                        }}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width}}
                    />
                    <About user={user} bottomSheetRef={about}></About>
                </View>
            }
       </>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        //paddingHorizontal: 15,
        //paddingVertical: 10,
        flexGrow: 1
    },
    banner : {
        marginTop: 10,
        marginHorizontal: 15,
        height: 100,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginVertical: 10,
        paddingHorizontal: 15,
    },
    avatar : {
        height : 230
    },
    username: {
        fontWeight: 'bold',
        marginBottom: 2
    },
    infos: {
        flexDirection: 'row',
        marginTop: 5
    },
    info: {
        color: '#606060',
    },
    description_container: {
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent: 'space-between',
        gap: 10,
        paddingHorizontal: 15,
        paddingVertical: 7,
    },
    description: {
        flex: 9,
        color: '#606060',
    },
    website : {
      color : 'black',
      fontWeight: 'bold',
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    pressed : {
        backgroundColor : '#E8E8E8'
    },
    button: {
        marginVertical: 15,
        marginHorizontal: 15,
    }
});
