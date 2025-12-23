import React, { useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@/components/ui/button';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { Colors } from '@/constants/theme';
import { slides } from '@/db';
import { RootStackParamList } from '@/types';
import { styles } from './OnboardingScreen.styles';
const { width } = Dimensions.get('window');
type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView | null>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveIndex(index);
  };

  const handleGetStarted = () => {
    try {
      navigation.replace('Tabs');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <ThemedView style={styles.root}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollRef}
      >
        {slides.map((slide, index) => (
          <View key={slide.key} style={styles.slide}>
            <View style={styles.backgroundContainer}>
              <View style={styles.contentContainer}>
                <ThemedText type="title" style={styles.title}>
                  {slide.title}
                </ThemedText>
                <ThemedText style={styles.subtitle}>{slide.subtitle}</ThemedText>
              </View>

              <View style={styles.middleContainer}>
                <View style={styles.dotsContainer}>
                  {slides.map((_, dotIndex) => {
                    const isActive = dotIndex === activeIndex;
                    return (
                      <View
                        key={dotIndex}
                        style={[
                          styles.dot,
                          {
                            backgroundColor: isActive
                              ? Colors.light.tint
                              : 'rgba(255,255,255,0.4)',
                            width: isActive ? 20 : 8,
                          },
                        ]}
                      />
                    );
                  })}
                </View>
              </View>

              {index === slides.length - 1 && (
                <View style={styles.bottomContainer}>
                  <Button
                    title="Başla"
                    onPress={handleGetStarted}
                    variant="primary"
                    size="small"
                    style={styles.startButton}
                  />
                </View>
              )}
            </View>

            <View style={styles.logoContainer}>
              <View style={styles.logoTextContainer}>
                <ThemedText style={styles.logoTextFin}>fin</ThemedText>
                <ThemedText style={styles.logoTextTrack}>TRACK</ThemedText>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

