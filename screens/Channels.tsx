import * as React from 'react';
import {View, StyleSheet, Image, FlatList, ActivityIndicator, RefreshControl, Pressable} from "react-native";
import {Text, Button, Avatar} from "react-native-paper";
import {RouteProps} from "@/navigation/SubscriptionStack";
import {AuthStatus, useAuth} from "@/hooks/useAuth";
import {useInfiniteQuery} from "@tanstack/react-query";
import {getSubscriptionsChannels} from "@/api/clipzone";
import {useAccount} from "@/hooks/useAccount";
import {ApiError, Loader} from "@/components/commons";
import {Subscribe} from "@/components/Actions";

type Props = {
    navigation: RouteProps
}
export default function Channels({navigation} : Props ) {

    const {status} = useAuth();
    const {isAuthenticated} = useAccount();

    const {
        data: users,
        isLoading,
        isFetching,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery({
        queryKey: ['subscriptions-channels'],
        queryFn: ({pageParam}) => getSubscriptionsChannels(pageParam),
        enabled: isAuthenticated,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.meta.current_page === lastPage.meta.last_page) {
                return undefined
            }
            return lastPageParam + 1
        }
    });

    return (
        <>
            {
                status === AuthStatus.Authenticated &&
                <View style={styles.container_auth}>
                    {isLoading && <Loader/>}
                    {isError && <ApiError refetch={refetch}/>}
                    {
                        users &&
                        <FlatList
                            data={users.pages.flatMap(page => page.data)}
                            renderItem={({item}) => (
                                <Pressable
                                    style={({ pressed }) => [
                                        pressed && styles.pressed,
                                        styles.row
                                    ]}
                                    onPress={() => navigation.navigate('User', {id: item.id, username: item.username})}
                                >
                                    <View style={styles.user}>
                                        <Avatar.Image size={30} source={{ uri: item.avatar}} />
                                        <Text variant={'bodyMedium'}>{item.username}</Text>
                                    </View>
                                    <Subscribe user={item}/>
                                </Pressable>
                            )}
                            ListFooterComponent={
                                isFetching ? <ActivityIndicator color={'red'} style={{marginBottom: 10}}/> : null
                            }
                            ListEmptyComponent={
                                <View style={styles.empty}>
                                    <Text style={styles.empty_text}>No results found</Text>
                                </View>
                            }
                            refreshControl={
                                <RefreshControl colors={["#9Bd35A", "#689F38"]} refreshing={isLoading} onRefresh={() => refetch()} />
                            }
                            onEndReached={(hasNextPage && !isFetching) ? () => fetchNextPage() : null}
                        />
                    }
                </View>
            }
            {
                status === AuthStatus.Guest &&
                <View style={styles.container_guest}>
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
    container_auth: {
        flex: 1,
        marginTop: 10,
    },
    container_guest: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 10,
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    title: {
        fontWeight: 'bold',
    },
    text: {
        color: 'grey'
    },
    button: {
        marginTop: 10,
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    empty_text: {
        fontWeight: 'bold'
    },
    pressed : {
        backgroundColor : '#E8E8E8'
    },

});