import { StyleSheet, TextStyle,ViewStyle } from 'react-native';
import { SemanticColors } from '@/theme';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 10,
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 11,
    opacity: 0.6,
    marginBottom: 6,
    fontWeight: '400',
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 6,
    borderRadius: 6,
    backgroundColor: SemanticColors.warningBackground,
    marginBottom: 6,
  },
  connectionStatusText: {
    fontSize: 10,
    color: SemanticColors.warning,
    fontWeight: '500',
  },
  formContainer: {
    flex: 1,
    gap: 6,
    justifyContent: 'flex-start',
  },
  submitButton: {
    marginTop: 2,
  },
});

// Dinamik stiller için helper fonksiyonlar
export const getDynamicStyles = (textColor: string) => ({
  currencySelector: (hasError: boolean): ViewStyle => ({
    borderColor: hasError ? SemanticColors.error : textColor + '30',
    backgroundColor: textColor + '10',
  }),
  currencySelectorText: (hasValue: boolean): TextStyle => ({
    color: hasValue ? textColor : textColor + '60',
  }),
  currencySelectorIcon: (): string => textColor + '80',
  quoteAssetSelector: (): ViewStyle => ({
    borderColor: textColor + '30',
    backgroundColor: textColor + '10',
    opacity: 0.6,
  }),
  quoteAssetText: (): TextStyle => ({
    color: textColor,
  }),
  input: (hasError: boolean): ViewStyle & TextStyle => ({
    color: textColor,
    borderColor: hasError ? SemanticColors.error : textColor + '30',
    backgroundColor: textColor + '10',
  }),
  inputPlaceholder: (): string => textColor + '60',
});

