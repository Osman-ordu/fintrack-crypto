import React from 'react';
import { TextInput } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { ThemedText } from '../themed-text';
import { cleanNumericInput } from '@/utils';
import { styles } from './styles';

interface AmountInputProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  dynamicStyles: {
    input: (hasError: boolean) => any;
    inputPlaceholder: () => string;
  };
}

export function AmountInput({ control, errors, dynamicStyles }: AmountInputProps) {
  return (
    <Controller
      control={control}
      name="amount"
      render={({ field: { onChange, value } }) => (
        <>
          <ThemedText style={styles.label}>Miktar</ThemedText>
          <TextInput
            style={[styles.input, dynamicStyles.input(!!errors.amount)]}
            value={value}
            onChangeText={(text) => {
              const cleaned = cleanNumericInput(text);
              onChange(cleaned);
            }}
            placeholder="0.00"
            placeholderTextColor={dynamicStyles.inputPlaceholder()}
            keyboardType="decimal-pad"
          />
          {errors.amount && (
            <ThemedText style={styles.errorText}>
              {errors.amount.message as string}
            </ThemedText>
          )}
        </>
      )}
    />
  );
}

