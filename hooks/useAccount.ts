import {useAuth} from "./useAuth";

export function useAccount () {

    const {account} = useAuth();

    return {
        account,
        isAuthenticated: !!account,
        isGuest: !account,
    }
}