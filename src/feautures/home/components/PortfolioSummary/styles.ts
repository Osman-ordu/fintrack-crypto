import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    card: {
      borderRadius: 16,
      padding: 20,
    },
    label: {
      fontSize: 14,
      opacity: 0.7,
      marginBottom: 8,
    },
    totalValue: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
      marginBottom: 20,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    statItem: {
      flex: 1,
    },
    changeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginBottom: 4,
    },
    changeText: {
      fontSize: 18,
      fontWeight: '600',
    },
    profitLossText: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      opacity: 0.6,
    },
  });