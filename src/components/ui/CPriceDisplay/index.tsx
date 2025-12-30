import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../themed-text';
import { styles } from './styles';

interface PriceDisplayProps {
  baseAsset: string;
  quoteAsset: string;
  price: number;
  amount: string;
  calculatedTotal: number;
}

export function PriceDisplay({
  baseAsset,
  quoteAsset,
  price,
  amount,
  calculatedTotal,
}: PriceDisplayProps) {
  if (!baseAsset || price <= 0) return null;

  return (
    <View style={styles.priceContainer}>
      <View style={styles.priceRow}>
        <ThemedText style={styles.priceLabel}>Fiyat:</ThemedText>
        <ThemedText style={styles.priceValue}>
          1 {baseAsset} = {price.toLocaleString('tr-TR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          {quoteAsset}
        </ThemedText>
      </View>
      {amount && calculatedTotal > 0 && (
        <View style={styles.priceRow}>
          <ThemedText style={styles.priceLabel}>Toplam:</ThemedText>
          <ThemedText style={styles.totalValue}>
            {calculatedTotal.toLocaleString('tr-TR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{' '}
            {quoteAsset}
          </ThemedText>
        </View>
      )}
    </View>
  );
}

