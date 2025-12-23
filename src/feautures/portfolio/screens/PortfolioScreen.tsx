import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ui/themed-view';
import { PortfolioActions } from '@/feautures/portfolio/components/PortfolioActions';
import { PortfolioHeader } from '@/feautures/portfolio/components/PortfolioHeader';
import { PortfolioHoldings } from '@/feautures/portfolio/components/PortfolioHoldings';
import { PortfolioStats } from '@/feautures/portfolio/components/PortfolioStats';
import { styles } from './PortfolioScreen.styles';

export default function PortfolioScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <PortfolioHeader />
        <PortfolioStats />
        <PortfolioHoldings />
        <PortfolioActions />
      </ScrollView>
    </ThemedView>
  );
}

