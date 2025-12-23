import React from 'react';
import { FlatList, Pressable,View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { baseTrendingCoins } from '@/db';
import { MarketStackParamList, TrendingCoin } from '@/types';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<MarketStackParamList>;

export function MarketList() {
  const navigation = useNavigation<NavigationProp>();

  const handleCoinPress = (coin: TrendingCoin) => {
    navigation.navigate('MarketDetail', { id: coin.id });
  };

  const renderCoinItem = ({ item }: { item: TrendingCoin }) => {
    const isPositive = item.change24h > 0;
    const changeColor = isPositive ? '#22C55E' : '#EF4444';
    const changeIcon = isPositive ? 'arrow-up' : 'arrow-down';

    return (
      <Pressable
        style={styles.coinItem}
        onPress={() => handleCoinPress(item)}
      >
        <View style={styles.coinLeft}>
          <View style={styles.coinInfo}>
            <ThemedText style={styles.coinSymbol}>{item.symbol}</ThemedText>
            <ThemedText style={styles.coinName}>{item.name}</ThemedText>
          </View>
        </View>

        <View style={styles.coinRight}>
          <View style={styles.priceContainer}>
            <ThemedText style={styles.coinPrice}>
              {item.price.toLocaleString('tr-TR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              ₺
            </ThemedText>
            <View style={styles.changeRow}>
              <Ionicons name={changeIcon} size={14} color={changeColor} />
              <ThemedText style={[styles.changeText, { color: changeColor }]}>
                {isPositive ? '+' : ''}
                {item.change24h.toFixed(2)}%
              </ThemedText>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9BA1A6" />
        </View>
      </Pressable>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Tüm Coinler</ThemedText>
          <View style={styles.sortContainer}>
            <Ionicons name="swap-vertical" size={18} color="#9BA1A6" />
            <ThemedText style={styles.sortText}>Sırala</ThemedText>
          </View>
        </View>

        <FlatList
          data={baseTrendingCoins}
          renderItem={renderCoinItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </ThemedView>
    </ThemedView>
  );
}

