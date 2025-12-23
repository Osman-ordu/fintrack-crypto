import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { HeroBanner } from '@/feautures/home/components/HeroBanner';
import { PopularCoins } from '@/feautures/home/components/PopularCoins';
import { PortfolioAnalysis } from '@/feautures/home/components/PortfolioAnalysis/PortfolioAnalysis';
import { PortfolioDistribution } from '@/feautures/home/components/PortfolioDistribution';
import { PortfolioSummary } from '@/feautures/home/components/PortfolioSummary';
import { TodayPerformance } from '@/feautures/home/components/TodayPerformance';
import { TrendingCoins } from '@/feautures/home/components/TrendingCoins';
import { RootStackParamList } from '@/types';
import { styles } from './HomeScreen.styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const [showEasyBuySell, setShowEasyBuySell] = useState(true);

  const handleEasyBuySellPress = () => {
    navigation.navigate('EasyBuySell');
  };

  const handleCloseEasyBuySell = () => {
    setShowEasyBuySell(false);
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      {/* 🔹 SCROLL EDİLEN İÇERİK */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <HeroBanner />
        <PopularCoins />
        <PortfolioSummary />
        <PortfolioDistribution />
        <TodayPerformance />
        <PortfolioAnalysis />
        <TrendingCoins />
      </ScrollView>

      {/* 🔹 INTERACTIVE / TRADE ALANI */}
      {showEasyBuySell && (
        <View style={styles.tradeSection}>
          <ThemedView card style={styles.easyBuySellCard}>
            <View style={styles.easyBuySellHeader}>
              <ThemedText style={styles.easyBuySellTitle}>Kolay Al Sat</ThemedText>
              <Pressable
                onPress={handleCloseEasyBuySell}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={24} color="#666" />
              </Pressable>
            </View>
            <ThemedText style={styles.easyBuySellDescription}>
              Kripto paralarınızı kolayca alın veya satın. Hızlı ve güvenli işlemler için tek tıkla
              başlayın. En popüler coinlerle anında işlem yapabilirsiniz.
            </ThemedText>
            <Button
              title="Kolay Al Sat'a Başla"
              onPress={handleEasyBuySellPress}
              variant="primary"
              size="large"
              style={styles.easyBuySellButton}
            />
          </ThemedView>
        </View>
      )}
    </ThemedView>
  );
}
