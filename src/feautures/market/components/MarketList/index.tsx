import React from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { CustomGrid } from '@/components/ui/custom-grid';
import { currencyColumns } from '@/db/columns';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useCurrencySocket } from '@/hooks/use-currency-socket';
import { useMarketData } from '../../hooks/useMarketData';
import { styles } from './styles';

export function MarketList() {
  const textColor = useThemeColor({}, 'text');

  const { currencies: socketCurrencies, isConnected } = useCurrencySocket();
  const { currencyData } = useMarketData({
    socketCurrencies,
    isConnected,
  });

  const handleAdd = (currency: string) => {
    // TODO: Navigate to transactions screen or show modal
    console.log('Add currency:', currency);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <ThemedText style={styles.title}>Anlık Döviz Kurları</ThemedText>
        
        <CustomGrid
          gridKey="currency-rates"
          data={currencyData}
          columns={currencyColumns}
          loading={!isConnected}
          emptyMessage="Bağlanılıyor..."
          renderRowActions={(row) => (
            <Pressable
              style={[styles.addButton, { backgroundColor: textColor + '20' }]}
              onPress={() => handleAdd(row.currency)}
            >
              <Ionicons name="add" size={18} color={textColor} />
            </Pressable>
          )}
        />
      </ThemedView>
    </ThemedView>
  );
}

