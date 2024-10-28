import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand'
import {persist, createJSONStorage, combine} from "zustand/middleware";
import {Account} from "@/types";

type AccountWithoutToken = Omit<Account, 'token'>

export const useAccountStore = create(
    persist(
        combine(
            {
                account: null as undefined | null | AccountWithoutToken,
            },
            (set) => ({
                setAccount: (account: AccountWithoutToken | null) => set({ account }),
            })
        ),
        {
            name: 'ACCOUNT',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);