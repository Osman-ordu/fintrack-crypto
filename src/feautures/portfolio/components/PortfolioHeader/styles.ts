import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  card: {
    borderRadius: 20,
    padding: 24,
  },
  label: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  totalValue: {
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 44,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  changeText: {
    fontSize: 20,
    fontWeight: '600',
  },
  profitLossText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
});

