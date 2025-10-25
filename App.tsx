import { PaperProvider } from 'react-native-paper';
import Navigation from './navigation/index'
import {useThemeStore} from "./stores/useThemeStore";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import NetInfo from '@react-native-community/netinfo'
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { onlineManager } from '@tanstack/react-query'
import { ConfirmContextProvider } from './contexts/ConfirmContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {useEffect} from "react";
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        networkMode: 'online',
        refetchOnReconnect: false,
        retry: false
      },
    },
});

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
              <BottomSheetModalProvider>
                  <PaperProvider theme={theme}>
                      <ConfirmContextProvider>
                          <ActionSheetProvider>
                              <Navigation/>
                          </ActionSheetProvider>
                      </ConfirmContextProvider>
                  </PaperProvider>
              </BottomSheetModalProvider>
          </GestureHandlerRootView>
      </QueryClientProvider>
  );
}