import React, { useState } from 'react';
import { Alert, Pressable, Switch, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useTheme } from '@/contexts/ThemeContext';
import { RootStackParamList } from '@/navigation/types';
import { IconColors, SemanticColors } from '@/theme';
import { CurrencyPickerModal } from '../CurrencyPickerModal';
import { styles } from './styles';

type SettingItem = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function ProfileSettings() {
  const navigation = useNavigation<NavigationProp>();
  const { themeMode, colorScheme, setThemeMode } = useTheme();
  const { currency, setCurrency } = useCurrency();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);

  const handleResetPassword = () => {
    navigation.navigate('PasswordReset');
  };

  const handleLanguage = () => {
    Alert.alert('Dil Seçimi', 'Dil seçimi özelliği yakında eklenecek.');
  };

  const handleCurrency = () => {
    setShowCurrencyPicker(true);
  };

  const handlePrivacy = () => {
    navigation.navigate('Privacy');
  };

  const handleAbout = () => {
    navigation.navigate('About');
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
      id: 'password',
      title: 'Şifre Sıfırla',
      icon: 'lock-closed-outline',
      type: 'action',
      onPress: handleResetPassword,
    },
    {
      id: 'currency',
      title: 'Para Birimi',
      icon: 'cash-outline',
      type: 'navigation',
      onPress: handleCurrency,
    },

    {
      id: 'privacy',
      title: 'Gizlilik',
      icon: 'lock-closed-outline',
      type: 'navigation',
      onPress: handlePrivacy,
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

        {settings?.map((setting, index) => (
          <View key={setting.id}>
            <Pressable
              style={styles.settingItem}
              onPress={setting.onPress}
              disabled={setting.type === 'toggle'}
            >
              <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name={setting.icon} size={22} color={SemanticColors.success} />
                </View>
                <ThemedText style={styles.settingTitle}>{setting.title}</ThemedText>
              </View>

              {setting.type === 'toggle' ? (
                <Switch
                  value={setting.value}
                  onValueChange={setting.onPress}
                  trackColor={{ false: IconColors.switchGray, true: SemanticColors.success }}
                  thumbColor={IconColors.white}
                />
              ) : (
                <Ionicons name="chevron-forward" size={20} color={IconColors.gray} />
              )}
            </Pressable>
            {index < settings.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </ThemedView>
      <CurrencyPickerModal
        visible={showCurrencyPicker}
        onClose={() => setShowCurrencyPicker(false)}
        selectedCurrency={currency}
        onSelectCurrency={setCurrency}
      />
    </ThemedView>
  );
}

