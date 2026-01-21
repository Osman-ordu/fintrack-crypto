import { StyleSheet } from "react-native";
import { OverlayColors } from "@/theme";

export const styles = StyleSheet.create({
    transactionContainer: {
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: OverlayColors.overlayLighter,
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