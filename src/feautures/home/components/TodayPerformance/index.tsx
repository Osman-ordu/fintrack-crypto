import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { todayPerformance } from '@/db';
import { styles } from './styles';

export function TodayPerformance() {
  const TopGainerIcon = todayPerformance.topGainer.icon;
  const TopLoserIcon = todayPerformance.topLoser.icon;

  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <ThemedText style={styles.title}>Bugünkü Performans</ThemedText>

        <View style={styles.performanceRow}>
          {/* En çok kazandıran */}
          <ThemedView card style={styles.performanceItem}>
            <View style={styles.performanceHeader}>
              <TopGainerIcon width={24} height={24} />
              <ThemedText style={styles.coinName}>{todayPerformance.topGainer.coin}</ThemedText>
            </View>
            <View style={styles.changeRow}>
              <Ionicons name="arrow-up" size={16} color="#22C55E" />
              <ThemedText style={[styles.changeValue, { color: '#22C55E' }]}>
                +{todayPerformance.topGainer.change.toFixed(2)}%
              </ThemedText>
            </View>
            <ThemedText style={styles.profitValue}>
              +{todayPerformance.topGainer.value.toLocaleString('tr-TR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              ₺
            </ThemedText>
            <ThemedText style={styles.label}>En Çok Kazandıran</ThemedText>
          </ThemedView>

          {/* En çok kaybettiren */}
          <ThemedView card style={styles.performanceItem}>
            <View style={styles.performanceHeader}>
              <TopLoserIcon width={24} height={24} />
              <ThemedText style={styles.coinName}>{todayPerformance.topLoser.coin}</ThemedText>
            </View>
            <View style={styles.changeRow}>
              <Ionicons name="arrow-down" size={16} color="#EF4444" />
              <ThemedText style={[styles.changeValue, { color: '#EF4444' }]}>
                {todayPerformance.topLoser.change.toFixed(2)}%
              </ThemedText>
            </View>
            <ThemedText style={[styles.lossValue, { color: '#EF4444' }]}>
              {todayPerformance.topLoser.value.toLocaleString('tr-TR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              ₺
            </ThemedText>
            <ThemedText style={styles.label}>En Çok Kaybettiren</ThemedText>
          </ThemedView>
        </View>

        {/* Son yapılan işlem */}
        <View style={styles.transactionContainer}>
          <ThemedText style={styles.transactionTitle}>Son Yapılan İşlem</ThemedText>
          <View style={styles.transactionRow}>
            <View style={styles.transactionInfo}>
              <ThemedText style={styles.transactionType}>
                {todayPerformance.lastTransaction.type}
              </ThemedText>
              <ThemedText style={styles.transactionDetails}>
                {todayPerformance.lastTransaction.amount} {todayPerformance.lastTransaction.coin}
              </ThemedText>
            </View>
            <View style={styles.transactionRight}>
              <ThemedText style={styles.transactionPrice}>
                {todayPerformance.lastTransaction.price.toLocaleString('tr-TR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                ₺
              </ThemedText>
              <ThemedText style={styles.transactionTime}>
                {todayPerformance.lastTransaction.time}
              </ThemedText>
            </View>
          </View>
        </View>
      </ThemedView>
    </ThemedView>
  );
}
