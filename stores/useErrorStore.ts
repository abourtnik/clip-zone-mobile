import { create } from 'zustand'
import {combine} from "zustand/middleware";

type ErrorType =  'AUTH' | 'API'

export const useErrorStore = create(
    combine(
        {
            type: null as null | 'AUTH' | 'API',
            error: null as null | string,
        },
        (set) => ({
            setError: (type: ErrorType, error: null | string) => set({type, error }),
            reset: () => set({ type: null, error:null }),
        })
    ),
);