import { StyleSheet } from 'react-native';
import { OverlayColors } from '@/theme';

export const styles = StyleSheet.create({
  priceContainer: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: OverlayColors.overlayVeryLight,
    gap: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.7,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
  },
});

