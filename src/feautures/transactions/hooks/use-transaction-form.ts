import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CURRENCIES } from '@/feautures/market/constants';
import { createTransactionSchema } from '../components/CreateTransaction/validation';

interface UseTransactionFormProps {
  socketCurrencies: Record<string, { buyPrice: number }>;
}

export function useTransactionForm({ socketCurrencies }: UseTransactionFormProps) {
  const form = useForm({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      amount: '',
      baseAsset: '',
      quoteAsset: 'TRY',
    },
  });

  const availableBaseAssets = useMemo(() => {
    return CURRENCIES.filter((currency) => {
      return socketCurrencies[currency] !== undefined;
    });
  }, [socketCurrencies]);

  // Set default baseAsset to USD if available
  useEffect(() => {
    const currentBaseAsset = form.getValues('baseAsset');
    if (!currentBaseAsset && availableBaseAssets.includes('USD') && socketCurrencies['USD']) {
      form.setValue('baseAsset', 'USD', { shouldValidate: false });
    }
  }, [availableBaseAssets, socketCurrencies, form]);

  const baseAsset = form.watch('baseAsset');
  const quoteAsset = form.watch('quoteAsset');
  const amount = form.watch('amount');

  const selectedBaseCurrency = baseAsset ? socketCurrencies[baseAsset] : null;
  const price = selectedBaseCurrency?.buyPrice || 0;

  const calculatedTotal = useMemo(() => {
    if (!amount || !price) return 0;
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return 0;
    return numAmount * price;
  }, [amount, price]);

  return {
    form,
    baseAsset,
    quoteAsset,
    amount,
    availableBaseAssets,
    price,
    calculatedTotal,
  };
}

