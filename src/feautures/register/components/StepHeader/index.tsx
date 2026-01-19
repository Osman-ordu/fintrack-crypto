import React from 'react';
import { ThemedText } from '@/components/ui/ThemedText';
import { styles } from './styles';

interface StepHeaderProps {
  step: number;
}

const STEP_CONFIG = {
  1: {
    title: 'Kişisel Bilgiler',
    subtitle: 'Ad ve soyad bilgilerinizi giriniz',
  },
  2: {
    title: 'İletişim Bilgisi',
    subtitle: 'Telefon numaranızı giriniz',
  },
  3: {
    title: 'Hesap Bilgileri',
    subtitle: 'E-posta ve şifre bilgilerinizi giriniz',
  },
} as const;

export function StepHeader({ step }: StepHeaderProps) {
  const config = STEP_CONFIG[step as keyof typeof STEP_CONFIG] || {
    title: 'Üye Ol',
    subtitle: 'Yeni hesap oluşturarak başlayın',
  };

  return (
    <>
      <ThemedText type="title" style={styles.title}>
        {config.title}
      </ThemedText>
      <ThemedText style={styles.subtitle}>{config.subtitle}</ThemedText>
    </>
  );
}
