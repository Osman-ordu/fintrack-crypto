import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 16,
    },
    tradeSection: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 16,
    },
    easyBuySellCard: {
      borderRadius: 16,
      padding: 20,
    },
    easyBuySellHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    easyBuySellTitle: {
      fontSize: 20,
      fontWeight: '600',
      flex: 1,
    },
    easyBuySellDescription: {
      fontSize: 14,
      lineHeight: 20,
      opacity: 0.7,
      marginBottom: 20,
    },
    easyBuySellButton: {
      width: '100%',
    },
  });