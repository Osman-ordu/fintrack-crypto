import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { baseTrendingCoins } from '@/db';
import { TrendingCoin } from '@/types';
import { styles } from './styles';

const generateCoins = (baseCoins: TrendingCoin[], count: number): TrendingCoin[] => {
  const coins: TrendingCoin[] = [];
  for (let i = 0; i < count; i++) {
    const baseCoin = baseCoins[i % baseCoins.length];
    coins.push({
      id: `${i + 1}`,
      symbol: baseCoin.symbol,
      name: baseCoin.name,
      change24h: baseCoin.change24h + (Math.random() * 2 - 1),
      price: baseCoin.price * (0.95 + Math.random() * 0.1),
      isPopular: i < 3,
    });
  }
  return coins;
};

export function TrendingCoins() {
  const scrollViewRef = useRef<ScrollView>(null);
  const coins = generateCoins(baseTrendingCoins, 18);

  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <ThemedText style={styles.title}>Trending Coins</ThemedText>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <View style={[styles.headerCell, styles.coinHeaderCell]}>
            <ThemedText style={styles.headerText}>Coin</ThemedText>
          </View>
          <View style={[styles.headerCell, styles.priceHeaderCell]}>
            <ThemedText style={styles.headerText}>Fiyat</ThemedText>
          </View>
          <View style={[styles.headerCell, styles.changeHeaderCell]}>
            <ThemedText style={styles.headerText}>24h</ThemedText>
          </View>
        </View>

        {/* Table Rows with ScrollView */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <View style={styles.tableBody}>
            {coins.map((coin) => {
              const isPositive = coin.change24h > 0;
              const changeColor = isPositive ? '#22C55E' : '#EF4444';
              const changeIcon = isPositive ? 'arrow-up' : 'arrow-down';

              return (
                <ThemedView key={coin.id} card style={styles.tableRow}>
                  <View style={[styles.tableCell, styles.coinCell]}>
                    <ThemedText style={styles.coinPair}>{coin.symbol}/TRY</ThemedText>
                  </View>
                  <View style={[styles.tableCell, styles.priceCell]}>
                    <ThemedText style={styles.coinPrice}>
                      {coin.price.toLocaleString('tr-TR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      ₺
                    </ThemedText>
                  </View>
                  <View style={[styles.tableCell, styles.changeCell]}>
                    <View style={styles.changeRow}>
                      <Ionicons name={changeIcon} size={11} color={changeColor} style={styles.changeIcon} />
                      <ThemedText style={[styles.changeText, { color: changeColor }]}>
                        {isPositive ? '+' : ''}
                        {coin.change24h.toFixed(2)}%
                      </ThemedText>
                    </View>
                  </View>
                </ThemedView>
              );
            })}
          </View>
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
}
