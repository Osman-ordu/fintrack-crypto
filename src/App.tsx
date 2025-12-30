import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { Colors } from '@/theme';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import RootNavigator from './navigation';
import { store } from './store/store';

const lightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.light.background,
    primary: Colors.light.tint,
    text: Colors.light.text,
    card: '#ffffff',
    border: 'rgba(0,0,0,0.08)',
  },
};

const darkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.dark.background,
    primary: Colors.dark.tint,
    text: Colors.dark.text,
    card: '#111111',
    border: 'rgba(255,255,255,0.1)',
  },
};

function AppContent() {
  const { colorScheme } = useTheme();

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function AppRoot() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

