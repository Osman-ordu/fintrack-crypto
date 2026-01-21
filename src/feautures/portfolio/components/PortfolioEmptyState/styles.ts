import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 32,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 24,
  },
  createButton: {
    width: '100%',
    maxWidth: 250,
  },
});
