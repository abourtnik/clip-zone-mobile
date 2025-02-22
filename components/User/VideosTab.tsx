import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {Button} from "react-native-paper";
import {useInfiniteQuery} from "@tanstack/react-query";
import {getUserVideos,} from "@/api/clipzone";
import {Alert, ApiError, Loader, NetworkError} from "@/components/commons";
import {ListVideo as Video} from "../Videos";
import {UserType, UserVideosSort} from "@/types";
import {useState, Fragment, memo} from "react";
import {useResponsive} from "@/hooks/useResponsive";

type Props = {
    user: UserType
}

export const VideosTab = memo(({user} : Props) => {

    const {numColumns, hasMultipleColumns} = useResponsive();

    const [sort, setSort] = useState<UserVideosSort>('latest');

    const {
        data: videos,
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
        fetchNextPage,
        hasNextPage,
        isPaused
    } = useInfiniteQuery({
        enabled: true,
        queryKey: ['user', user.id, 'videos', sort],
        queryFn: ({pageParam}) => getUserVideos(user.id, pageParam, sort),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.meta.current_page === lastPage.meta.last_page) {
                return undefined
            }
            return lastPageParam + 1
        }
    });

    const selectSort = async (type: UserVideosSort) => {
        if (type !== sort) {
            setSort(type)
        }
    }

    return (
        <View style={styles.tab}>
            <Fragment>
                {
                    user.videos_count > 0 &&
                    <View style={styles.buttons}>
                        <Button
                            mode={sort === 'latest' ? 'contained' : 'outlined'}
                            style={{borderRadius: 5}}
                            labelStyle={styles.button}
                            compact={true}
                            onPress={() => selectSort('latest')}
                        >
                            Latest
                        </Button>
                        <Button
                            mode={sort === 'popular' ? 'contained' : 'outlined'}
                            style={{borderRadius: 5}}
                            labelStyle={styles.button}
                            compact={true}
                            onPress={() => selectSort('popular')}
                        >
                            Popular
                        </Button>
                        <Button
                            mode={sort === 'oldest' ? 'contained' : 'outlined'}
                            style={{borderRadius: 5}}
                            labelStyle={styles.button}
                            compact={true}
                            onPress={() => selectSort('oldest')}
                        >
                            Oldest
                        </Button>
                    </View>
                }
                <View style={styles.videos}>
                    {isPaused && <NetworkError refetch={refetch}/>}
                    {isLoading && <Loader/>}
                    {isError && <ApiError refetch={refetch} error={error}/>}
                    {
                        videos &&
                        <FlatList
                            key={numColumns}
                            numColumns={numColumns}
                            columnWrapperStyle={hasMultipleColumns ? {gap: 10} : false}
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
            </Fragment>
        </View>
    )
})

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        marginTop: 10,
    },
    buttons: {
        flexDirection: 'row',
        gap: 8,
        marginHorizontal: 15,
    },
    button: {
        marginVertical: 4,
        fontSize: 13,
        marginHorizontal: 10
    },
    videos: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10
    },
    empty: {
        height: 37,
        marginHorizontal: 15
    },
});