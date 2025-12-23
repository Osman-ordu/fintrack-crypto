import { View } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedViewProps } from '@/types';

export function ThemedView({ style, lightColor, darkColor, card, ...otherProps }: ThemedViewProps) {
  const backgroundColor = card
    ? useThemeColor({ light: lightColor, dark: darkColor }, 'card')
    : useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

