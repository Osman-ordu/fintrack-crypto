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