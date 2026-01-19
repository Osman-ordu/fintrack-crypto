import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextTitle } from '@/components/ui';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { IPortfolioDistributionItem, IPortfolioStatistics } from '@/store/portfolio/types';
import { CurrencyColors, SemanticColors } from '@/theme';
import { styles } from './styles';

type PortfolioStatsProps = {
  statistics?: IPortfolioStatistics | null;
  distribution?: IPortfolioDistributionItem[];
};

const getAssetColor = (asset: string) => {
  const normalized = asset.toUpperCase();

  if (normalized in CurrencyColors) {
    return CurrencyColors[normalized as keyof typeof CurrencyColors];
  }

  if (normalized.includes('XAU') || normalized.includes('GOLD') || normalized.includes('AYAR')) {
    return CurrencyColors.GOLD;
  }

  if (normalized.includes('XAG') || normalized.includes('SILVER')) {
    return CurrencyColors.SILVER;
  }

  return CurrencyColors.default;
};

export function PortfolioStats({ statistics, distribution = [] }: PortfolioStatsProps) {
  const topAsset = statistics?.topAsset ?? '-';
  const assetNumber = statistics?.assetNumber ?? distribution.length;

  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <TextTitle>Portföy İstatistikleri</TextTitle>

        <View style={styles.statsGrid}>
          {distribution.map((item, index) => (
            <ThemedView key={index} card style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={[styles.colorDot, { backgroundColor: getAssetColor(item.baseAsset) }]} />
                <ThemedText style={styles.coinSymbol}>{item.baseAsset}</ThemedText>
              </View>
              <ThemedText style={styles.percentage}>{item.percentage.toFixed(2)}%</ThemedText>
              <ThemedText style={styles.value}>
                {item.total.toLocaleString('tr-TR', {
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
            <Ionicons name="trending-up" size={20} color={SemanticColors.success} />
            <View style={styles.summaryText}>
              <ThemedText style={styles.summaryLabel}>En Yüksek</ThemedText>
              <ThemedText style={styles.summaryValue}>{topAsset}</ThemedText>
            </View>
          </View>
          <View style={styles.summaryItem}>
            <Ionicons name="pie-chart" size={20} color={CurrencyColors.ETH} />
            <View style={styles.summaryText}>
              <ThemedText style={styles.summaryLabel}>Dağılım</ThemedText>
              <ThemedText style={styles.summaryValue}>{assetNumber} Varlık</ThemedText>
            </View>
          </View>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

