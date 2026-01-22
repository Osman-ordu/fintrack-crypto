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

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>125.450₺</ThemedText>
            <ThemedText style={styles.statLabel}>Toplam Değer</ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>4</ThemedText>
            <ThemedText style={styles.statLabel}>Coin</ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>+15.2%</ThemedText>
            <ThemedText style={styles.statLabel}>Kâr/Zarar</ThemedText>
          </View>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

