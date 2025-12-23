import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    heroContainer: {
      width: '100%',
      height: 250,
      overflow: 'hidden',
    },
    heroImage: {
      width: '100%',
      height: '100%',
    },
    heroOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 24,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    heroTitle: {
      color: '#FFFFFF',
      marginBottom: 8,
    },
    heroSubtitle: {
      color: '#FFFFFF',
      fontSize: 16,
      opacity: 0.9,
    },
  });