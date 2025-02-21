
import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {useErrorStore} from "@/stores/useErrorStore";
import {useAuthStore} from "@/stores/useAuthStore";
import {useAccount} from "@/hooks/useAccount";
import {auth,AUTH_ERROR} from "@/constants";

type Props = UseMutationOptions & { authError?: AUTH_ERROR }

export function useAuthMutation(options: Props) {

    const setMainError = useErrorStore((state) => state.setError);
    const setAuthError = useAuthStore((state) => state.setError);

    const {isGuest} = useAccount();

    return useMutation({
        ...options,
        mutationFn: (args) => {
            if (isGuest) {
                setAuthError(auth[options.authError ?? AUTH_ERROR.UNAUTHORIZED])
                return Promise.reject()
            }

            if (options.mutationFn) {
                return options.mutationFn(args)
            }

            return Promise.resolve()
        },
        onError: (error) => {
            setMainError(error.message)
        }
    });
}