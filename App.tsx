import { PaperProvider } from 'react-native-paper';
import Navigation from './navigation/index'
import {useThemeStore} from "./stores/useThemeStore";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import NetInfo from '@react-native-community/netinfo'
import { onlineManager } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        networkMode: 'online',
        refetchOnReconnect: false,
      },
    },
});

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {useEffect} from "react";

export default function App() {

  const theme = useThemeStore(state => state.theme)

    useEffect(() => {
        onlineManager.setEventListener((setOnline) => {
            return NetInfo.addEventListener((state) => {
                setOnline(!!state.isConnected)
            })
        })
    }, []);

  return (
      <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
              <PaperProvider theme={theme}>
                  <Navigation/>
              </PaperProvider>
          </GestureHandlerRootView>
      </QueryClientProvider>

  );
}