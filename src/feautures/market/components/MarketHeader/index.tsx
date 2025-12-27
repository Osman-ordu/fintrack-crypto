import React, { useState } from 'react';
import { Image, Pressable, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { styles } from './styles';

export function MarketHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const textColor = useThemeColor({}, 'text');
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={
            colorScheme === 'dark'
              ? require('@/assets/images/text-logo-dark-mini.png')
              : require('@/assets/images/text-logo-light-mini.png')
          }
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      <ThemedText type="title" style={styles.title}>Piyasalar</ThemedText>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9BA1A6" style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: textColor }]}
          placeholder="Coin ara..."
          placeholderTextColor="#9BA1A6"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#9BA1A6" />
          </Pressable>
        )}
      </View>
    </ThemedView>
  );
}

