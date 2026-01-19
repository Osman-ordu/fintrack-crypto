import { TextStyle,ViewStyle } from "react-native";
import { Control, FieldErrors } from "react-hook-form";
import type { StyleProp, TextProps, ViewProps } from "react-native";
import { RegisterFormData } from "@/feautures/register/screens/validation";

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

export type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  animated?: boolean;
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

  export type CustomGridPropsBase = {
    gridKey: string;
    data: any[];
    columns: IColumn[];
    loading?: boolean;
    emptyMessage?: string;
    onRowPress?: (row: any, index: number) => void;
    renderRowActions?: (row: any, index: number) => React.ReactNode;
    style?: any;
    headerStyle?: any;
    rowStyle?: any;
    cellStyle?: any;
  };

  export type CustomGridPropsWithTab = CustomGridPropsBase & {
    tab: true;
    tabConfig: ITabConfig;
  };

  export type CustomGridPropsWithoutTab = CustomGridPropsBase & {
    tab?: false;
    tabConfig?: never;
  };
  export type CustomGridProps = CustomGridPropsWithTab | CustomGridPropsWithoutTab;

  export interface ICurrency {
    symbol: string;
    name: string;
  }

  export interface ICurrencyData {
    symbol: string;
    buyPrice: number;
    sellPrice: number;
    changePercent: number;
    timestamp: number;
  }

  export interface IAppLogoProps {
    logoHeight?: number;
  }

  export interface IRegisterStepProps {
    control: Control<RegisterFormData>;
    errors: FieldErrors<RegisterFormData>;
    dynamicStyles: {
      input: (hasError: boolean) => any;
      inputPlaceholder: () => string;
    };
  }

  export interface IEmailInputProps {
    control: Control<any>;
    errors: FieldErrors<any>;
    dynamicStyles: {
      input: (hasError: boolean) => any;
      inputPlaceholder: () => string;
    };
  }

  export interface IPasswordInputProps {
    control: Control<any>;
    errors: FieldErrors<any>;
    dynamicStyles: {
      input: (hasError: boolean) => any;
      inputPlaceholder: () => string;
    };
    label?: string;
    name?: string;
  }

  export interface IAmountInputProps {
    control: Control<any>;
    errors: FieldErrors<any>;
    dynamicStyles: {
      input: (hasError: boolean) => any;
      inputPlaceholder: () => string;
    };
    editable?: boolean;
    showKeyboard?: boolean;
    compact?: boolean;
  }

  export interface IPriceDisplayProps {
    baseAsset: string;
    quoteAsset: string;
    price: number;
    amount: string;
    calculatedTotal: number;
    compact?: boolean;
  }

  export interface ICurrencyPairSelectorProps {
    control: Control<any>;
    errors: FieldErrors<any>;
    onBaseAssetPress: () => void;
    quoteAsset?: string;
    dynamicStyles: {
      currencySelector: (hasError: boolean) => any;
      currencySelectorText: (hasValue: boolean) => any;
      currencySelectorIcon: () => string;
      quoteAssetSelector: () => any;
      quoteAssetText: () => any;
    };
    compact?: boolean;
  }

  export interface IAddCurrencyModalProps {
    visible: boolean;
    selectedCurrency: string | null;
    modalAmount: string;
    calculatedTry: number;
    onClose: () => void;
    onSubmit: () => void;
    onAmountChange: (amount: string) => void;
  }

  export interface ICurrencyPickerModalProps {
    visible: boolean;
    onClose: () => void;
    availableCurrencies: string[];
    selectedCurrency: string;
    onSelectCurrency: (currency: string) => void;
    currencies: Record<string, { buyPrice: number }>;
  }

  export interface INumericKeypadProps {
    onNumberPress: (number: string) => void;
    onDeletePress: () => void;
    onDecimalPress: () => void;
    disabled?: boolean;
  }

  export interface IConnectionStatusProps {
    isConnected: boolean;
  }

  export interface ITabConfig {
    type: string;
    tabs: {
      value: string;
      label: string;
    }[];
    defaultTab?: string;
  }

  export interface ITabItem {
    value: string;
    label: string;
    content: React.ReactNode;
  }

  export interface ITabsProps {
    tabs: ITabItem[];
    defaultTab?: string;
    onTabChange?: (value: string) => void;
  }

  export interface IColumn {
    dataField: string | string[];
    caption: string;
    addition?: {
      allowSorting?: boolean;
      width?: number | string;
      align?: 'left' | 'center' | 'right';
      renderCell?: (value: any, row: any, index: number) => React.ReactNode;
      separator?: string;
    };
  }

  export interface IEmptyStateProps {
    message?: string;
  }

  export interface IProgressBarProps {
    currentStep: number;
    totalSteps: number;
  }

  export interface ITextInputProps {
    control: Control<any>;
    errors: FieldErrors<any>;
    dynamicStyles: {
      input: (hasError: boolean) => any;
      inputPlaceholder: () => string;
    };
    name: string;
    label: string;
    placeholder?: string;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    textContentType?: string;
    maxLength?: number;
  }

  export interface ITextTitleProps {
    children: React.ReactNode;
    style?: StyleProp<TextStyle>;
  }

  export interface INavigationButtonsProps {
    currentStep: number;
    totalSteps: number;
    loading: boolean;
    onNext: () => void;
    onBack: () => void;
    onSubmit: () => void;
    onLogin: () => void;
  }