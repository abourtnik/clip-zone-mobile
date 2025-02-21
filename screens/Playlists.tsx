import * as React from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, View,} from "react-native";
import {RouteProps} from "@/navigation/SubscriptionStack";
import {useCursorQuery} from "@/hooks/useCursorQuery";
import {getMyPlaylists} from "@/api/clipzone";
import {Alert, ApiError, Loader, NetworkError} from "@/components/commons";
import {useResponsive} from "@/hooks/useResponsive";
import {MyPlaylist} from "@/components/Playlists";

type Props = {
    navigation: RouteProps
}
export default function Playlists({navigation} : Props ) {

    const {numColumns, hasMultipleColumns} = useResponsive();

    const {
        data: playlists,
        isLoading,
        isFetching,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage,
        isPaused,
    } = useCursorQuery({
        key: ['user-playlists'],
        fetchFn: ({pageParam}) => getMyPlaylists(pageParam),
    });

    return (
        <View style={styles.videos}>
            {isPaused && <NetworkError refetch={refetch}/>}
            {isLoading && <Loader/>}
            {isError && <ApiError refetch={refetch}/>}
            {
                playlists &&
                <FlatList
                    key={numColumns}
                    numColumns={numColumns}
                    columnWrapperStyle={hasMultipleColumns ? {gap: 7} : false}
                    data={playlists.pages.flatMap(page => page.data)}
                    renderItem={({item}) => (
                        <View style={{flex:1/numColumns}}>
                            <MyPlaylist playlist={item} />
                        </View>
                    )}
                    keyExtractor={item => item.uuid}
                    ListFooterComponent={
                        isFetching ? <ActivityIndicator color={'red'} style={{marginBottom: 10}}/> : null
                    }
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Alert message={'This user has no videos'} />
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
    )
}

const styles = StyleSheet.create({
    videos: {
        flex: 1,
        paddingBottom: 5,
    },
    empty: {
        height: 37,
        marginHorizontal: 15
    },
});