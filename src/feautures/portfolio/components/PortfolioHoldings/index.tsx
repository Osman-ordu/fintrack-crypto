import React from 'react';
import { Pressable,View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { portfolioHoldings } from '@/db';
import { styles } from './styles';

export function PortfolioHoldings() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Varlıklarım</ThemedText>
          <Pressable>
            <ThemedText style={styles.filterText}>Filtrele</ThemedText>
          </Pressable>
        </View>

        <View style={styles.list}>
          {portfolioHoldings.map((holding) => {
            const isPositive = holding.change24h > 0;
            const changeColor = isPositive ? '#22C55E' : '#EF4444';
            const changeIcon = isPositive ? 'arrow-up' : 'arrow-down';
            const IconComponent = holding.iconComponent;

            return (
              <Pressable key={holding.id}>
                <ThemedView card style={styles.holdingItem}>
                <View style={styles.holdingLeft}>
                  <View style={styles.iconContainer}>
                    <IconComponent width={40} height={40} />
                  </View>
                  <View style={styles.holdingInfo}>
                    <ThemedText style={styles.coinName}>{holding.name}</ThemedText>
                    <ThemedText style={styles.coinSymbol}>{holding.symbol}</ThemedText>
                  </View>
                </View>

                <View style={styles.holdingRight}>
                  <View style={styles.valueContainer}>
                    <ThemedText style={styles.value}>
                      {holding.value.toLocaleString('tr-TR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      ₺
                    </ThemedText>
                    <View style={styles.changeRow}>
                      <Ionicons name={changeIcon} size={14} color={changeColor} />
                      <ThemedText style={[styles.changeText, { color: changeColor }]}>
                        {Math.abs(holding.change24h).toFixed(2)}%
                      </ThemedText>
                    </View>
                  </View>
                  <View style={styles.amountContainer}>
                    <ThemedText style={styles.amount}>{holding.amount}</ThemedText>
                    <ThemedText style={styles.price}>
                      {holding.pricePerUnit.toLocaleString('tr-TR', {
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

