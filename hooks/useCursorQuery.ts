import {InfiniteData, useInfiniteQuery, UseInfiniteQueryResult} from "@tanstack/react-query";
import {CursorPaginator} from "@/types";

type Options<TData> = {
    key: string[],
    fetchFn: ({pageParam} : {pageParam: string | null}) => Promise<CursorPaginator<TData>>,
}

export function useCursorQuery<TData = unknown> ({key, fetchFn} : Options<TData>) : UseInfiniteQueryResult<InfiniteData<CursorPaginator<TData>>> {
     return useInfiniteQuery({
        queryKey: key,
        queryFn: fetchFn,
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.meta.next_cursor,
    });
}
