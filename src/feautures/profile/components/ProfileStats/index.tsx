import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getPortfolio } from '@/store/portfolio';
import { formatCurrencyAmount } from '@/utils/general';
import { styles } from './styles';

export function ProfileStats() {
  const dispatch = useAppDispatch();
  const portfolioState = useAppSelector((state) => state.portfolio);
  const statistics = portfolioState?.data?.data?.statistics;

  useEffect(() => {
    if (!statistics && !portfolioState?.isLoading) {
      dispatch(getPortfolio());
    }
  }, [dispatch, portfolioState?.isLoading, statistics]);

  const totalValue = Number.isFinite(statistics?.totalPortfolioValue ?? NaN)
    ? `${formatCurrencyAmount(statistics?.totalPortfolioValue ?? 0)}₺`
    : '--';
  const assetCount = Number.isFinite(statistics?.assetNumber ?? NaN)
    ? String(statistics?.assetNumber ?? 0)
    : '--';
  const profitLoss =
    statistics?.totalProfitLoss === null || statistics?.totalProfitLoss === undefined
      ? 'Yakında'
      : `${formatCurrencyAmount(statistics.totalProfitLoss)}₺`;

  return (
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <ThemedText style={styles.statValue}>{totalValue}</ThemedText>
        <ThemedText style={styles.statLabel}>Toplam Değer</ThemedText>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <ThemedText style={styles.statValue}>{assetCount}</ThemedText>
        <ThemedText style={styles.statLabel}>Varlık</ThemedText>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <ThemedText style={styles.statValue}>{profitLoss}</ThemedText>
        <ThemedText style={styles.statLabel}>Kâr/Zarar</ThemedText>
      </View>
    </View>
  );
}
