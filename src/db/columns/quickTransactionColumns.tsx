import React from 'react';
import { Column } from '@/components/ui/custom-grid';
import { ThemedText } from '@/components/ui/themed-text';
import { styles } from '@/feautures/market/components/MarketList/styles';
import { formatTransactionDate } from '@/utils';

export const quickTransactionColumns: Column[] = [
    {
      dataField: 'amount + quoteAsset', // birden fazla dataField kullanımı örn: 100 + USD
      caption: 'Miktar',
      addition: {
        align: 'left',
      },
    },

    {
      dataField: 'total + baseAsset',
      caption: 'Harcanan Tutar',
      addition: {
        align: 'left',
        separator: ' + ',
        renderCell: (value: any, row: any) => {
          const total = typeof row.total === 'number' ? row.total : parseFloat(row.total) || 0;
          const baseAsset = row.baseAsset || '';
          return (
            <ThemedText style={styles.resultAmount}>
              {total.toLocaleString('tr-TR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{baseAsset ? ` ${baseAsset}` : ''}
            </ThemedText>
          );
        },
      },
    },

    {
        dataField: 'transactionDate',
        caption: 'İşlem Tarihi',
        addition: {
          align: 'center',
          renderCell: (value: any) => {
            if (!value) return '';
            return (
              <ThemedText style={styles.cellText}>
                {formatTransactionDate(value)}
              </ThemedText>
            );
          },
        },
      },
  ];
  