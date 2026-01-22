import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { AboutScreen } from '@/feautures/about';
import { EasyBuySellScreen } from '@/feautures/easyBuySell';
import { LoginScreen } from '@/feautures/login';
import { MarketScreen } from '@/feautures/market';
import { OnboardingScreen } from '@/feautures/onboarding';
import { PasswordResetScreen } from '@/feautures/passwordReset';
import { PortfolioScreen } from '@/feautures/portfolio';
import { ProfileScreen } from '@/feautures/profile';
import { RegisterScreen } from '@/feautures/register';
import { TransactionsScreen } from '@/feautures/transactions';
import { VerifyEmailScreen } from '@/feautures/verifyEmail';
import { MarketStackParamList,RootStackParamList, TabParamList } from './types';
const ONBOARDING_SEEN_KEY = 'onboarding_seen';

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
  const { user } = useAuth();

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
      {user && (
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
      )}
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { user, loading } = useAuth();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const loadOnboardingState = async () => {
      try {
        const value = await AsyncStorage.getItem(ONBOARDING_SEEN_KEY);
        setHasSeenOnboarding(value === 'true');
      } catch (error) {
        console.error('Onboarding flag error:', error);
        setHasSeenOnboarding(false);
      }
    };

    loadOnboardingState();
  }, []);

  if (loading || hasSeenOnboarding === null) {
    return null;
  }

  return (
    <RootStack.Navigator
      initialRouteName={user ? 'Tabs' : hasSeenOnboarding ? 'Tabs' : 'Onboarding'}
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="Register" component={RegisterScreen} />
      <RootStack.Screen name="PasswordReset" component={PasswordResetScreen} />
      <RootStack.Screen name="About" component={AboutScreen} />
      <RootStack.Screen name="Tabs" component={TabNavigator} />
      <RootStack.Screen
        name="EasyBuySell"
        component={EasyBuySellScreen}
      />
      <RootStack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
      </RootStack.Navigator>
  );
}

