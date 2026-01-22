import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'center',
    flexGrow: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 20,
    textAlign: 'center',
    opacity: 0.7,
  },
  content: {
    width: '100%',
    maxWidth: 520,
    gap: 16,
  },
  paragraph: {
    textAlign: 'left',
    opacity: 0.85,
    lineHeight: 24,
  },
  brandText: {
    fontWeight: '600',
  },
});
