import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { SemanticColors } from '@/theme';
import { styles } from './styles';

interface ConnectionStatusProps {
  isConnected: boolean;
}

export function ConnectionStatus({ isConnected }: ConnectionStatusProps) {
  if (isConnected) return null;

  return (
    <ThemedView style={styles.connectionStatus}>
      <Ionicons name="warning-outline" size={16} color={SemanticColors.warning} />
      <ThemedText style={styles.connectionStatusText}>
        Fiyat verileri yükleniyor...
      </ThemedText>
    </ThemedView>
  );
}

