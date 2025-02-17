import {View, StyleSheet, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {FullVideo as Video} from "../components/Videos";
import {useInfiniteQuery} from "@tanstack/react-query";
import {getVideos} from '@/api/clipzone'
import {ApiError, NetworkError, VideoSkeleton} from "@/components/commons";
import {useThemeStore} from "@/stores/useThemeStore";
import {useResponsive} from "@/hooks/useResponsive";
export default function Home() {

    const {numColumns, hasMultipleColumns} = useResponsive();

    const theme = useThemeStore(state => state.theme)

    const {
        data: videos,
        isLoading,
        isFetching,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage,
        isPaused
    } = useInfiniteQuery({
        queryKey: ['videos'],
        queryFn: ({pageParam}) => getVideos(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.meta.current_page === lastPage.meta.last_page) {
                return undefined
            }
            return lastPageParam + 1
        }
    });

    return (
        <View style={styles.container}>
            {isPaused && <NetworkError refetch={refetch}/>}
            {isLoading && [ ...Array(3).keys()].map(i => <VideoSkeleton key={i}/>)}
            {isError && <ApiError refetch={refetch}/>}
            {
                videos &&
                <FlatList
                    numColumns={numColumns}
                    columnWrapperStyle={hasMultipleColumns ? styles.wrapper : false}
                    data={videos.pages.flatMap(page => page.data)}
                    renderItem={({item}) => (
                        <View style={{flex:1/numColumns}}>
                            <Video video={item} />
                        </View>
                    )}
                    keyExtractor={item => item.uuid}
                    ListFooterComponent={
                        isFetching ? <ActivityIndicator color={'red'} style={{marginBottom: 10}}/> : null
                    }
                    refreshControl={
                        <RefreshControl colors={["#9Bd35A", "#689F38"]} refreshing={isLoading} onRefresh={() => refetch()} />
                    }
                    onEndReached={(hasNextPage && !isFetching) ? () => fetchNextPage() : null}
                    onEndReachedThreshold={2}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        gap: 7,
        margin: 10
    }
});