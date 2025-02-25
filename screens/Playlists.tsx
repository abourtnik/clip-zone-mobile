import * as React from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, View,} from "react-native";
import {useCursorQuery} from "@/hooks/useCursorQuery";
import {getMyPlaylists} from "@/api/clipzone";
import {Alert, ApiError, Loader, NetworkError} from "@/components/commons";
import {MyPlaylist} from "@/components/Playlists";

export default function Playlists() {

    const {
        data: playlists,
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
        fetchNextPage,
        hasNextPage,
        isPaused,
    } = useCursorQuery({
        queryKey: ['user-playlists'],
        queryFn: ({pageParam}) => getMyPlaylists(pageParam),
    });

    return (
        <View style={styles.videos}>
            {isPaused && <NetworkError refetch={refetch}/>}
            {isLoading && <Loader/>}
            {isError && <ApiError refetch={refetch} error={error}/>}
            {
                playlists &&
                <FlatList
                    data={playlists.pages.flatMap(page => page.data)}
                    renderItem={({item}) => (
                        <MyPlaylist playlist={item} />
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
                    onEndReachedThreshold={0.5}
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