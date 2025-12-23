import { StyleSheet } from "react-native";
const COIN_WIDTH = 120;
const SCROLL_SPEED = 50; // pixels per second

export const styles = StyleSheet.create({
    container: {
      paddingVertical: 16,
      overflow: 'hidden',
    },
    scrollView: {
      flexGrow: 0,
    },
    scrollContent: {
      paddingHorizontal: 16,
    },
    coinItem: {
      width: COIN_WIDTH,
      height: COIN_WIDTH,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
      borderRadius: COIN_WIDTH / 2,
    },
    coinIconContainer: {
      marginBottom: 8,
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    coinPair: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 6,
    },
    changeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    changeText: {
      fontSize: 12,
      fontWeight: '600',
    },
  });