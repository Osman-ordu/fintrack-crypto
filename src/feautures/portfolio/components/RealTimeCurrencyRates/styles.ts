import { StyleSheet } from 'react-native';

const CURRENCY_WIDTH = 140;

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    overflow: 'hidden',
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  currencyItem: {
    width: CURRENCY_WIDTH,
    minHeight: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 0,
  },
  currencyIconContainer: {
    marginBottom: 12,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencyIconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencyLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  currencySymbol: {
    fontSize: 10,
    fontWeight: '500',
    opacity: 0.5,
    marginBottom: 12,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 6,
    paddingHorizontal: 8,
  },
  priceLabel: {
    fontSize: 10,
    fontWeight: '500',
    opacity: 0.6,
  },
  priceValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 20,
    opacity: 0.6,
  },
});

