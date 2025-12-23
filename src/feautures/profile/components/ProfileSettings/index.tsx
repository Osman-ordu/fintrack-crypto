import React, { useState } from 'react';
import { Alert,Pressable, Switch, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { useTheme } from '@/contexts/ThemeContext';
import { styles } from './styles';

type SettingItem = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
};

export function ProfileSettings() {
  const { themeMode, colorScheme, setThemeMode } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const handleResetPassword = () => {
    Alert.alert('Şifre Sıfırlama', 'Şifre sıfırlama e-postası gönderilecek.');
  };

  const handleLanguage = () => {
    Alert.alert('Dil Seçimi', 'Dil seçimi özelliği yakında eklenecek.');
  };

  const handleCurrency = () => {
    Alert.alert('Para Birimi', 'Para birimi seçimi yakında eklenecek.');
  };

  const handleSecurity = () => {
    Alert.alert('Güvenlik', 'Güvenlik ayarları yakında eklenecek.');
  };

  const handlePrivacy = () => {
    Alert.alert('Gizlilik', 'Gizlilik ayarları yakında eklenecek.');
  };

  const handleAbout = () => {
    Alert.alert('Hakkında', 'FinTrack Crypto v1.0.0');
  };

  const handleHelp = () => {
    Alert.alert('Yardım', 'Yardım ve destek yakında eklenecek.');
  };

  const isDarkMode = colorScheme === 'dark';
  const isDarkModeEnabled = themeMode === 'dark';

  const handleDarkModeToggle = async () => {
    if (themeMode === 'system') {
      // If system, toggle to dark
      await setThemeMode('dark');
    } else if (themeMode === 'dark') {
      // If dark, toggle to light
      await setThemeMode('light');
    } else {
      // If light, toggle to dark
      await setThemeMode('dark');
    }
  };

  const settings: SettingItem[] = [
    {
      id: 'darkMode',
      title: 'Karanlık Mod',
      icon: isDarkMode ? 'moon' : 'sunny-outline',
      type: 'toggle',
      value: isDarkModeEnabled,
      onPress: handleDarkModeToggle,
    },
    {
      id: 'notifications',
      title: 'Bildirimler',
      icon: 'notifications-outline',
      type: 'toggle',
      value: notificationsEnabled,
      onPress: () => setNotificationsEnabled(!notificationsEnabled),
    },
    {
      id: 'biometric',
      title: 'Biyometrik Giriş',
      icon: 'finger-print-outline',
      type: 'toggle',
      value: biometricEnabled,
      onPress: () => setBiometricEnabled(!biometricEnabled),
    },
    {
      id: 'password',
      title: 'Şifre Sıfırla',
      icon: 'lock-closed-outline',
      type: 'action',
      onPress: handleResetPassword,
    },
    {
      id: 'language',
      title: 'Dil',
      icon: 'language-outline',
      type: 'navigation',
      onPress: handleLanguage,
    },
    {
      id: 'currency',
      title: 'Para Birimi',
      icon: 'cash-outline',
      type: 'navigation',
      onPress: handleCurrency,
    },
    {
      id: 'security',
      title: 'Güvenlik',
      icon: 'shield-checkmark-outline',
      type: 'navigation',
      onPress: handleSecurity,
    },
    {
      id: 'privacy',
      title: 'Gizlilik',
      icon: 'lock-closed-outline',
      type: 'navigation',
      onPress: handlePrivacy,
    },
    {
      id: 'help',
      title: 'Yardım ve Destek',
      icon: 'help-circle-outline',
      type: 'navigation',
      onPress: handleHelp,
    },
    {
      id: 'about',
      title: 'Hakkında',
      icon: 'information-circle-outline',
      type: 'navigation',
      onPress: handleAbout,
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <ThemedText style={styles.sectionTitle}>Ayarlar</ThemedText>

        {settings.map((setting, index) => (
          <View key={setting.id}>
            <Pressable
              style={styles.settingItem}
              onPress={setting.onPress}
              disabled={setting.type === 'toggle'}
            >
              <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name={setting.icon} size={22} color="#22C55E" />
                </View>
                <ThemedText style={styles.settingTitle}>{setting.title}</ThemedText>
              </View>

              {setting.type === 'toggle' ? (
                <Switch
                  value={setting.value}
                  onValueChange={setting.onPress}
                  trackColor={{ false: '#767577', true: '#22C55E' }}
                  thumbColor="#FFFFFF"
                />
              ) : (
                <Ionicons name="chevron-forward" size={20} color="#9BA1A6" />
              )}
            </Pressable>
            {index < settings.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </ThemedView>
    </ThemedView>
  );
}

