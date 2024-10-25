import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {Button} from "react-native-paper";
import {useInfiniteQuery} from "@tanstack/react-query";
import {getUserVideos,} from "@/api/clipzone";
import {ApiError, Loader} from "../commons";
import {ListVideo as Video} from "../Videos";
import {UserVideosSort} from "@/types";
import {useState} from "react";


type Props = {
    userId: number,
}

export function VideosTab({userId} : Props) {

    const [sort, setSort] = useState<UserVideosSort>('latest');

    const {
        data: videos,
        isLoading,
        isFetching,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery({
        enabled: true,
        gcTime: 0,
        queryKey: ['user', userId, 'videos', sort],
        queryFn: ({pageParam}) => getUserVideos(userId, pageParam, sort),
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
            <View style={styles.videos}>
                {isLoading && <Loader/>}
                {isError && <ApiError refetch={refetch}/>}
                {
                    videos &&
                    <FlatList
                        data={videos.pages.flatMap(page => page.data)}
                        renderItem={({item}) => <Video video={item} />}
                        keyExtractor={item => item.uuid}
                        ListFooterComponent={
                            isFetching ? <ActivityIndicator color={'red'} style={{marginBottom: 10}}/> : null
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
        marginVertical: 10,
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
        paddingBottom: 10,
    }
});