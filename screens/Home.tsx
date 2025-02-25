import {View, StyleSheet, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {FullVideo as Video} from "../components/Videos";
import {getVideos} from '@/api/clipzone'
import {ApiError, NetworkError, VideoSkeleton} from "@/components/commons";
import {useThemeStore} from "@/stores/useThemeStore";
import {useResponsive} from "@/hooks/useResponsive";
import {useCursorQuery} from "@/hooks/useCursorQuery";
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
        error,
        hasNextPage,
        isPaused
    } = useCursorQuery({
        queryKey: ['videos'],
        queryFn: ({pageParam}) => getVideos(pageParam)
    });

    return (
        <View style={styles.container}>
            {isPaused && <NetworkError refetch={refetch}/>}
            {isLoading &&
                <FlatList
                    key={numColumns}
                    numColumns={numColumns}
                    columnWrapperStyle={hasMultipleColumns ? styles.wrapper : false}
                    data={[ ...Array(numColumns * 4).keys()]}
                    renderItem={() => (
                        <View style={{flex:1/numColumns}}>
                            <VideoSkeleton/>
                        </View>
                    )}
                    keyExtractor={((_, index) => index.toString())}
                />
            }
            {isError && <ApiError refetch={refetch} error={error}/>}
            {
                videos &&
                <FlatList
                    key={numColumns}
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
        gap: 10,
        margin: 10
    }
});