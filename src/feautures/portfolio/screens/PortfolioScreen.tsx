import React, { useEffect } from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { ScreenLayout } from '@/components/layout';
import { useAuth } from '@/contexts/AuthContext';
import { PortfolioAuthPrompt } from '@/feautures/portfolio/components/PortfolioAuthPrompt';
import { PortfolioDistribution } from '@/feautures/portfolio/components/PortfolioDistribution';
import { PortfolioEmptyState } from '@/feautures/portfolio/components/PortfolioEmptyState';
import { PortfolioHeader } from '@/feautures/portfolio/components/PortfolioHeader';
import { PortfolioHoldings } from '@/feautures/portfolio/components/PortfolioHoldings';
import { PortfolioStats } from '@/feautures/portfolio/components/PortfolioStats';
import { TodayPerformance } from '@/feautures/portfolio/components/TodayPerformance';
import { TabParamList } from '@/navigation/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getPortfolio } from '@/store/portfolio';
import { RootState } from '@/store/store';
import { styles } from './PortfolioScreen.styles';

type NavigationProp = BottomTabNavigationProp<TabParamList>;

export default function PortfolioScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const portfolioStatistics = useAppSelector((state: RootState) => state.portfolio?.data?.data?.statistics);
  const hasPortfolio = (portfolioStatistics?.distribution?.length ?? 0) > 0;

  useEffect(() => {
    if (user) {
      dispatch(getPortfolio());
    }

    const unsubscribe = navigation.addListener('focus', () => {
      if (user) {
        dispatch(getPortfolio());
      }
    });

    return unsubscribe;
  }, [dispatch, navigation, user]);

  if (!user) {
    return (
      <ScreenLayout scrollContentStyle={styles.scrollContent}>
        <PortfolioAuthPrompt
          onLogin={() => navigation.navigate('Login' as any)}
          onRegister={() => navigation.navigate('Register' as any)}
        />
      </ScreenLayout>
    );
  }

  if (!hasPortfolio) {
    return (
      <ScreenLayout scrollContentStyle={styles.scrollContent}>
        <PortfolioEmptyState
          onCreate={() => {
            navigation.navigate('Transactions');
          }}
        />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout scrollContentStyle={styles.scrollContent}>
      <PortfolioHeader statistics={portfolioStatistics} />
      <PortfolioDistribution distribution={portfolioStatistics?.distribution} />
      <PortfolioStats statistics={portfolioStatistics} distribution={portfolioStatistics?.distribution} />
      <PortfolioHoldings distribution={portfolioStatistics?.distribution} />
      <TodayPerformance />
    </ScreenLayout>
  );
}

