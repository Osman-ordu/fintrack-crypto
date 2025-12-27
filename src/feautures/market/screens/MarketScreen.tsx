import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ThemedView } from '@/components/ui/themed-view';
import { MarketList } from '@/feautures/market/components/MarketList';
import { MarketStackParamList } from '@/types';
import { AppLogo, useAppLogoHeight } from '@/components/layout';
import { styles } from './MarketScreen.styles';

type Props = NativeStackScreenProps<MarketStackParamList, 'Markets'>;

export default function MarketScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const logoHeight = 60;
  const totalHeaderHeight = useAppLogoHeight(logoHeight);

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <AppLogo logoHeight={logoHeight} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: totalHeaderHeight }]}
        keyboardShouldPersistTaps="handled">
        <MarketList />
      </ScrollView>
    </ThemedView>
  );
}

