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
    chartContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    chartWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    chart: {
      alignSelf: 'center',
    },
    legend: {
      flex: 1,
      marginLeft: 20,
      gap: 12,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    legendColor: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    legendText: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    legendCoin: {
      fontSize: 14,
      fontWeight: '500',
    },
    legendPercentage: {
      fontSize: 14,
      fontWeight: '600',
      opacity: 0.7,
    },
    button: {
      width: '100%',
    },
  });