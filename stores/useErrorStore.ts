import { create } from 'zustand'
import {combine} from "zustand/middleware";
export const useErrorStore = create(
    combine(
        {
            error: null as null | string
        },
        (set) => ({
            setError: (error: null | string) => set({error }),
            reset: () => set({ error:null }),
        })
    ),
);