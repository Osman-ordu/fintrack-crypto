import React from 'react';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { styles } from './styles';

export function HeroBanner() {
  return (
    <ThemedView style={styles.heroContainer}>
      <Image
        source={require('../../../../assets/images/herobanner.jpg')}
        style={styles.heroImage}
        contentFit="cover"
        transition={200}
      />
      <ThemedView style={styles.heroOverlay}>
        <ThemedText type="title" style={styles.heroTitle}>
          Crypto Tracker
        </ThemedText>
        <ThemedText style={styles.heroSubtitle}>
          Kripto paralarınızı takip edin
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

