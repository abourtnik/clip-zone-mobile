import {useQuery} from "@tanstack/react-query";

export function useFetchQuery (url) {
    return useQuery({
        queryKey: [url],
        queryFn: async () => {
            await wait(1);
            return c
        }
    })
}

function wait (duration) {
    return new Promise(resolve => setTimeout(resolve, duration * 1000));
}