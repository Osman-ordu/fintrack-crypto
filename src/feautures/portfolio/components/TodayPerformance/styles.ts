import { StyleSheet } from "react-native";
import { SemanticColors } from '@/theme';

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
      color: SemanticColors.success,
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
  });
