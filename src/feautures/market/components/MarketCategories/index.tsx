import React, { useState } from 'react';
import { Pressable,ScrollView, View } from 'react-native';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { styles } from './styles';

const categories = [
  { id: 'all', name: 'Tümü' },
  { id: 'favorites', name: 'Favoriler' },
  { id: 'defi', name: 'DeFi' },
  { id: 'nft', name: 'NFT' },
  { id: 'metaverse', name: 'Metaverse' },
  { id: 'gaming', name: 'Gaming' },
];

export function MarketCategories() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <Pressable
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              style={[styles.categoryItem, isSelected && styles.categoryItemSelected]}
            >
              <ThemedText
                style={[
                  styles.categoryText,
                  isSelected && styles.categoryTextSelected,
                ]}
              >
                {category.name}
              </ThemedText>
            </Pressable>
          );
        })}
      </ScrollView>
    </ThemedView>
  );
}

