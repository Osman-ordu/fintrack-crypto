import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0.5,
  },
  navContainer: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 8, // Indicator için yer - artırıldı
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
  },
  activeBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#22C55E',
  },
  icon: {
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    height: 1.5,
    borderRadius: 0.75,
  },
});
