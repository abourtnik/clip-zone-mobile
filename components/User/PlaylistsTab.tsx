import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {useInfiniteQuery} from "@tanstack/react-query";
import {getUserPlaylists} from "@/api/clipzone";
import {Alert, ApiError, VideoSkeleton} from "../commons";
import {Playlist} from "../Playlist";

type Props = {
    userId: number,
}
export function PlaylistsTab({userId} : Props) {

    const {
        data: playlists,
        isLoading,
        isFetching,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery({
        enabled: true,
        queryKey: ['user', userId, 'playlists'],
        queryFn: ({pageParam}) => getUserPlaylists(userId, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.meta.current_page === lastPage.meta.last_page) {
                return undefined
            }
            return lastPageParam + 1
        }
    });


    return (
        <View style={styles.tab}>
            <View style={styles.playlists}>
                {isLoading && [ ...Array(3).keys()].map(i => <VideoSkeleton key={i}/>)}
                {isError && <ApiError refetch={refetch}/>}
                {
                    playlists &&
                    <FlatList
                        data={playlists.pages.flatMap(page => page.data)}
                        renderItem={({item}) => <Playlist playlist={item} />}
                        keyExtractor={item => item.id.toString()}
                        ListFooterComponent={
                            isFetching ? <ActivityIndicator color={'red'} style={{marginBottom: 10}}/> : null
                        }
                        ListEmptyComponent={
                            <View style={styles.empty}>
                                <Alert message={'This user has no playlists'} />
                            </View>
                        }
                        refreshControl={
                            <RefreshControl colors={["#9Bd35A", "#689F38"]} refreshing={isLoading} onRefresh={() => refetch()} />
                        }
                        onEndReached={(hasNextPage && !isFetching) ? () => fetchNextPage() : null}
                    />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        marginTop: 10,
    },
    playlists: {
        flex: 1,
        paddingBottom: 10,
    },
    empty: {
        marginHorizontal: 15
    },
});