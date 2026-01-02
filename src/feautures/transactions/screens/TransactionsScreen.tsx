import React from 'react';
import { View } from 'react-native';
import { ScreenLayout } from '@/components/layout';
import { Tabs, type TabItem } from '@/components/ui';
import AllTransactions from '../components/AllTransactions';
import CreateTransaction from '../components/CreateTransaction';
import QuickTransactions from '../components/LastTransactions';
import { styles } from './TransactionsScreen.styles';

export default function TransactionsScreen() {
  const tabs: TabItem[] = [
    {
      value: 'create',
      label: 'İşlem Oluştur',
      content: (
        <View style={styles.createTransactionContainer}>
          <CreateTransaction />
        </View>
      ),
    },
    {
      value: 'all',
      label: 'Tüm İşlemler',
      content: <AllTransactions />,
    },
    {
      value: 'recent',
      label: 'Son İşlemler',
      content: <QuickTransactions />,
    },
  ];

  return (
    <ScreenLayout scrollContentStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Tabs tabs={tabs} defaultTab="create" />
      </View>
    </ScreenLayout>
  );
}

