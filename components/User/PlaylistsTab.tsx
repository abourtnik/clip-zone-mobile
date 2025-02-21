import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {useInfiniteQuery} from "@tanstack/react-query";
import {getUserPlaylists} from "@/api/clipzone";
import {Alert, ApiError, Loader, NetworkError} from "@/components/commons";
import {ListPlaylist} from "@/components/Playlists";
import {UserType} from "@/types";
import {memo} from "react";
import {useResponsive} from "@/hooks/useResponsive";

type Props = {
    user: UserType
}
export const PlaylistsTab = memo(({user} : Props) => {

    const {numColumns, hasMultipleColumns} = useResponsive();

    const {
        data: playlists,
        isLoading,
        isFetching,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage,
        isPaused
    } = useInfiniteQuery({
        enabled: true,
        queryKey: ['user', user.id, 'playlists'],
        queryFn: ({pageParam}) => getUserPlaylists(user.id, pageParam),
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
                                <ListPlaylist playlist={item} />
                            </View>
                        )}
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
                        onEndReachedThreshold={2}
                    />
                }
            </View>
        </View>
    )
});

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        marginTop: 10,
    },
    playlists: {
        flex: 1
    },
    empty: {
        marginHorizontal: 15
    },
});