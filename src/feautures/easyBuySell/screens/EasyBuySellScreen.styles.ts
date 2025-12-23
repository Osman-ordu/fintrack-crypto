import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    backButton: {
      padding: 8,
    },
    headerTitle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
      marginHorizontal: 16,
    },
    headerSpacer: {
      width: 40,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: 16,
    },
    card: {
      borderRadius: 16,
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.02)',
    },
    tabsContainer: {
      flexDirection: 'row',
      borderRadius: 12,
      backgroundColor: 'rgba(0, 0, 0, 0.02)',
      padding: 4,
      marginBottom: 24,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
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
      fontSize: 16,
      fontWeight: '500',
      opacity: 0.7,
    },
    activeTabText: {
      color: '#FFFFFF',
      opacity: 1,
      fontWeight: '600',
    },
    inputsContainer: {
      gap: 16,
      marginBottom: 24,
    },
    inputWrapper: {
      gap: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: 12,
      backgroundColor: 'rgba(0, 0, 0, 0.02)',
    },
    input: {
      flex: 1,
      paddingVertical: 16,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#000',
    },
    currencySelector: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderLeftWidth: 1,
      borderLeftColor: 'rgba(0, 0, 0, 0.1)',
      gap: 8,
    },
    currencyText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
    },
    inputLabel: {
      fontSize: 12,
      opacity: 0.6,
      paddingHorizontal: 4,
    },
    arrowContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
    },
    submitButton: {
      width: '100%',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: '70%',
      paddingBottom: 20,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#000',
    },
    currencyOption: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    },
    selectedCurrencyOption: {
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
    },
    currencyOptionText: {
      fontSize: 16,
      color: '#000',
    },
    selectedCurrencyOptionText: {
      color: '#22C55E',
      fontWeight: '600',
    },
  });
