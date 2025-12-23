import React from 'react';
import { Pressable,View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { RootStackParamList } from '@/types';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function PortfolioActions() {
  const navigation = useNavigation<NavigationProp>();

  const handleBuy = () => {
    navigation.navigate('EasyBuySell');
  };

  const handleSell = () => {
    navigation.navigate('EasyBuySell');
  };

  const handleDeposit = () => {
    // TODO: Navigate to deposit screen
    console.log('Deposit clicked');
  };

  const handleWithdraw = () => {
    // TODO: Navigate to withdraw screen
    console.log('Withdraw clicked');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <ThemedText style={styles.title}>Hızlı İşlemler</ThemedText>

        <View style={styles.actionsGrid}>
          <Button
            title="Al"
            onPress={handleBuy}
            variant="primary"
            size="medium"
            style={[styles.actionButton, styles.buyButton]}
            textStyle={styles.actionButtonText}
          />
          <Button
            title="Sat"
            onPress={handleSell}
            variant="outline"
            size="medium"
            style={[styles.actionButton, styles.sellButton]}
            textStyle={styles.actionButtonText}
          />
        </View>

        <View style={styles.secondaryActions}>
          <Pressable style={styles.secondaryActionItem} onPress={handleDeposit}>
            <Ionicons name="arrow-down-circle" size={24} color="#22C55E" />
            <ThemedText style={styles.secondaryActionText}>Para Yatır</ThemedText>
          </Pressable>
          <Pressable style={styles.secondaryActionItem} onPress={handleWithdraw}>
            <Ionicons name="arrow-up-circle" size={24} color="#EF4444" />
            <ThemedText style={styles.secondaryActionText}>Para Çek</ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

