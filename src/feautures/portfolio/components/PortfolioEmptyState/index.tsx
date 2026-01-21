import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { styles } from './styles';

type PortfolioEmptyStateProps = {
  onCreate: () => void;
};

export function PortfolioEmptyState({ onCreate }: PortfolioEmptyStateProps) {
  return (
    <ThemedView card style={styles.card}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>Portföy Oluşturun</ThemedText>
        <ThemedText style={styles.message}>
          İlk işleminizi yaparak portföyünüzü oluşturun
        </ThemedText>
        <Button
          title="Şimdi Portföy Oluştur"
          onPress={onCreate}
          variant="primary"
          size="medium"
          style={styles.createButton}
        />
      </View>
    </ThemedView>
  );
}
