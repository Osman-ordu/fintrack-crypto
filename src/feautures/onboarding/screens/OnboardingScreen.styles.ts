import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "@/theme";
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    root: {
      flex: 1,
      overflow: 'visible',
    },
    slide: {
      width,
      height,
      overflow: 'visible',
    },
    backgroundContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#1a1a1a',
      overflow: 'visible',
    },
    contentContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      overflow: 'visible',
    },
    title: {
      fontSize: 28,
      textAlign: 'center',
      color: '#ffffff',
    },
    subtitle: {
      marginTop: 16,
      textAlign: 'center',
      color: 'rgba(226,232,240,0.9)',
      fontSize: 16,
    },
    progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    progressOverlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: height * 0.68,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 5,
    },
    progressItem: {
      width: 48,
      height: 6,
      borderRadius: 4,
      backgroundColor: 'rgba(255,255,255,0.25)',
    },
    progressItemActive: {
      backgroundColor: Colors.light.tint,
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 60,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 20,
    },
    startAction: {
      paddingVertical: 4,
    },
    startActionText: {
      color: Colors.light.tint,
      fontSize: 16,
      fontWeight: '600',
    },
  });