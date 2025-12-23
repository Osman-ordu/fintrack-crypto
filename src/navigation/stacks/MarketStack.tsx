// navigation/stacks/MarketStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MarketScreen } from '@/feautures/market';
import { MarketDetailScreen } from '@/feautures/marketDetail';
import { MarketStackParamList } from '@/types';

const Stack = createNativeStackNavigator<MarketStackParamList>();

export default function MarketStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Markets"
        component={MarketScreen}
      />
      <Stack.Screen
        name="MarketDetail"
        component={MarketDetailScreen}
        options={{ title: 'Market Detail' }}
      />
    </Stack.Navigator>
  );
}
