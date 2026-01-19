import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScreenLayout } from '@/components/layout';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemedView } from '@/components/ui/ThemedView';
import { useThemeColor } from '@/hooks/use-theme-color';
import { RootStackParamList } from '@/navigation/types';
import { NavigationButtons } from '../components/NavigationButtons';
import { Step1 } from '../components/Step1';
import { Step2 } from '../components/Step2';
import { Step3 } from '../components/Step3';
import { StepHeader } from '../components/StepHeader';
import { useRegister } from '../hooks/useRegister';
import { styles } from './RegisterScreen.styles';
import { RegisterFormData,registerSchema } from './validation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const TOTAL_STEPS = 3;

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [currentStep, setCurrentStep] = useState(1);
  const { register, loading } = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      surname: '',
      phone: '',
      email: '',
      password: '',
    },
  });

  const borderColor = useThemeColor({}, 'borderColor');
  const placeholderColor = useThemeColor({}, 'placeholderColor');

  const dynamicStyles = {
    input: (hasError: boolean) => ({
      borderColor: hasError ? undefined : borderColor,
    }),
    inputPlaceholder: () => placeholderColor,
  };

  const handleNext = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await trigger(['name', 'surname']);
    } else if (currentStep === 2) {
      isValid = await trigger(['phone']);
    } else if (currentStep === 3) {
      isValid = await trigger(['email', 'password']);
    }

    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            control={control}
            errors={errors}
            dynamicStyles={dynamicStyles}
          />
        );
      case 2:
        return (
          <Step2
            control={control}
            errors={errors}
            dynamicStyles={dynamicStyles}
          />
        );
      case 3:
        return (
          <Step3
            control={control}
            errors={errors}
            dynamicStyles={dynamicStyles}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScreenLayout scrollContentStyle={styles.scrollContent}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <ThemedView card style={styles.card}>
            <View style={styles.headerContainer}>
              <StepHeader step={currentStep} />
            </View>
            <View style={styles.formContainer}>{renderStepContent()}</View>
            <View style={styles.progressBarContainer}>
              <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
            </View>
            <NavigationButtons
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              loading={loading}
              onNext={handleNext}
              onBack={handleBack}
              onSubmit={handleSubmit(register)}
              onLogin={() => navigation.navigate('Login')}
            />
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}
