import React from 'react';
import { Alert,Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { styles } from './styles';

export function ProfileActions() {
  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Çıkış yapmak istediğinize emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement logout logic
            console.log('Logout');
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Hesabı Sil',
      'Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement delete account logic
            console.log('Delete account');
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <Pressable style={styles.actionItem} onPress={handleLogout}>
          <View style={[styles.iconContainer, styles.logoutIcon]}>
            <Ionicons name="log-out-outline" size={22} color="#EF4444" />
          </View>
          <ThemedText style={[styles.actionText, styles.logoutText]}>
            Çıkış Yap
          </ThemedText>
        </Pressable>

        <View style={styles.separator} />

        <Pressable style={styles.actionItem} onPress={handleDeleteAccount}>
          <View style={[styles.iconContainer, styles.deleteIcon]}>
            <Ionicons name="trash-outline" size={22} color="#EF4444" />
          </View>
          <ThemedText style={[styles.actionText, styles.deleteText]}>
            Hesabı Sil
          </ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

