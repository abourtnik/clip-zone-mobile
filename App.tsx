import { PaperProvider } from 'react-native-paper';
import Navigation from './navigation/index'
import {useThemeStore} from "./stores/useThemeStore";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {

  const theme = useThemeStore(state => state.theme)

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