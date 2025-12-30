import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { EasyBuySellScreen } from '@/feautures/easyBuySell';
import { OnboardingScreen } from '@/feautures/onboarding';
import { MarketScreen } from '@/feautures/market';
import { TransactionsScreen } from '@/feautures/transactions';
import { PortfolioScreen } from '@/feautures/portfolio';
import { ProfileScreen } from '@/feautures/profile';
import { RootStackParamList, TabParamList, MarketStackParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const MarketStack = createNativeStackNavigator<MarketStackParamList>();

function MarketStackNavigator() {
  return (
    <MarketStack.Navigator screenOptions={{ headerShown: false }}>
      <MarketStack.Screen name="Markets" component={MarketScreen} />
    </MarketStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen 
        name="Market" 
        component={MarketStackNavigator}
        options={{ 
          title: 'Piyasalar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trending-up" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Transactions" 
        component={TransactionsScreen}
        options={{ 
          title: 'İşlemler',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Portfolio" 
        component={PortfolioScreen}
        options={{ 
          title: 'Portföy',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pie-chart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ 
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <RootStack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
      <RootStack.Screen name="Tabs" component={TabNavigator} />
      <RootStack.Screen
        name="EasyBuySell"
        component={EasyBuySellScreen}
      />
    </RootStack.Navigator>
  );
}

