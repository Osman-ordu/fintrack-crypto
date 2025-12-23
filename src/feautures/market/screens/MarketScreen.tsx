import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ThemedView } from '@/components/ui/themed-view';
import { MarketCategories } from '@/feautures/market/components/MarketCategories';
import { MarketHeader } from '@/feautures/market/components/MarketHeader';
import { MarketList } from '@/feautures/market/components/MarketList';
import { MarketStackParamList } from '@/types';
import { styles } from './MarketScreen.styles';

type Props = NativeStackScreenProps<MarketStackParamList, 'Markets'>;

export default function MarketScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <MarketHeader />
        <MarketCategories />
        <MarketList />
      </ScrollView>
    </ThemedView>
  );
}

