import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextTitle } from '@/components/ui';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { todayPerformance } from '@/db';
import { SemanticColors } from '@/theme';
import { LatestTransaction } from '../LatestTransaction';
import { styles } from './styles';

export function TodayPerformance() {
  const TopGainerIcon = todayPerformance.topGainer.icon;
  const TopLoserIcon = todayPerformance.topLoser.icon;

  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <TextTitle>Bugünkü Performans</TextTitle>

        <View style={styles.performanceRow}>
          {/* En çok kazandıran */}
          <ThemedView card style={styles.performanceItem}>
            <View style={styles.performanceHeader}>
              <TopGainerIcon width={24} height={24} />
              <ThemedText style={styles.coinName}>{todayPerformance.topGainer.coin}</ThemedText>
            </View>
            <View style={styles.changeRow}>
              <Ionicons name="arrow-up" size={16} color={SemanticColors.success} />
              <ThemedText style={[styles.changeValue, { color: SemanticColors.success }]}>
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
              <Ionicons name="arrow-down" size={16} color={SemanticColors.error} />
              <ThemedText style={[styles.changeValue, { color: SemanticColors.error }]}>
                {todayPerformance.topLoser.change.toFixed(2)}%
              </ThemedText>
            </View>
            <ThemedText style={[styles.lossValue, { color: SemanticColors.error }]}>
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
          <LatestTransaction />
      </ThemedView>
    </ThemedView>
  );
}
