import { useEffect } from "react";
import { View } from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getQuickTransactionLatest } from "@/store/quickTransactions";
import { RootState } from "@/store/store";
import { styles } from "./styles";

export function LatestTransaction() {
    const dispatch = useAppDispatch();
    const quickTransactionLatest = useAppSelector((state: RootState) => state.quickTransactionLatest?.data?.data);
    const latestTransaction = Array.isArray(quickTransactionLatest)
        ? quickTransactionLatest[0]
        : quickTransactionLatest;

    useEffect(() => {
        dispatch(getQuickTransactionLatest());
      }, [dispatch]);

  return (
    <View style={styles.transactionContainer}>
    <ThemedText style={styles.transactionTitle}>Son Yapılan İşlem</ThemedText>
    <View style={styles.transactionRow}>
      <View style={styles.transactionInfo}>
        <ThemedText style={styles.transactionType}>
          {latestTransaction?.side === 'sell' ? 'Satış' : 'Alış'}
        </ThemedText>
        <ThemedText style={styles.transactionDetails}>
          {latestTransaction?.amount} {latestTransaction?.baseAsset}
        </ThemedText>
      </View>
      <View style={styles.transactionRight}>
        <ThemedText style={styles.transactionPrice}>
          {latestTransaction?.total ?? 0}{' '}
          ₺
        </ThemedText>
        <ThemedText style={styles.transactionTime}>
          {latestTransaction?.transactionDate
        ? new Date(latestTransaction.transactionDate).toLocaleTimeString('tr-TR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
        : ''}
        </ThemedText>
      </View>
    </View>
  </View>
  );
}