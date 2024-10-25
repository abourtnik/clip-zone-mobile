import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand'
import {persist, createJSONStorage, combine} from "zustand/middleware";
import {Account} from "@/types";
export const useAccountStore = create(
    persist(
        combine(
            {
                account: null as undefined | null | Account,
            },
            (set) => ({
                setAccount: (account: Account | null) => set({ account }),
            })
        ),
        {
            name: 'ACCOUNT',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);