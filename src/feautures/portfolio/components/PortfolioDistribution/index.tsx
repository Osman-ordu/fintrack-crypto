import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { TextTitle } from '@/components/ui';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { IPortfolioDistributionItem } from '@/store/portfolio/types';
import { CurrencyColors } from '@/theme';
import { styles } from './styles';

const CHART_SIZE = 120;
const CHART_RADIUS = 50;
const CHART_STROKE_WIDTH = 20;
const CENTER = CHART_SIZE / 2;
const INNER_RADIUS = CHART_RADIUS - CHART_STROKE_WIDTH / 2;
const OUTER_RADIUS = CHART_RADIUS + CHART_STROKE_WIDTH / 2;

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

// Calculate arc path for donut chart segment
const createArcPath = (
  startAngle: number,
  endAngle: number,
  innerRadius: number,
  outerRadius: number,
  centerX: number,
  centerY: number
): string => {
  const startAngleRad = (startAngle * Math.PI) / 180;
  const endAngleRad = (endAngle * Math.PI) / 180;

  const x1 = centerX + innerRadius * Math.cos(startAngleRad);
  const y1 = centerY + innerRadius * Math.sin(startAngleRad);
  const x2 = centerX + outerRadius * Math.cos(startAngleRad);
  const y2 = centerY + outerRadius * Math.sin(startAngleRad);
  const x3 = centerX + outerRadius * Math.cos(endAngleRad);
  const y3 = centerY + outerRadius * Math.sin(endAngleRad);
  const x4 = centerX + innerRadius * Math.cos(endAngleRad);
  const y4 = centerY + innerRadius * Math.sin(endAngleRad);

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1} Z`;
};

type IPortfolioDistributionProps = {
  distribution?: IPortfolioDistributionItem[];
};

export function PortfolioDistribution({ distribution = [] }: IPortfolioDistributionProps) {
  let currentAngle = -90;
  const chartSegments = distribution?.map((item) => {
    const startAngle = currentAngle;
    const angle = (item.percentage / 100) * 360;
    const endAngle = startAngle + angle;
    currentAngle = endAngle;
    return {
      ...item,
      startAngle,
      endAngle,
      path: createArcPath(startAngle, endAngle, INNER_RADIUS, OUTER_RADIUS, CENTER, CENTER),
      color: getAssetColor(item.baseAsset),
    };
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <TextTitle>Portföy Dağılımı</TextTitle>

        <View style={styles.chartContainer}>
          <View style={styles.chartWrapper}>
            <Svg width={CHART_SIZE} height={CHART_SIZE} style={styles.chart}>
              <G>
                {chartSegments?.map((segment, index) => (
                  <Path
                    key={index}
                    d={segment.path}
                    fill={segment.color}
                  />
                ))}
              </G>
            </Svg>
          </View>

          <View style={styles.legend}>
            {distribution?.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: getAssetColor(item.baseAsset) }]} />
                <View style={styles.legendText}>
                  <ThemedText style={styles.legendCoin}>{item.baseAsset}</ThemedText>
                  <ThemedText style={styles.legendPercentage}>{item.percentage.toFixed(2)}%</ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

