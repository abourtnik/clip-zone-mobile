import * as React from 'react';
import {View, StyleSheet, Image, FlatList, ActivityIndicator, RefreshControl} from "react-native";
import {Text, Button,} from "react-native-paper";
import {RouteProps} from "@/navigation/SubscriptionStack";
import {AuthStatus, useAuth} from "@/hooks/useAuth";
import {useInfiniteQuery} from "@tanstack/react-query";
import {getSubscriptionsVideos} from "@/api/clipzone";
import {useAccount} from "@/hooks/useAccount";
import {ApiError, VideoSkeleton} from "@/components/commons";
import {FullVideo as Video} from "@/components/Videos";

type Props = {
    navigation: RouteProps
}
export default function Subscriptions({navigation} : Props ) {

    const {status} = useAuth();
    const {isAuthenticated} = useAccount();

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery({
        queryKey: ['subscriptions-videos'],
        queryFn: ({pageParam}) => getSubscriptionsVideos(pageParam),
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
                    {isLoading && [ ...Array(3).keys()].map(i => <VideoSkeleton key={i}/>)}
                    {isError && <ApiError refetch={refetch}/>}
                    {
                        data &&
                        <FlatList
                            data={data.pages.flatMap(page => page.data)}
                            renderItem={({item}) => <Video video={item} />}
                            keyExtractor={item => item.uuid}
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
    },
    container_guest: {
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
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    channels: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    user: {
        alignItems: 'center',
        gap: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
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