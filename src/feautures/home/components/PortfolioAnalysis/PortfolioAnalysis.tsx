import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { portfolioAnalysis } from '@/db';
import { styles } from './styles';

export function PortfolioAnalysis() {
  const handleAction = () => {
    console.log('Action clicked:', portfolioAnalysis.action);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: `${portfolioAnalysis.color}15` }]}>
            <Ionicons
              name={portfolioAnalysis.icon as keyof typeof Ionicons.glyphMap || 'warning-outline'}
              size={24}
              color={portfolioAnalysis.color}
            />
          </View>
          <View style={styles.headerText}>
            <ThemedText style={styles.title}>{portfolioAnalysis.title}</ThemedText>
            <ThemedText style={styles.subtitle}>Smart Insight</ThemedText>
          </View>
        </View>

        <ThemedText style={styles.message}>{portfolioAnalysis.message}</ThemedText>

        <Button
          title={portfolioAnalysis.action}
          onPress={handleAction}
          variant="primary"
          size="medium"
          style={styles.button}
        />
      </ThemedView>
    </ThemedView>
  );
}

