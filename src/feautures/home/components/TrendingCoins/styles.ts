import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    card: {
      borderRadius: 16,
      padding: 20,
      maxHeight: 600, // Limit height to enable scrolling
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 16,
    },
    tableHeader: {
      flexDirection: 'row',
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
      marginBottom: 6,
    },
    headerCell: {
      justifyContent: 'center',
    },
    coinHeaderCell: {
      flex: 1.5,
    },
    priceHeaderCell: {
      flex: 1.5,
    },
    changeHeaderCell: {
      flex: 1.0,
    },
    headerText: {
      fontSize: 11,
      fontWeight: '500',
      opacity: 0.5,
      textTransform: 'uppercase',
    },
    scrollContainer: {
      maxHeight: 500,
    },
    tableBody: {
      gap: 1,
    },
    tableRow: {
      flexDirection: 'row',
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderRadius: 6,
      marginBottom: 2,
      alignItems: 'center',
    },
    tableCell: {
      justifyContent: 'center',
    },
    coinCell: {
      flex: 1.5,
    },
    priceCell: {
      flex: 1.5,
    },
    changeCell: {
      flex: 1.0,
    },
    coinPair: {
      fontSize: 13,
      fontWeight: '500',
      opacity: 0.9,
    },
    coinPrice: {
      fontSize: 12,
      fontWeight: '500',
      opacity: 0.9,
    },
    changeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 3,
    },
    changeIcon: {
      marginTop: 0,
    },
    changeText: {
      fontSize: 11,
      fontWeight: '500',
      lineHeight: 13,
      includeFontPadding: false,
      textAlignVertical: 'center',
    },
  });