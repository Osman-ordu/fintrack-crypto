import React from 'react';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { CustomGrid } from '@/components/ui/custom-grid';
import { quickTransactionColumns } from '@/db/columns/quickTransactionColumns';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getQuickTransaction } from '@/store/quickTransactions';
import { useEffect } from 'react';
import { RootState } from '@/store/store';
import { styles } from './styles';

interface QuickTransactionsProps {
  onQuickAdd: (currency: string, amount: number) => void;
}

export function QuickTransactions({ onQuickAdd }: QuickTransactionsProps) {
  const dispatch = useAppDispatch();
  const quickTransactions = useAppSelector((state: RootState) => state.quickTransaction?.data?.data);

  useEffect(() => {
   (async () => {
    await dispatch(getQuickTransaction());
   })();
  }, []);

  return (
    <ThemedView card style={styles.card}>
      <ThemedText style={styles.title}>Hızlı İşlemler</ThemedText>
      <ThemedText style={styles.subtitle}>Sık kullanılan miktarlarla hızlıca ekleyin</ThemedText>

      <CustomGrid
        gridKey="quick-transactions"
        data={quickTransactions || []}
        columns={quickTransactionColumns}
        renderRowActions={undefined}
        /*

        renderRowActions={(row) => (
          <Pressable
            style={[styles.addButton, { backgroundColor: textColor + '20' }]}
            onPress={() => onQuickAdd(row.currency, row.amount as number)}
          >
            <Ionicons name="add" size={18} color={textColor} />
          </Pressable>
        )}
        */
      
      />
    </ThemedView>
  );
}


