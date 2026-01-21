import React, { useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { slides } from '@/db';
import type { RootStackParamList } from '@/navigation/types';
import { styles } from './OnboardingScreen.styles';
const { width } = Dimensions.get('window');
type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;
const ONBOARDING_SEEN_KEY = 'onboarding_seen';

export default function OnboardingScreen({ navigation }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasSeenContinue, setHasSeenContinue] = useState(false);
  const scrollRef = useRef<ScrollView | null>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveIndex(index);
    if (index === slides.length - 1) {
      setHasSeenContinue(true);
    }
  };

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_SEEN_KEY, 'true');
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
        {slides?.map((slide, index) => (
          <View key={slide.key} style={styles.slide}>
            <View style={styles.backgroundContainer}>
              <View style={styles.contentContainer}>
                <ThemedText type="title" style={styles.title}>
                  {slide.title}
                </ThemedText>
                <ThemedText style={styles.subtitle}>{slide.subtitle}</ThemedText>
              </View>

            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.progressOverlay}>
        <View style={styles.progressContainer}>
          {[0, 1, 2].map((stepIndex) => {
            const isActive = stepIndex === activeIndex;
            return (
              <Pressable
                key={stepIndex}
                onPress={() =>
                  scrollRef.current?.scrollTo({
                    x: width * stepIndex,
                    animated: true,
                  })
                }
                style={[
                  styles.progressItem,
                  isActive && styles.progressItemActive,
                ]}
              />
            );
          })}
        </View>
      </View>
      {(hasSeenContinue || activeIndex === slides.length - 1) && (
        <View style={styles.bottomContainer}>
          <Pressable onPress={handleGetStarted} style={styles.startAction}>
            <ThemedText style={styles.startActionText}>Devam Et</ThemedText>
          </Pressable>
        </View>
      )}
    </ThemedView>
  );
}

