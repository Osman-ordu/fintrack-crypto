import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ui/ThemedView';
import { ProfileActions } from '@/feautures/profile/components/ProfileActions';
import { ProfileHeader } from '@/feautures/profile/components/ProfileHeader';
import { ProfileSettings } from '@/feautures/profile/components/ProfileSettings';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { getUser } from '@/store/user';
import { IUser } from '@/store/user/types';
import { styles } from './ProfileScreen.styles';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const user  = useAppSelector((state: RootState) => state.user?.data?.data);

  useEffect(() => {
    (async () => {
      await dispatch(getUser());
    })();
  }, [dispatch]);

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <ProfileHeader user={user as IUser}/>
        <ProfileSettings />
        <ProfileActions />
      </ScrollView>
    </ThemedView>
  );
}

