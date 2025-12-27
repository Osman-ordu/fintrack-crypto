import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  lastCard: {
    marginBottom: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
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
  currencyHeaderCell: {
    flex: 1,
  },
  amountHeaderCell: {
    flex: 1,
  },
  resultHeaderCell: {
    flex: 1,
  },
  timeHeaderCell: {
    flex: 1,
  },
  actionHeaderCell: {
    flex: 0.5,
  },
  headerText: {
    fontSize: 11,
    fontWeight: '500',
    opacity: 0.5,
    textTransform: 'uppercase',
  },
  tableBody: {
    gap: 1,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 13,
    opacity: 0.6,
    fontWeight: '500',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 2,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    minHeight: 40,
  },
  tableRowNoBorder: {
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  tableCell: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 24,
  },
  currencyCell: {
    flex: 1,
    alignItems: 'flex-start',
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    minWidth: 0, // Text truncation için gerekli
  },
  currencyIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencyName: {
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.9,
    lineHeight: 18,
  },
  currencyPair: {
    fontSize: 13,
    fontWeight: '500',
    opacity: 0.9,
  },
  amountCell: {
    flex: 1,
  },
  resultCell: {
    flex: 1,
  },
  resultAmount: {
    fontSize: 11,
    fontWeight: '600',
    opacity: 0.9,
    lineHeight: 18,
  },
  timeCell: {
    flex: 1,
  },
  timeText: {
    fontSize: 10,
    fontWeight: '500',
    opacity: 0.6,
  },
  actionCell: {
    flex: 0.5,
    alignItems: 'center',
  },
  addButton: {
    borderRadius: 8,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 16,
    fontWeight: '400',
  },
});

