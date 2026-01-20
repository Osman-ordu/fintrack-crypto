import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView,View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ScreenLayout } from '@/components/layout';
import { EmailInput, PasswordInput } from '@/components/ui';
import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useThemeColor } from '@/hooks/use-theme-color';
import { auth } from '@/lib/firebase';
import { RootStackParamList } from '@/navigation/types';
import { getAuth } from '@/store/auth';
import { getFirebaseErrorMessage } from '@/utils/firebaseErrors';
import { showErrorToast } from '@/utils/toast';
import { styles } from './LoginScreen.styles';
import { LoginFormData,loginSchema } from './validation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const borderColor = useThemeColor({}, 'borderColor');
  const placeholderColor = useThemeColor({}, 'placeholderColor');

  const dynamicStyles = {
    input: (hasError: boolean) => ({
      borderColor: hasError ? undefined : borderColor,
    }),
    inputPlaceholder: () => placeholderColor,
  };

  const login = async (data: LoginFormData) => {
    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      if (!user.emailVerified) {
        showErrorToast('Lütfen email adresinizi doğrulayın.');
        await auth.signOut();
        navigation.navigate('VerifyEmail');
        return;
      }

      const idToken = await user.getIdToken();

      try {
        const result = await dispatch(getAuth(idToken) as any).unwrap();

        if (result.success && result.data) {
          navigation.navigate('Tabs');
        } else {
          showErrorToast(result.message || 'Giriş yapılamadı');
          await auth.signOut();
        }
      } catch (authError: any) {
        const errorMessage = authError || 'Backend bağlantı hatası';
        showErrorToast(errorMessage);
        await auth.signOut();
      }
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
            <ThemedText type="title" style={styles.title}>
              Giriş Yap
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Hesabınıza giriş yaparak devam edin
            </ThemedText>

            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <EmailInput
                  control={control}
                  errors={errors}
                  dynamicStyles={dynamicStyles}
                />
              </View>

              <View style={styles.inputWrapper}>
                <PasswordInput
                  control={control}
                  errors={errors}
                  dynamicStyles={dynamicStyles}
                  label="Şifre"
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Giriş Yap"
                onPress={handleSubmit(login)}
                variant="primary"
                size="large"
                loading={loading}
                style={styles.button}
              />
              <Button
                title="Üye Ol"
                onPress={() => navigation.navigate('Register')}
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
