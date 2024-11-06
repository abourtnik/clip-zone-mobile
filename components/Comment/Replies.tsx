import {ActivityIndicator, StyleSheet, View} from "react-native";
import {useInfiniteQuery} from "@tanstack/react-query";
import {getReplies} from "@/api/clipzone";
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
        isPaused,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery({
        enabled : true,
        gcTime: 0,
        queryKey: ['comments', comment.id, 'responses'],
        queryFn: ({pageParam}) => getReplies(comment.video_uuid, comment.id, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.meta.current_page * lastPage.meta.per_page  > lastPage.meta.to) {
                return undefined
            }
            return lastPageParam + 1
        }
    });

    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
            <View style={{backgroundColor: 'lightgrey'}}>
                <Comment comment={comment} />
            </View>
            {isPaused && <NetworkError refetch={refetch}/>}
            { (isLoading || isFetching) && <Loader/>}
            {isError && <ApiError refetch={refetch}/>}
            {
                (!isFetching && responses) &&
                <BottomSheetFlatList
                    contentContainerStyle={styles.responses}
                    data={responses.pages.flatMap(page => page.data)}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <Comment comment={item} />}
                    onEndReached={(hasNextPage && !isFetching) ? () => fetchNextPage() : null}
                    ListFooterComponent={
                        isFetching ? <ActivityIndicator color={'red'} style={{marginBottom: 10}}/> : null
                    }
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    responses: {
        //flex: 1,
        //backgroundColor: 'white'
        marginLeft: 40,
        paddingVertical: 10
    },
});