import type { TextProps, ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  card?: boolean;
};

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export type IconProps = {
    width?: number;
    height?: number;
    color?: string;
  };

  export type RootStackParamList = {
    Onboarding: undefined;
    Tabs: undefined;
    MarketDetail: { id: string };
    EasyBuySell: undefined;
  };

  export type TabParamList = {
    Home: undefined;
    Market: undefined;
    Portfolio: undefined;
    Profile: undefined;
  };

  export type MarketStackParamList = {
    Markets: undefined;
    MarketDetail: { id: string };
  };

  export type Currency = {
    symbol: string;
    name: string;
  };

  export type TabType = 'buy' | 'sell';

  export type Slide = {
    key: string;
    title: string;
    subtitle: string;
  };

  export type TrendingCoin = {
    id: string;
    symbol: string;
    name: string;
    change24h: number;
    price: number;
    isPopular?: boolean;
  };

  export type PopularCoin = {
    id: string;
    symbol: string;
    pair: string;
    change: number;
    iconComponent: React.ComponentType<IconProps>;
  };