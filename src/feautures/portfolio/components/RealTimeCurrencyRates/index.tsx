import React, { useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { CURRENCY_LABELS,CURRENCY_WIDTH, DISPLAY_CURRENCIES , SCROLL_SPEED } from '@/db';
import { useCurrencySocket } from '@/hooks/use-currency-socket';
import { CurrencyColors, SemanticColors } from '@/theme';
import { ICurrencyData } from '@/types';
import { styles } from './styles';

const getCurrencyIcon = (symbol: string): keyof typeof Ionicons.glyphMap => {
  const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    USD: 'logo-usd',
    EUR: 'logo-euro',
    AYAR22: 'ellipse',
    AYAR14: 'ellipse',
    GRAM: 'ellipse',
    CEYREK: 'ellipse',
    YARIM: 'ellipse',
    ATA: 'ellipse',
  };
  return iconMap[symbol] || 'ellipse';
};

const getCurrencyColor = (symbol: string): string => {
  const colorMap: Record<string, string> = {
    USD: CurrencyColors.USD,
    EUR: CurrencyColors.EUR,
    AYAR22: CurrencyColors.GOLD,
    AYAR14: CurrencyColors.GOLD,
    GRAM: CurrencyColors.GOLD,
    CEYREK: CurrencyColors.GOLD,
    YARIM: CurrencyColors.GOLD,
    ATA: CurrencyColors.GOLD,
  };
  return colorMap[symbol] || CurrencyColors.default;
};

export function RealTimeCurrencyRates() {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(0);
  const { currencies, isConnected } = useCurrencySocket();

  const displayCurrencies = React.useMemo(() => {

    const result = DISPLAY_CURRENCIES?.map((symbol) => {
      const currency = currencies[symbol];
      if (currency && currency.buyPrice > 0 && currency.sellPrice > 0) {
        return currency;
      }
      return null;
    }).filter((currency): currency is ICurrencyData => {
      if (!currency) return false;
      const hasData = currency.buyPrice > 0 && currency.sellPrice > 0;
      return hasData;
    });

    return result;
  }, [currencies]);

  useEffect(() => {
    if (displayCurrencies.length === 0) return;

    const interval = setInterval(() => {
      if (!scrollViewRef.current) return;

      scrollX.current += SCROLL_SPEED / 60; // 60 FPS
      const maxScroll = displayCurrencies.length * CURRENCY_WIDTH;

      if (scrollX.current >= maxScroll) {
        scrollX.current = 0;
      }

      scrollViewRef.current.scrollTo({
        x: scrollX.current,
        animated: false,
      });
    }, 16); // ~60 FPS

    return () => {
      clearInterval(interval);
    };
  }, [displayCurrencies.length]);

  if (displayCurrencies.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.loadingText}>
          {isConnected ? 'Döviz verileri yükleniyor...' : 'Bağlanılıyor...'}
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {displayCurrencies?.map((currency) => {
          const isPositive = currency.changePercent > 0;
          const changeColor = isPositive ? SemanticColors.success : SemanticColors.error;
          const changeIcon = isPositive ? 'arrow-up' : 'arrow-down';

          return (
            <ThemedView key={currency.symbol} card style={styles.currencyItem}>
              <View style={styles.currencyIconContainer}>
                <View style={[styles.currencyIconPlaceholder, { backgroundColor: getCurrencyColor(currency.symbol) + '20' }]}>
                  <Ionicons
                    name={getCurrencyIcon(currency.symbol)}
                    size={24}
                    color={getCurrencyColor(currency.symbol)}
                  />
                </View>
              </View>
              <ThemedText style={styles.currencyLabel}>
                {CURRENCY_LABELS[currency.symbol] || currency.symbol}
              </ThemedText>
              <ThemedText style={styles.currencySymbol}>
                {currency.symbol}
              </ThemedText>
              <View style={styles.priceContainer}>
                <ThemedText style={styles.priceLabel}>Alış</ThemedText>
                <ThemedText style={styles.priceValue}>
                  {currency.buyPrice.toLocaleString('tr-TR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </ThemedText>
              </View>
              <View style={styles.priceContainer}>
                <ThemedText style={styles.priceLabel}>Satış</ThemedText>
                <ThemedText style={styles.priceValue}>
                  {currency.sellPrice.toLocaleString('tr-TR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </ThemedText>
              </View>
              <View style={styles.changeContainer}>
                <Ionicons name={changeIcon} size={16} color={changeColor} />
                <ThemedText style={[styles.changeText, { color: changeColor }]}>
                  {Math.abs(currency.changePercent).toFixed(2)}%
                </ThemedText>
              </View>
            </ThemedView>
          );
        })}
        {displayCurrencies?.map((currency) => {
          const isPositive = currency.changePercent > 0;
          const changeColor = isPositive ? SemanticColors.success : SemanticColors.error;
          const changeIcon = isPositive ? 'arrow-up' : 'arrow-down';

          return (
            <ThemedView key={`${currency.symbol}-duplicate`} card style={styles.currencyItem}>
              <View style={styles.currencyIconContainer}>
                <View style={[styles.currencyIconPlaceholder, { backgroundColor: getCurrencyColor(currency.symbol) + '20' }]}>
                  <Ionicons
                    name={getCurrencyIcon(currency.symbol)}
                    size={24}
                    color={getCurrencyColor(currency.symbol)}
                  />
                </View>
              </View>
              <ThemedText style={styles.currencyLabel}>
                {CURRENCY_LABELS[currency.symbol] || currency.symbol}
              </ThemedText>
              <ThemedText style={styles.currencySymbol}>
                {currency.symbol}
              </ThemedText>
              <View style={styles.priceContainer}>
                <ThemedText style={styles.priceLabel}>Alış</ThemedText>
                <ThemedText style={styles.priceValue}>
                  {currency.buyPrice.toLocaleString('tr-TR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </ThemedText>
              </View>
              <View style={styles.priceContainer}>
                <ThemedText style={styles.priceLabel}>Satış</ThemedText>
                <ThemedText style={styles.priceValue}>
                  {currency.sellPrice.toLocaleString('tr-TR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </ThemedText>
              </View>
              <View style={styles.changeContainer}>
                <Ionicons name={changeIcon} size={16} color={changeColor} />
                <ThemedText style={[styles.changeText, { color: changeColor }]}>
                  {Math.abs(currency.changePercent).toFixed(2)}%
                </ThemedText>
              </View>
            </ThemedView>
          );
        })}
      </ScrollView>
    </ThemedView>
  );
}

