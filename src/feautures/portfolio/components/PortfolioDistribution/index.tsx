import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { portfolioDistribution } from '@/db';
import { styles } from './styles';

const CHART_SIZE = 120;
const CHART_RADIUS = 50;
const CHART_STROKE_WIDTH = 20;
const CENTER = CHART_SIZE / 2;
const INNER_RADIUS = CHART_RADIUS - CHART_STROKE_WIDTH / 2;
const OUTER_RADIUS = CHART_RADIUS + CHART_STROKE_WIDTH / 2;

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

export function PortfolioDistribution() {
  // Calculate angles for each segment
  let currentAngle = -90; // Start from top
  const chartSegments = portfolioDistribution.map((item) => {
    const startAngle = currentAngle;
    const angle = (item.percentage / 100) * 360;
    const endAngle = startAngle + angle;
    currentAngle = endAngle;
    return {
      ...item,
      startAngle,
      endAngle,
      path: createArcPath(startAngle, endAngle, INNER_RADIUS, OUTER_RADIUS, CENTER, CENTER),
    };
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <ThemedText style={styles.title}>Portföy Dağılımı</ThemedText>

        <View style={styles.chartContainer}>
          <View style={styles.chartWrapper}>
            <Svg width={CHART_SIZE} height={CHART_SIZE} style={styles.chart}>
              <G>
                {chartSegments.map((segment, index) => (
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
            {portfolioDistribution.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                <View style={styles.legendText}>
                  <ThemedText style={styles.legendCoin}>{item.coin}</ThemedText>
                  <ThemedText style={styles.legendPercentage}>{item.percentage}%</ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

