import React from 'react';
import { ScrollView } from 'react-native';
import { ThemedView } from '@/components/ui/themed-view';
import { AppLogo, useAppLogoHeight } from '@/components/layout';
import { PortfolioActions } from '@/feautures/portfolio/components/PortfolioActions';
import { PortfolioHeader } from '@/feautures/portfolio/components/PortfolioHeader';
import { PortfolioHoldings } from '@/feautures/portfolio/components/PortfolioHoldings';
import { PortfolioStats } from '@/feautures/portfolio/components/PortfolioStats';
import { TodayPerformance } from '@/feautures/portfolio/components/TodayPerformance';
import { PortfolioDistribution } from '@/feautures/portfolio/components/PortfolioDistribution';
import { styles } from './PortfolioScreen.styles';

export default function PortfolioScreen() {
  const logoHeight = 60;
  const totalHeaderHeight = useAppLogoHeight(logoHeight);

  return (
    <ThemedView style={styles.container}>
      <AppLogo logoHeight={logoHeight} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: totalHeaderHeight }]}
        keyboardShouldPersistTaps="handled"
      >
        <PortfolioHeader />
        <PortfolioDistribution />
        <PortfolioStats />
        <PortfolioHoldings />
        <TodayPerformance />
        <PortfolioActions />
      </ScrollView>
    </ThemedView>
  );
}

