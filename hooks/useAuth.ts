import {useCallback} from "react";
import {useAccountStore} from "@/stores/useAccountStore";
import {login as apiLogin, logout as apiLogout} from '../api/clipzone'
import {setToken, deleteToken} from "@/functions/tokenService";
import {useQueryClient} from "@tanstack/react-query";

export enum AuthStatus {
    Unknown,
    Authenticated,
    Guest
}

export function useAuth () {

    const {account, setAccount} = useAccountStore();

    const queryClient = useQueryClient();

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

            const { token, ...account} = user;

            setAccount(account)
            await setToken(token)
            await queryClient.invalidateQueries({ queryKey: ['video'] });
        })
    }, []);

    const logout = useCallback( async () => {
        return apiLogout().then( async () =>{
            setAccount(null)
            await deleteToken()
            await queryClient.invalidateQueries({ queryKey: ['video'] });
        })
    }, []);

    return {
        account,
        status,
        login,
        logout
    }
}