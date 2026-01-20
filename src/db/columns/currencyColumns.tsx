import React from 'react';
import { AnimatedPrice } from '@/feautures/market/components/AnimatedPrice';
import { styles } from '@/feautures/market/components/MarketList/styles';
import { IColumn } from '@/types/index';

export const currencyColumns: IColumn[] = [
  {
    dataField: 'currencyName',
    caption: 'Döviz',
    addition: {
      align: 'left',
    },
  },
  {
    dataField: 'tryRate',
    caption: 'Türk Lirası',
    addition: {
      align: 'center',
      renderCell: (value: number) => <AnimatedPrice value={value} style={styles.resultAmount} />,
    },
  },
  {
    dataField: 'time',
    caption: 'Zaman',
    addition: {
      align: 'center',
    },
  },
];

