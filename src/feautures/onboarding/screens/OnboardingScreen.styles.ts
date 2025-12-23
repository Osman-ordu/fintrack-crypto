import { Dimensions,StyleSheet  } from "react-native";
import { Colors } from "@/constants/theme";
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
      backgroundColor: '#1a1a1a', // Gri/siyah arka plan
      overflow: 'visible',
    },
    contentContainer: {
      position: 'absolute',
      top: height * 0.15,
      left: 0,
      right: 0,
      alignItems: 'center',
      paddingHorizontal: 24,
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
    logoContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingTop: 40,
      paddingBottom: 40,
      overflow: 'visible',
      zIndex: 10,
      pointerEvents: 'none',
    },
    logoTextContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    logoTextFin: {
      fontSize: 24,
      fontWeight: '400',
      letterSpacing: 0,
      color: Colors.light.tint,
      includeFontPadding: false,
    },
    logoTextTrack: {
      fontSize: 24,
      fontWeight: '700',
      letterSpacing: 0,
      color: Colors.light.tint,
      includeFontPadding: false,
      marginLeft: 2,
    },
    middleContainer: {
      position: 'absolute',
      top: height * 0.65,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dotsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    dot: {
      height: 8,
      borderRadius: 4,
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
    startButton: {
      minWidth: 120,
    },
  });