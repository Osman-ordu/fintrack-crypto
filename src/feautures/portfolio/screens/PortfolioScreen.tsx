import React, { useEffect } from 'react';
import { View } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { ScreenLayout } from '@/components/layout';
import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import { PortfolioActions } from '@/feautures/portfolio/components/PortfolioActions';
import { PortfolioDistribution } from '@/feautures/portfolio/components/PortfolioDistribution';
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
        <ThemedView card style={styles.authCard}>
          <View style={styles.authPrompt}>
            <ThemedText style={styles.authTitle}>Portföyünüzü Yönetin</ThemedText>
            <ThemedText style={styles.authMessage}>
              Portföyünüzü görüntülemek ve yönetmek için giriş yapın veya üye olun
            </ThemedText>
            <View style={styles.authButtons}>
              <Button
                title="Giriş Yap"
                onPress={() => navigation.navigate('Login' as any )}
                variant="primary"
                size="medium"
                style={styles.authButton}
              />
              <Button
                title="Üye Ol"
                onPress={() => navigation.navigate('Register' as any )}
                variant="outline"
                size="medium"
                style={styles.authButton}
              />
            </View>
          </View>
        </ThemedView>
      </ScreenLayout>
    );
  }

  if (!hasPortfolio) {
    return (
      <ScreenLayout scrollContentStyle={styles.scrollContent}>
        <ThemedView card style={styles.authCard}>
          <View style={styles.authPrompt}>
            <ThemedText style={styles.authTitle}>Portföy Oluşturun</ThemedText>
            <ThemedText style={styles.authMessage}>
              İlk işleminizi yaparak portföyünüzü oluşturun
            </ThemedText>
            <Button
              title="Şimdi Portföy Oluştur"
              onPress={() => {
                navigation.navigate('Transactions');
              }}
              variant="primary"
              size="medium"
              style={styles.createButton}
            />
          </View>
        </ThemedView>
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
      <PortfolioActions />
    </ScreenLayout>
  );
}

