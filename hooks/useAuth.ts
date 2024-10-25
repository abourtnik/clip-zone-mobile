import {useCallback} from "react";
import {useAccountStore} from "../stores/useAccountStore";
import {login as apiLogin} from '../api/clipzone'

export enum AuthStatus {
    Unknown,
    Authenticated,
    Guest
}

export function useAuth () {

    const {account, setAccount} = useAccountStore();

    let status;

    switch (account) {
        case null:
            status = AuthStatus.Guest;
            break;
        case undefined:
            status = AuthStatus.Unknown;
            break;
        default:
            status = AuthStatus.Authenticated;
            break;
    }

    const login = useCallback(async (username: string, password: string) => {
        return apiLogin(username, password).then(async user => {
            setAccount(user)
        })
    }, []);

    const logout = useCallback(async () => {
        setAccount(null);
    }, []);

    return {
        account,
        status,
        login,
        logout
    }
}