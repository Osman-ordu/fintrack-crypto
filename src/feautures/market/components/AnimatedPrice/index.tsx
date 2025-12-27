import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { ThemedText } from '@/components/ui/themed-text';

interface AnimatedPriceProps {
  value: number;
  style?: any;
}

export function AnimatedPrice({ value, style }: AnimatedPriceProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (prevValueRef.current !== value && prevValueRef.current !== 0) {
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.08,
          useNativeDriver: true,
          tension: 300,
          friction: 5,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 300,
          friction: 5,
        }),
      ]).start();
    }
    prevValueRef.current = value;
  }, [value, scaleAnim]);

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <ThemedText style={style}>
        {value.toLocaleString('tr-TR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </ThemedText>
    </Animated.View>
  );
}

