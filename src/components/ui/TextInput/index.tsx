import React from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors, SemanticColors } from '@/theme';
import { ITextInputProps } from '@/types';
import { ThemedText } from '../ThemedText';
import { styles } from './styles';

export function TextInput({
  control,
  errors,
  dynamicStyles,
  name,
  label,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  textContentType,
  maxLength,
}: ITextInputProps) {
  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
  const borderColor = useThemeColor(
    { light: Colors.light.card, dark: Colors.dark.card },
    'card'
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <>
          <ThemedText style={styles.label}>{label}</ThemedText>
          <RNTextInput
            style={[
              styles.input,
              dynamicStyles.input(!!errors[name]),
              { color: textColor, borderColor: errors[name] ? SemanticColors.error : borderColor },
            ]}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor={dynamicStyles.inputPlaceholder()}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={false}
            textContentType={textContentType as any}
            maxLength={maxLength}
          />
        </>
      )}
    />
  );
}

