import { useMemo } from 'react';
import { ICurrencyData } from '@/types';
import { formatTimeString } from '@/utils/general';
import { CURRENCIES, CURRENCIES_NAMES, DUMMY_QUICK_TRANSACTIONS } from '../constants';

interface UseMarketDataProps {
  socketCurrencies: Record<string, ICurrencyData>;
  isConnected: boolean;
}

export function useMarketData({ socketCurrencies, isConnected }: UseMarketDataProps) {
  const currencyData = useMemo(() => {
    if (!isConnected) return [];

    return CURRENCIES?.map((currency) => {
      const socketCurrency = socketCurrencies[currency];
      const buyPrice = socketCurrency?.buyPrice;
      const sellPrice = socketCurrency?.sellPrice;
      const changePercent = socketCurrency?.changePercent || 0;

      if (!buyPrice || !sellPrice) return null;

      const timestamp = socketCurrency?.timestamp || Date.now();
      const time = formatTimeString(timestamp);

      return {
        currency,
        currencyName: CURRENCIES_NAMES[currency as keyof typeof CURRENCIES_NAMES] || currency,
        tryRate: buyPrice,
        buyPrice,
        sellPrice,
        changePercent,
        time,
        timestamp,
      };
    }).filter(Boolean);
  }, [socketCurrencies, isConnected]);

  const quickTransactionData = useMemo(() => {
    return DUMMY_QUICK_TRANSACTIONS?.map((transaction) => ({
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

