import { StyleSheet } from 'react-native';
import { SemanticColors } from '@/theme';

export const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.8,
  },
  currencyPairContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  currencySelector: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 52,
  },
  currencySelectorText: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.5,
    marginHorizontal: 4,
  },
  errorText: {
    fontSize: 12,
    color: SemanticColors.error,
    marginTop: 4,
    fontWeight: '500',
  },
});

