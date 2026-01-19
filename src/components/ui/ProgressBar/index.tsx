import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors } from '@/theme';
import { IProgressBarProps } from '@/types';
import { styles } from './styles';

export function ProgressBar({ currentStep, totalSteps }: IProgressBarProps) {
  const activeColor = useThemeColor(
    { light: Colors.light.tint, dark: Colors.dark.tint },
    'tint'
  );
  const inactiveColor = useThemeColor(
    { light: 'rgba(0,0,0,0.1)', dark: 'rgba(255,255,255,0.1)' },
    'card'
  );

  const progress = (currentStep / totalSteps) * 100;
  const progressAnim = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [progress, progressAnim]);

  return (
    <View style={styles.container}>
      <View style={[styles.track, { backgroundColor: inactiveColor }]}>
        <Animated.View
          style={[
            styles.progress,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: activeColor,
            },
          ]}
        />
      </View>
    </View>
  );
}

