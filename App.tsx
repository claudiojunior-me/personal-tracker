import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { extendTheme, NativeBaseProvider } from 'native-base';
import React from 'react';
import { LocaleConfig } from 'react-native-calendars';
import HabitsProvider from './src/context/habits.context';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Quin', 'Sex', 'Sáb'],
  today: "Hoje"
};

LocaleConfig.defaultLocale = 'pt-br';

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
