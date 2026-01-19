import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors } from '@/theme';
import { INavigationButtonsProps } from '@/types';
import { styles } from './styles';

const NEXT_LABELS: Record<number, string> = {
  1: 'Devam Et',
  2: 'Bilgileri Onayla',
  3: 'Hesabı Oluştur',
};

export function NavigationButtons({
  currentStep,
  totalSteps,
  loading,
  onNext,
  onBack,
  onSubmit,
  onLogin,
}: INavigationButtonsProps) {
  const tintColor = useThemeColor(
    { light: Colors.light.tint, dark: Colors.dark.tint },
    'tint'
  );
  const borderColor = useThemeColor(
    { light: Colors.light.borderColor, dark: Colors.dark.borderColor },
    'borderColor'
  );

  const isLastStep = currentStep === totalSteps;
  const canGoBack = currentStep > 1;
  const nextLabel = NEXT_LABELS[currentStep] ?? 'Devam Et';
  const labelStyle = {
    fontSize: 16,
    fontWeight: '600' as const,
    letterSpacing: 0.2,
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationRow}>
        <TouchableOpacity
          style={[
            styles.navButton,
            styles.backButton,
            !canGoBack && styles.backButtonDisabled,
          ]}
          onPress={onBack}
          activeOpacity={0.7}
          disabled={!canGoBack}
        >
          <Ionicons
            name="chevron-back"
            size={18}
            color={canGoBack ? tintColor : borderColor}
          />
          <ThemedText
            style={[
              labelStyle,
              { color: canGoBack ? tintColor : borderColor },
            ]}
          >
            Geri
          </ThemedText>
        </TouchableOpacity>

        {!isLastStep ? (
          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={onNext}
            activeOpacity={0.7}
          >
            <ThemedText style={[labelStyle, { color: tintColor }]}>
              {nextLabel}
            </ThemedText>
            <Ionicons name="chevron-forward" size={18} color={tintColor} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={onSubmit}
            activeOpacity={0.7}
            disabled={loading}
          >
            <ThemedText style={[labelStyle, { color: tintColor }]}>
              {nextLabel}
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>

    </View>
  );
}

