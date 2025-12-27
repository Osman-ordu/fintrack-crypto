import React from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { CustomGrid } from '@/components/ui/custom-grid';
import { quickTransactionColumns } from '@/db/columns';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useMarketData } from '@/feautures/market/hooks/useMarketData';
import { useCurrencySocket } from '@/hooks/use-currency-socket';
import { styles } from './styles';

interface QuickTransactionsProps {
  onQuickAdd: (currency: string, amount: number) => void;
}

export function QuickTransactions({ onQuickAdd }: QuickTransactionsProps) {
  const textColor = useThemeColor({}, 'text');
  const { currencies: socketCurrencies, isConnected } = useCurrencySocket();
  const { quickTransactionData } = useMarketData({
    socketCurrencies,
    isConnected,
  });

  return (
    <ThemedView card style={styles.card}>
      <ThemedText style={styles.title}>Hızlı İşlemler</ThemedText>
      <ThemedText style={styles.subtitle}>Sık kullanılan miktarlarla hızlıca ekleyin</ThemedText>

      <CustomGrid
        gridKey="quick-transactions"
        data={quickTransactionData}
        columns={quickTransactionColumns}
        renderRowActions={(row) => (
          <Pressable
            style={[styles.addButton, { backgroundColor: textColor + '20' }]}
            onPress={() => onQuickAdd(row.currency, row.amount as number)}
          >
            <Ionicons name="add" size={18} color={textColor} />
          </Pressable>
        )}
      />
    </ThemedView>
  );
}

