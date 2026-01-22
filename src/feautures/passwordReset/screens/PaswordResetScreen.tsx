import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendPasswordResetEmail } from 'firebase/auth';
import { z } from 'zod';
import { ScreenLayout } from '@/components/layout';
import { EmailInput } from '@/components/ui';
import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useThemeColor } from '@/hooks/use-theme-color';
import { auth } from '@/lib/firebase';
import { RootStackParamList } from '@/navigation/types';
import { Colors } from '@/theme';
import { getFirebaseErrorMessage } from '@/utils/firebaseErrors';
import { showErrorToast, showSuccessToast } from '@/utils/toast';
import { styles } from './PasswordResetScreen.styles';

const passwordResetSchema = z.object({
  email: z
    .string()
    .min(1, 'E-posta adresi gereklidir')
    .email('Geçerli bir e-posta adresi giriniz'),
});

type PasswordResetFormData = z.infer<typeof passwordResetSchema>;

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function PasswordResetScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
  } = useForm<PasswordResetFormData>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  });

  const borderColor = useThemeColor({}, 'borderColor');
  const placeholderColor = useThemeColor({}, 'placeholderColor');
  const iconColor = useThemeColor({ light: Colors.light.icon, dark: Colors.dark.icon }, 'icon');

  const dynamicStyles = {
    input: (hasError: boolean) => ({
      borderColor: hasError ? undefined : borderColor,
    }),
    inputPlaceholder: () => placeholderColor,
  };

  useEffect(() => {
    const currentEmail = auth.currentUser?.email;
    if (!currentEmail) {
      return;
    }

    if (!getValues('email')) {
      setValue('email', currentEmail, { shouldValidate: false });
    }
  }, [getValues, setValue]);

  const onSubmit = async (data: PasswordResetFormData) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, data.email);
      showSuccessToast('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error);
      showErrorToast(errorMessage);
    } finally {
      setLoading(false);
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
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              hitSlop={8}
            >
              <Ionicons name="arrow-back" size={22} color={iconColor} />
            </Pressable>
            <ThemedText type="title" style={styles.title}>
              Şifre Sıfırla
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              E-posta adresinizi girin, sıfırlama linki gönderelim
            </ThemedText>

            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <EmailInput
                  control={control}
                  errors={errors}
                  dynamicStyles={dynamicStyles}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Sıfırlama Linki Gönder"
                onPress={handleSubmit(onSubmit)}
                variant="primary"
                size="large"
                loading={loading}
                style={styles.button}
              />
              <Button
                title="Girişe Dön"
                onPress={() => navigation.navigate('Login')}
                variant="outline"
                size="large"
                style={styles.button}
              />
            </View>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}