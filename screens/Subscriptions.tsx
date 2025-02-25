import * as React from 'react';
import {View, StyleSheet, Image, FlatList, ActivityIndicator, RefreshControl} from "react-native";
import {Text, Button,} from "react-native-paper";
import {RouteProps} from "@/navigation/SubscriptionStack";
import {AuthStatus, useAuth} from "@/hooks/useAuth";
import {getSubscriptionsVideos} from "@/api/clipzone";
import {useAccount} from "@/hooks/useAccount";
import {ApiError, NetworkError, VideoSkeleton} from "@/components/commons";
import {FullVideo as Video} from "@/components/Videos";
import {useResponsive} from "@/hooks/useResponsive";
import {useCursorQuery} from "@/hooks/useCursorQuery";

type Props = {
    navigation: RouteProps
}
export default function Subscriptions({navigation} : Props ) {

    const {status} = useAuth();
    const {isAuthenticated} = useAccount();

    const {numColumns, hasMultipleColumns} = useResponsive();

    const {
        data,
        isLoading,
        isFetching,
        isError,
        error,
        isPaused,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useCursorQuery({
        queryKey: ['subscriptions-videos'],
        queryFn: ({pageParam}) => getSubscriptionsVideos(pageParam),
        enabled: isAuthenticated,
    });

    return (
        <>
            {
                status === AuthStatus.Authenticated &&
                <View style={styles.container_auth}>
                    {isPaused && <NetworkError refetch={refetch}/>}
                    {isLoading &&
                        <FlatList
                            key={numColumns}
                            numColumns={numColumns}
                            columnWrapperStyle={hasMultipleColumns ? styles.wrapper : false}
                            data={[ ...Array(numColumns * 4).keys()]}
                            renderItem={({item}) => (
                                <View style={{flex:1/numColumns}}>
                                    <VideoSkeleton/>
                                </View>
                            )}
                            keyExtractor={((item, index) => index.toString())}
                        />
                    }
                    {isError && <ApiError refetch={refetch} error={error}/>}
                    {
                        data &&
                        <FlatList
                            key={numColumns}
                            numColumns={numColumns}
                            columnWrapperStyle={hasMultipleColumns ? styles.wrapper : false}
                            data={data.pages.flatMap(page => page.data)}
                            renderItem={({item}) => (
                                <View style={{flex:1/numColumns}}>
                                    <Video video={item} />
                                </View>
                            )}
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
                            onEndReachedThreshold={2}
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
    wrapper: {
        gap: 10,
        margin: 10
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