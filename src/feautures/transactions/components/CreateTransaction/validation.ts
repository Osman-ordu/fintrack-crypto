import { z } from 'zod';

export const createTransactionSchema = z.object({
  amount: z
    .string()
    .min(1, 'Miktar gereklidir')
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num > 0;
      },
      {
        message: 'Miktar 0\'dan büyük olmalıdır',
      }
    ),
  baseAsset: z
    .string()
    .min(1, 'Döviz çifti seçilmelidir'),
  quoteAsset: z
    .string()
    .min(1, 'Quote asset seçilmelidir'),
});

export type CreateTransactionFormData = z.infer<typeof createTransactionSchema>;

