import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Onboarding: undefined;
  Tabs: undefined;
  EasyBuySell: undefined;
};

export type TabParamList = {
  Market: undefined;
  Transactions: undefined;
  Portfolio: undefined;
  Profile: undefined;
};

export type MarketStackParamList = {
  Markets: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
export type TabScreenProps<T extends keyof TabParamList> = BottomTabScreenProps<TabParamList, T>;
export type MarketScreenProps<T extends keyof MarketStackParamList> = NativeStackScreenProps<MarketStackParamList, T>;

