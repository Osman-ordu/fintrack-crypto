import React from 'react';
import { ThemedText } from '@/components/ui/ThemedText';
import { styles } from '@/feautures/market/components/MarketList/styles';
import { IColumn } from '@/types/index';
import { formatTransactionDate } from '@/utils';

export const quickTransactionColumns: IColumn[] = [
    {
      dataField: 'amount + baseAsset', // birden fazla dataField kullanımı örn: 100 + USD
      caption: 'Miktar',
      addition: {
        align: 'left',
      },
    },

    {
      dataField: 'total + quoteAsset',
      caption: 'Harcanan Tutar',
      addition: {
        align: 'left',
        separator: ' + ',
        renderCell: (value: any, row: any) => {
          const total = typeof row.total === 'number' ? row.total : parseFloat(row.total) || 0;
          const quoteAsset = row.quoteAsset || '';
          return (
            <ThemedText style={styles.resultAmount}>
              {total.toLocaleString('tr-TR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{quoteAsset ? ` ${quoteAsset}` : ''}
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
