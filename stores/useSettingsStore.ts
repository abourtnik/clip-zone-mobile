import AsyncStorage from '@react-native-async-storage/async-storage';
import {persist, createJSONStorage, combine} from "zustand/middleware";
import { create } from 'zustand'

export const useSettingsStore = create(
    persist(
        combine(
            {
                autoPlay: true as boolean,
            },
            (set) => ({
                setAutoplay: (value: boolean) => set({ autoPlay: value }),
            })
        )
        ,
        {
            name: 'SETTINGS',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)