import React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenLayout } from '@/components/layout';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors } from '@/theme';
import { styles } from './AboutScreen.styles';

export default function AboutScreen() {
  const navigation = useNavigation();
  const iconColor = useThemeColor({ light: Colors.light.icon, dark: Colors.dark.icon }, 'icon');

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
              Hakkında
            </ThemedText>
            <ThemedText style={styles.subtitle}>
            </ThemedText>
            <View style={styles.content}>
              <ThemedText style={styles.paragraph}>
              <ThemedText style={styles.brandText}>CepteCash</ThemedText> sahip olduğun varlıkların değerini senin adına takip
                eden akıllı bir portföy asistanıdır. Piyasayı sürekli kontrol
                etmek zorunda kalmadan, önemli değişikliklerden anında haberdar
                olmanı sağlar.
              </ThemedText>
              <ThemedText style={styles.paragraph}>
                Portföyüne eklediğin varlıkları izler, belirlediğin seviyelerde
                seni bilgilendirir ve kontrolü her zaman sende tutar. Ne zaman,
                neyin değiştiğini bilirsin.
              </ThemedText>
              <ThemedText style={styles.paragraph}>
                <ThemedText style={styles.brandText}>CepteCash</ThemedText> ile
                portföyünü izlemek zorunda kalmazsın. Değer değişir, sen anında
                haberdar olursun. Kontrol sende, finansal farkındalık cebinde.
              </ThemedText>
            </View>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}
