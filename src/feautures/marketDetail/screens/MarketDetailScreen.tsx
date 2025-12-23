import React from 'react';
import { Pressable,View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useNavigation,useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MarketStackParamList } from '@/types';
import { styles } from './MarketDetailScreen.styles';

type RouteProps = RouteProp<MarketStackParamList, 'MarketDetail'>;

export default function MarketDetailScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const iconColor = useThemeColor({}, 'text');
  const { id } = route.params;

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </Pressable>
        <ThemedText type="title" style={styles.headerTitle}>Market Detail</ThemedText>
        <View style={styles.backButton} />
      </View>
      <ThemedText style={styles.description}>Seçilen market: {id}</ThemedText>
    </ThemedView>
  );
}

