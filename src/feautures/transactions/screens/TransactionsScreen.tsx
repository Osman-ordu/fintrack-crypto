import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { ThemedView } from '@/components/ui/themed-view';
import { AppLogo, useAppLogoHeight } from '@/components/layout';
import { QuickTransactions } from '../components/LastTransactions';
import { AddCurrencyModal } from '../components/AddCurrencyModal';
import { useCurrencySocket } from '@/hooks/use-currency-socket';
import { CreateTransaction } from '../components/CreateTransaction';
import { styles } from './TransactionsScreen.styles';

export default function TransactionsScreen() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [modalAmount, setModalAmount] = useState('1');
  
  const logoHeight = 60;
  const totalHeaderHeight = useAppLogoHeight(logoHeight);
  
  const { currencies: socketCurrencies } = useCurrencySocket();

  const handleQuickAdd = (currency: string, amount: number) => {
    setSelectedCurrency(currency);
    setModalAmount(amount.toString());
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedCurrency(null);
    setModalAmount('1');
  };

  const handleModalSubmit = () => {
    if (selectedCurrency && modalAmount) {
      const amount = parseFloat(modalAmount);
      const socketCurrency = socketCurrencies[selectedCurrency];
      const tryRate = socketCurrency?.buyPrice || 0;
      const tryAmount = amount * tryRate;

      console.log('Envantere ekle:', selectedCurrency, 'Miktar:', amount, 'TRY:', tryAmount);
      handleModalClose();
    }
  };

  const selectedSocketCurrency = selectedCurrency ? socketCurrencies[selectedCurrency] : null;
  const tryRate = selectedSocketCurrency?.buyPrice || 0;
  const calculatedTry = parseFloat(modalAmount || '1') * tryRate;

  return (
    <ThemedView style={styles.container}>
      <AppLogo logoHeight={logoHeight} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: totalHeaderHeight }]}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedView style={styles.content}>
          <QuickTransactions onQuickAdd={handleQuickAdd} />
        </ThemedView>
        <ThemedView style={styles.content}>
          <CreateTransaction onQuickAdd={handleQuickAdd}/>
        </ThemedView>
      </ScrollView>

      <AddCurrencyModal
        visible={showModal}
        selectedCurrency={selectedCurrency}
        modalAmount={modalAmount}
        calculatedTry={calculatedTry}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        onAmountChange={setModalAmount}
      />
    </ThemedView>
  );
}

