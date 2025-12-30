import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: 6,
  },
  headerCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionHeaderCell: {
    flex: 0.5,
  },
  headerText: {
    fontSize: 10,
    fontWeight: '500',
    opacity: 0.5,
    textTransform: 'uppercase',
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
    paddingHorizontal: 4,
  },
  cellText: {
    fontSize: 11,
    fontWeight: '600',
    opacity: 0.9,
    lineHeight: 18,
  },
  actionCell: {
    flex: 0.5,
    alignItems: 'center',
  },
  alignLeft: {
    alignItems: 'flex-start',
  },
  alignRight: {
    alignItems: 'flex-end',
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
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 13,
    opacity: 0.6,
    fontWeight: '500',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftTab: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  rightTab: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  activeTab: {
    backgroundColor: '#22C55E',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.7,
  },
  activeTabText: {
    color: '#FFFFFF',
    opacity: 1,
    fontWeight: '600',
  },
});

