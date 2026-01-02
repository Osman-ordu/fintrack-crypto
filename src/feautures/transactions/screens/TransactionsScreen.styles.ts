import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 16,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  createTransactionContainer: {
    flex: 1,
    minHeight: 0, // Allows flex to shrink below content size
  },
});

