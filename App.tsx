import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { extendTheme, NativeBaseProvider } from 'native-base';
import React from 'react';
import HabitsProvider from './src/context/habits.context';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const theme = extendTheme({
    colors: {
      base: {
        primary: '#4D6B30',
        secondary: '#FFBD59',
        tertiary: '#9ED747'
      }
    }
  })

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NativeBaseProvider theme={theme}>
          <HabitsProvider>
            <Navigation colorScheme={colorScheme} />
          </HabitsProvider>
        </NativeBaseProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
