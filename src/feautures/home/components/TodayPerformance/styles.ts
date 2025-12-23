import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    card: {
      borderRadius: 16,
      padding: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 20,
    },
    performanceRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 20,
    },
    performanceItem: {
      flex: 1,
      padding: 16,
      borderRadius: 12,
    },
    performanceHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12,
    },
    coinName: {
      fontSize: 16,
      fontWeight: '600',
    },
    changeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginBottom: 4,
    },
    changeValue: {
      fontSize: 18,
      fontWeight: '600',
    },
    profitValue: {
      fontSize: 16,
      fontWeight: '600',
      color: '#22C55E',
      marginBottom: 4,
    },
    lossValue: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
    },
    label: {
      fontSize: 12,
      opacity: 0.6,
    },
    transactionContainer: {
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: 'rgba(0, 0, 0, 0.05)',
    },
    transactionTitle: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 12,
      opacity: 0.7,
    },
    transactionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    transactionInfo: {
      flex: 1,
    },
    transactionType: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
    },
    transactionDetails: {
      fontSize: 14,
      opacity: 0.7,
    },
    transactionRight: {
      alignItems: 'flex-end',
    },
    transactionPrice: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
    },
    transactionTime: {
      fontSize: 12,
      opacity: 0.6,
    },
  });
