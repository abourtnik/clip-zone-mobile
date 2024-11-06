import {ActivityIndicator, StyleSheet, View} from "react-native";
import {Button, IconButton, Text} from "react-native-paper";
import {ApiError, Loader, NetworkError} from "@/components/commons";
import {BottomSheetFlatList, useBottomSheet} from "@gorhom/bottom-sheet";
import {Comment} from "./Comment";
import {useInfiniteQuery} from "@tanstack/react-query";
import {getComments} from "@/api/clipzone";
import {useState} from "react";
import {CommentsSort, VideoType} from "@/types";

type Props = {
    route: {
        params: {
            video: VideoType
        }
    }
}

export function List({route} : Props) {

    const { close } = useBottomSheet();

    const { video } = route.params;

    const [sort, setSort] = useState<CommentsSort>(video.default_comments_sort);

    const selectSort = async (type: CommentsSort) => {
        if (type !== sort) {
            setSort(type)
        }
    }

    const {
        data: comments,
        isLoading,
        isFetching,
        isError,
        isPaused,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery({
        enabled : true,
        gcTime: 0,
        queryKey: ['comments', video.id, sort],
        queryFn: ({pageParam}) => getComments(video.uuid, pageParam, sort),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.meta.current_page * lastPage.meta.per_page  > lastPage.meta.to) {
                return undefined
            }
            return lastPageParam + 1
        }
    });

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text variant={'titleMedium'}>Comments</Text>
                        <IconButton
                            icon="close"
                            iconColor={'black'}
                            size={20}
                            onPress={() => close()}
                        />
                    </View>
                    <View style={styles.buttons}>
                        <Button
                            mode={sort === 'top' ? 'contained' : 'outlined'}
                            style={{borderRadius: 5}}
                            labelStyle={styles.button}
                            compact={true}
                            onPress={() => selectSort('top')}
                        >
                            Top Comments
                        </Button>
                        <Button
                            mode={sort === 'newest' ? 'contained' : 'outlined'}
                            style={{borderRadius: 5}}
                            labelStyle={styles.button}
                            compact={true}
                            onPress={() => selectSort('newest')}
                        >
                            Newest first
                        </Button>
                    </View>
                </View>
                <View style={styles.separator}></View>
            </View>
            <View style={styles.comments}>
                {isPaused && <NetworkError refetch={refetch}/>}
                { isLoading && <Loader/>}
                {isError && <ApiError refetch={refetch}/>}
                {
                    comments &&
                    <BottomSheetFlatList
                        data={comments.pages.flatMap(page => page.data)}
                        keyExtractor={item => item.id.toString()}
                        ListEmptyComponent={
                            <View style={styles.comments_empty}>
                                <Text style={styles.comments_empty_title}>No comments yet</Text>
                                <Text style={styles.comments_empty_text}>Be the first to publish a comment</Text>
                            </View>
                        }
                        renderItem={({item}) => <Comment comment={item} />}
                        onEndReached={(hasNextPage && !isFetching) ? () => fetchNextPage() : null}
                        ListFooterComponent={
                            isFetching ? <ActivityIndicator color={'red'} style={{marginBottom: 10}}/> : null
                        }
                    />
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: 'white'
    },
    header: {
        paddingHorizontal: 12,
    },
    buttons: {
        flexDirection: 'row',
        gap: 8
    },
    button: {
        marginVertical: 4,
        fontSize: 13,
        marginHorizontal: 10
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        marginTop: 10
    },
    comments: {
        flex: 1,
    },
    comments_empty: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10
    },
    comments_empty_title: {
        fontWeight: 'bold'
    },
    comments_empty_text: {
        color: '#888',
    }
});