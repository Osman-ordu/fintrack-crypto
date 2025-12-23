import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { portfolioDistribution } from '@/db';
import { styles } from './styles';

export function PortfolioStats() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <ThemedText style={styles.title}>Portföy İstatistikleri</ThemedText>

        <View style={styles.statsGrid}>
          {portfolioDistribution.map((item, index) => (
            <ThemedView key={index} card style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                <ThemedText style={styles.coinSymbol}>{item.coin}</ThemedText>
              </View>
              <ThemedText style={styles.percentage}>{item.percentage}%</ThemedText>
              <ThemedText style={styles.value}>
                {item.value.toLocaleString('tr-TR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                ₺
              </ThemedText>
            </ThemedView>
          ))}
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Ionicons name="trending-up" size={20} color="#22C55E" />
            <View style={styles.summaryText}>
              <ThemedText style={styles.summaryLabel}>En Yüksek</ThemedText>
              <ThemedText style={styles.summaryValue}>BTC</ThemedText>
            </View>
          </View>
          <View style={styles.summaryItem}>
            <Ionicons name="pie-chart" size={20} color="#627EEA" />
            <View style={styles.summaryText}>
              <ThemedText style={styles.summaryLabel}>Dağılım</ThemedText>
              <ThemedText style={styles.summaryValue}>4 Coin</ThemedText>
            </View>
          </View>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

