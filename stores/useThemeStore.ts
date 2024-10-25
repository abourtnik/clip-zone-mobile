import { create } from 'zustand'
import {Light, Dark} from '../themes'
import {combine, createJSONStorage, persist} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useThemeStore = create(
    persist(
        combine(
            {
                theme: Light,
            },
            (set) => ({
                toggleTheme: () => set((state) => ({ theme: state.theme.dark ? Light : Dark })),
            })
        ),
        {
            name: 'THEME',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);