import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { IUser } from '@/store/user/types';
import { IconColors } from '@/theme';
import { styles } from './styles';

export function ProfileHeader({ user } : { user: IUser }) {

  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={IconColors.gray} />
          </View>
          <View style={styles.editButton}>
            <Ionicons name="camera" size={16} color={IconColors.white} />
          </View>
        </View>

        <ThemedText style={styles.name}>{user?.name}</ThemedText>
        <ThemedText style={styles.email}>{user?.email}</ThemedText>
        <ThemedText style={styles.phone}>{'+' + user?.phone}</ThemedText>

      </ThemedView>
    </ThemedView>
  );
}

