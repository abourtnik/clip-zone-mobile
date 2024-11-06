import {useDebounce} from "@/hooks/useDebounce";
import {useQuery} from "@tanstack/react-query";

export function useSearchQuery (query: string, key: string, searchFn: Function, debounce: number = 300) {

    const debouncedSearchQuery = useDebounce(query, debounce);

    return useQuery({
        queryKey: [key, debouncedSearchQuery],
        queryFn: () => searchFn(debouncedSearchQuery),
        enabled: debouncedSearchQuery.trim().length > 0
    })

}