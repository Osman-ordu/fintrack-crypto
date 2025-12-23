import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { portfolioData } from '@/db';
import { styles } from './styles';

export function PortfolioSummary() {
  const isPositive = portfolioData.dailyChange > 0;
  const changeColor = isPositive ? '#22C55E' : '#EF4444';
  const profitLossColor = portfolioData.totalProfitLoss > 0 ? '#22C55E' : '#EF4444';
  const changeIcon = isPositive ? 'arrow-up' : 'arrow-down';

  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <ThemedText style={styles.label}>Toplam Portföy Değeri</ThemedText>
        <ThemedText style={styles.totalValue}>
          {portfolioData.totalValue.toLocaleString('tr-TR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          ₺
        </ThemedText>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <View style={styles.changeRow}>
              <Ionicons name={changeIcon} size={16} color={changeColor} />
              <ThemedText style={[styles.changeText, { color: changeColor }]}>
                {Math.abs(portfolioData.dailyChange).toFixed(2)}%
              </ThemedText>
            </View>
            <ThemedText style={styles.statLabel}>Günlük Değişim</ThemedText>
          </View>

          <View style={styles.statItem}>
            <ThemedText style={[styles.profitLossText, { color: profitLossColor }]}>
              {portfolioData.totalProfitLoss > 0 ? '+' : ''}
              {portfolioData.totalProfitLoss.toLocaleString('tr-TR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              ₺
            </ThemedText>
            <ThemedText style={styles.statLabel}>Toplam Kâr / Zarar</ThemedText>
          </View>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

