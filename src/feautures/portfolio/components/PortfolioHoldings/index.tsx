import React from 'react';
import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextTitle } from '@/components/ui';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { IPortfolioDistributionItem } from '@/store/portfolio/types';
import { SemanticColors } from '@/theme';
import { styles } from './styles';

type PortfolioHoldingsProps = {
  distribution?: IPortfolioDistributionItem[];
};

export function PortfolioHoldings({ distribution = [] }: PortfolioHoldingsProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <View style={styles.header}>
          <TextTitle style={{ marginBottom: 0 }}>Varlıklarım</TextTitle>
          <Pressable>
            <ThemedText style={styles.filterText}>Filtrele</ThemedText>
          </Pressable>
        </View>

        <View style={styles.list}>
          {distribution?.map((holding, index) => {
            const changeValue = 0;
            const isPositive = changeValue > 0;
            const changeColor = isPositive ? SemanticColors.success : SemanticColors.error;
            const changeIcon = isPositive ? 'arrow-up' : 'arrow-down';
            const averageUnitPrice =
              holding.transactionCount > 0 ? holding.total / holding.transactionCount : 0;

            return (
              <Pressable key={`${holding.baseAsset}-${index}`}>
                <ThemedView card style={styles.holdingItem}>
                <View style={styles.holdingLeft}>
                  <View style={styles.iconContainer}>
                    <Ionicons name="wallet-outline" size={28} color={SemanticColors.success} />
                  </View>
                  <View style={styles.holdingInfo}>
                    <ThemedText style={styles.coinName}>{holding.baseAsset}</ThemedText>
                    <ThemedText style={styles.coinSymbol}>{holding.baseAsset}</ThemedText>
                  </View>
                </View>

                <View style={styles.holdingRight}>
                  <View style={styles.valueContainer}>
                    <ThemedText style={styles.value}>
                      {holding.total.toLocaleString('tr-TR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      ₺
                    </ThemedText>
                    <View style={styles.changeRow}>
                      <Ionicons name={changeIcon} size={14} color={changeColor} />
                      <ThemedText style={[styles.changeText, { color: changeColor }]}>
                        {Math.abs(changeValue).toFixed(2)}%
                      </ThemedText>
                    </View>
                  </View>
                  <View style={styles.amountContainer}>
                    <ThemedText style={styles.amount}>{holding.transactionCount} işlem</ThemedText>
                    <ThemedText style={styles.price}>
                      {averageUnitPrice.toLocaleString('tr-TR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      ₺
                    </ThemedText>
                  </View>
                </View>
                </ThemedView>
              </Pressable>
            );
          })}
        </View>
      </ThemedView>
    </ThemedView>
  );
}

