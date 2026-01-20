import { StyleSheet } from 'react-native';
import { SemanticColors } from '@/theme';

export const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: '500',
    minHeight: 52,
  },
  errorText: {
    fontSize: 12,
    color: SemanticColors.error,
    marginTop: 4,
    fontWeight: '500',
  },
});

