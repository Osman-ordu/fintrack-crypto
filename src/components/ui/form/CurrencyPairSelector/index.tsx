import React from 'react';
import { View, Pressable } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../../themed-text';
import { styles } from './styles';

interface CurrencyPairSelectorProps {
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
}

export function CurrencyPairSelector({
  control,
  errors,
  onBaseAssetPress,
  quoteAsset = 'TRY',
  dynamicStyles,
}: CurrencyPairSelectorProps) {
  return (
    <View>
      <ThemedText style={styles.label}>Döviz Çifti</ThemedText>
      <View style={styles.currencyPairContainer}>
        <Controller
          control={control}
          name="baseAsset"
          render={({ field: { value } }) => (
            <Pressable
              style={[styles.currencySelector, dynamicStyles.currencySelector(!!errors.baseAsset)]}
              onPress={onBaseAssetPress}
            >
              <ThemedText
                style={[styles.currencySelectorText, dynamicStyles.currencySelectorText(!!value)]}
              >
                {value || 'Varlık Seçin'}
              </ThemedText>
              <Ionicons
                name="chevron-down"
                size={20}
                color={dynamicStyles.currencySelectorIcon()}
              />
            </Pressable>
          )}
        />

        <ThemedText style={styles.divider}>/</ThemedText>

        <View style={[styles.currencySelector, dynamicStyles.quoteAssetSelector()]}>
          <ThemedText style={[styles.currencySelectorText, dynamicStyles.quoteAssetText()]}>
            {quoteAsset}
          </ThemedText>
        </View>
      </View>
      {errors.baseAsset && (
        <ThemedText style={styles.errorText}>
          {errors.baseAsset.message as string}
        </ThemedText>
      )}
    </View>
  );
}

