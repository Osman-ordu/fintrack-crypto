import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ui/themed-view';
import { ProfileActions } from '@/feautures/profile/components/ProfileActions';
import { ProfileHeader } from '@/feautures/profile/components/ProfileHeader';
import { ProfileSettings } from '@/feautures/profile/components/ProfileSettings';
import { styles } from './ProfileScreen.styles';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <ProfileHeader />
        <ProfileSettings />
        <ProfileActions />
      </ScrollView>
    </ThemedView>
  );
}

