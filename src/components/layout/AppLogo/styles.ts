import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 0,
    zIndex: 10,
    overflow: 'hidden',
  },
  logoImage: {
    width: 200,
    height: 40,
  },
});