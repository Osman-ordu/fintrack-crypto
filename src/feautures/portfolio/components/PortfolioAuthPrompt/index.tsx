import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { styles } from './styles';

type PortfolioAuthPromptProps = {
  onLogin: () => void;
  onRegister: () => void;
};

export function PortfolioAuthPrompt({ onLogin, onRegister }: PortfolioAuthPromptProps) {
  return (
    <ThemedView card style={styles.card}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>Portföyünüzü Yönetin</ThemedText>
        <ThemedText style={styles.message}>
          Portföyünüzü görüntülemek ve yönetmek için giriş yapın veya üye olun
        </ThemedText>
        <View style={styles.actions}>
          <Button
            title="Giriş Yap"
            onPress={onLogin}
            variant="primary"
            size="medium"
            style={styles.actionButton}
          />
          <Button
            title="Üye Ol"
            onPress={onRegister}
            variant="outline"
            size="medium"
            style={styles.actionButton}
          />
        </View>
      </View>
    </ThemedView>
  );
}
