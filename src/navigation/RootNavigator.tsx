import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EasyBuySellScreen } from '@/feautures/easyBuySell';
import { OnboardingScreen } from '@/feautures/onboarding';
import { RootStackParamList } from '@/types';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen
        name="EasyBuySell"
        component={EasyBuySellScreen}
      />
    </Stack.Navigator>
  );
}
