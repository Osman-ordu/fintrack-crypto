import React, { useEffect, useRef } from 'react';
import { CTextTitle, CustomGrid } from '@/components/ui';
import { ThemedView } from '@/components/ui/themed-view';
import { quickTransactionColumns } from '@/db/columns/quickTransactionColumns';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getQuickTransaction } from '@/store/quickTransactions';
import { RootState } from '@/store/store';
import { styles } from './styles';

export default function AllTransactions() {
  const dispatch = useAppDispatch();
  const quickTransactions = useAppSelector((state: RootState) => state.quickTransaction?.data?.data);
  const hasFetchedRef = useRef(false);
  const isLoading = useAppSelector((state: RootState) => state.quickTransaction?.isLoading);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      dispatch(getQuickTransaction());
    }
  }, [dispatch]);

  return (
    <ThemedView card style={styles.card}>
      <CTextTitle>Tüm İşlemler</CTextTitle>
      <CustomGrid
        gridKey="all-transactions"
        data={quickTransactions || []}
        columns={quickTransactionColumns}
        renderRowActions={undefined}
        tab={true}
        tabConfig={{
          type: 'side',
          tabs: [
            { value: 'buy', label: 'Alınan' },
            { value: 'sell', label: 'Satılan' },
          ],
          defaultTab: 'buy',
        }}
        emptyMessage="Henüz işlem bulunmamaktadır"
        loading={isLoading}
      />
    </ThemedView>
  );
}

