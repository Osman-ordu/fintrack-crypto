import { useMemo } from 'react';
import { CURRENCIES, CURRENCIES_NAMES, DUMMY_QUICK_TRANSACTIONS } from '../constants';

interface UseMarketDataProps {
  socketCurrencies: Record<string, { buyPrice: number; timestamp: number }>;
  isConnected: boolean;
}

export function useMarketData({ socketCurrencies, isConnected }: UseMarketDataProps) {
  const currencyData = useMemo(() => {
    if (!isConnected) return [];
    
    return CURRENCIES.map((currency) => {
      const socketCurrency = socketCurrencies[currency];
      const tryRate = socketCurrency?.buyPrice;
      
      if (!tryRate) return null;
      
      const timestamp = socketCurrency?.timestamp || Date.now();
      const updateTime = new Date(timestamp);
      const timeString = updateTime.toLocaleTimeString('tr-TR', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });

      return {
        currency,
        currencyName: CURRENCIES_NAMES[currency as keyof typeof CURRENCIES_NAMES] || currency,
        tryRate,
        time: timeString,
      };
    }).filter(Boolean);
  }, [socketCurrencies, isConnected]);

  const quickTransactionData = useMemo(() => {
    return DUMMY_QUICK_TRANSACTIONS.map((transaction) => ({
      ...transaction,
      currencyName: CURRENCIES_NAMES[transaction.currency as keyof typeof CURRENCIES_NAMES] || transaction.currency,
      amountDisplay: `${transaction.amount} ${transaction.currency}`,
    }));
  }, []);

  return {
    currencyData,
    quickTransactionData,
  };
}

