
import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {useErrorStore} from "@/stores/useErrorStore";
import {useAccount} from "@/hooks/useAccount";

type Props = UseMutationOptions & { authError: string }

export function useAuthMutation(options: Props) {

    const setError = useErrorStore((state) => state.setError);

    const {isGuest} = useAccount();

    return useMutation({
        ...options,
        mutationFn: (args) => {
            if (isGuest) {
                setError('AUTH', options.authError)
                return Promise.reject()
            }

            if (options.mutationFn) {
                return options.mutationFn(args)
            }

            return Promise.resolve()
        },
        onError: (error) => {
            setError('API', error.message)
        }
    });
}