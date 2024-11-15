import { create } from 'zustand'
import {combine} from "zustand/middleware";
import {auth} from "@/constants";

type ErrorType =  (typeof auth)[keyof typeof auth]

export const useAuthStore = create(
    combine(
        {
            error: null as null | ErrorType
        },
        (set) => ({
            setError: (error: null | ErrorType) => set({error}),
            reset: () => set({ error:null }),
        })
    ),
);