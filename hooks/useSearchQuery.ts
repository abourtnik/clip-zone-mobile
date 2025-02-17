import {useDebounce} from "@/hooks/useDebounce";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

type Options<TData> = {
    query: string,
    key: string,
    searchFn: (query: string) => Promise<TData>,
    debounce?: number
    minLength?: number
}

export function useSearchQuery<TData = unknown> ({query, key, searchFn, debounce = 300, minLength = 0} : Options<TData>) : UseQueryResult<TData> {

    const debouncedSearchQuery = useDebounce(query, debounce);

    return useQuery({
        queryKey: [key, debouncedSearchQuery],
        queryFn: () => searchFn(debouncedSearchQuery),
        enabled: debouncedSearchQuery.trim().length > 0 && debouncedSearchQuery.trim().length >= minLength
    })
}