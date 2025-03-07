import {ActivityIndicator, ScrollView, StyleSheet, View} from "react-native";
import {useInfiniteQuery} from "@tanstack/react-query";
import {getCommentsReplies} from "@/api/clipzone";
import {CommentType} from "@/types";
import {Comment} from "./Comment";
import {ApiError, Loader, NetworkError} from "@/components/commons";
import {BottomSheetFlatList} from "@gorhom/bottom-sheet";

type Props = {
    route: {
        params: {
            comment: CommentType
        }
    }
}

export function Replies ({route}: Props) {

    const { comment } = route.params;

    const {
        data: responses,
        isLoading,
        isFetching,
        isError,
        error,
        isPaused,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery({
        enabled : true,
        gcTime: 0,
        queryKey: ['comments', comment.id, 'replies'],
        queryFn: ({pageParam}) => getCommentsReplies(comment.video_uuid, comment.id, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.next_page,
    });

    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
            {isPaused && <NetworkError refetch={refetch}/>}
            {(isLoading) && <Loader/>}
            {isError && <ApiError refetch={refetch} error={error}/>}
            {
                responses &&
                <BottomSheetFlatList
                    ListHeaderComponent={
                        <View style={{backgroundColor: 'lightgrey'}}>
                            <Comment comment={comment} />
                        </View>
                    }
                    //scrollEnabled={false}
                    contentContainerStyle={styles.responses}
                    data={responses.pages.flatMap(page => page.data)}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <Comment comment={item} />}
                    onEndReached={(hasNextPage && !isFetching) ? () => fetchNextPage() : null}
                    ListFooterComponent={
                        isFetching ? <ActivityIndicator color={'red'} style={{marginBottom: 10}}/> : null
                    }
                    onEndReachedThreshold={1}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    responses: {
        //flex: 1,
        //backgroundColor: 'white'
        //marginLeft: 40,
        //paddingVertical: 10
    },
});