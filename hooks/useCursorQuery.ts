import {InfiniteData, useInfiniteQuery, UseInfiniteQueryResult, UndefinedInitialDataInfiniteOptions, QueryKey} from "@tanstack/react-query";
import {CursorPaginator} from "@/types";

type Options<TData> = Omit<UndefinedInitialDataInfiniteOptions<CursorPaginator<TData>, Error, InfiniteData<CursorPaginator<TData>>, QueryKey, string|null>,  "getNextPageParam" | "initialPageParam">

type UseCursorQueryResult<TData> = UseInfiniteQueryResult<InfiniteData<CursorPaginator<TData>>>

export function useCursorQuery<TData = unknown> (options : Options<TData>) : UseCursorQueryResult<TData> {
     return useInfiniteQuery({
        ...options,
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.meta.next_cursor,
    });
}
