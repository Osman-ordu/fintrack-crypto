import React, { useState } from 'react';
import { MarketTableRow } from '@/components/ui/MarketTableRow';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { formatTimeString } from '@/utils/general';
import { CURRENCIES, CURRENCIES_NAMES } from '../../constants';
import { useMarketTableStyles } from './hooks';
import { styles } from './styles';
import { IMarketTableProps } from './types';

export function MarketTable({ currencies, isConnected }: IMarketTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const dynamicStyles = useMarketTableStyles();

  const toggleRow = (currency: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currency)) {
        newSet.delete(currency);
      } else {
        newSet.add(currency);
      }
      return newSet;
    });
  };

  const currencyData = React.useMemo(() => {
    if (!isConnected) return [];

    return CURRENCIES?.map((currency) => {
      const data = currencies[currency];
      if (!data || !data.buyPrice || !data.sellPrice) return null;

      const timestamp = data.timestamp || Date.now();
      const time = formatTimeString(timestamp);

      return {
        currency,
        currencyName: CURRENCIES_NAMES[currency as keyof typeof CURRENCIES_NAMES] || currency,
        buyPrice: data.buyPrice,
        sellPrice: data.sellPrice,
        changePercent: data.changePercent || 0,
        time,
      };
    })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => a.currencyName.localeCompare(b.currencyName));
  }, [currencies, isConnected]);

  if (!isConnected) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={[styles.loadingText, { color: dynamicStyles.loadingTextColor }]}>
          Bağlanılıyor...
        </ThemedText>
      </ThemedView>
    );
  }

  if (currencyData.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={[styles.loadingText, { color: dynamicStyles.loadingTextColor }]}>
          Veri yükleniyor...
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {currencyData.map((item) => (
        <MarketTableRow
          key={item.currency}
          currency={item.currency}
          currencyName={item.currencyName}
          buyPrice={item.buyPrice}
          sellPrice={item.sellPrice}
          changePercent={item.changePercent}
          time={item.time}
          isExpanded={expandedRows.has(item.currency)}
          onToggle={() => toggleRow(item.currency)}
        />
      ))}
    </ThemedView>
  );
}
