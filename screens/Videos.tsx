import * as React from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, View,} from "react-native";
import {useCursorQuery} from "@/hooks/useCursorQuery";
import {getMyVideos} from "@/api/clipzone";
import {Alert, ApiError, Loader, NetworkError} from "@/components/commons";
import {MyVideo as Video} from "@/components/Videos";

export default function Videos() {

    const {
        data: videos,
        isLoading,
        isFetching,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage,
        isPaused,
    } = useCursorQuery({
        key: ['user-videos'],
        fetchFn: ({pageParam}) => getMyVideos(pageParam),
    });

    return (
        <View style={styles.videos}>
            {isPaused && <NetworkError refetch={refetch}/>}
            {isLoading && <Loader/>}
            {isError && <ApiError refetch={refetch}/>}
            {
                videos &&
                <FlatList
                    data={videos.pages.flatMap(page => page.data)}
                    renderItem={({item}) => (
                        <Video video={item} />
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