import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import React from 'react';
import TrackersProvider from './src/context/trackers';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <TrackersProvider>
          <Navigation colorScheme={colorScheme} />
        </TrackersProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
