import { z } from 'zod';

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

export const step1Schema = z.object({
  name: z
    .string()
    .min(2, 'Ad en az 2 karakter olmalıdır')
    .max(15, 'Ad en fazla 15 karakter olabilir')
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Ad sadece harf içerebilir'),
  surname: z
    .string()
    .min(2, 'Soyad en az 2 karakter olmalıdır')
    .max(15, 'Soyad en fazla 15 karakter olabilir')
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Soyad sadece harf içerebilir'),
});

export const step2Schema = z.object({
  phone: z
    .string()
    .min(1, 'Telefon numarası gereklidir')
    .regex(/^0\d{10}$/, 'Telefon numarası 0 ile başlamalı ve 11 haneli olmalıdır'),
});

export const step3Schema = z.object({
  email: z
    .string()
    .min(1, 'E-posta adresi gereklidir')
    .email('Geçerli bir e-posta adresi giriniz'),
  password: z
    .string()
    .min(8, 'Şifre en az 8 karakter olmalıdır')
    .max(100, 'Şifre çok uzun')
    .regex(
      strongPasswordRegex,
      'Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter (@$!%*?&) içermelidir'
    ),
});

export const registerSchema = step1Schema.merge(step2Schema).merge(step3Schema);

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

