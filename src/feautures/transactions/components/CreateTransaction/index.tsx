import React, { useState, useMemo } from 'react';
import { View, TextInput, Pressable, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThemedView } from '@/components/ui/themed-view';
import { ThemedText } from '@/components/ui/themed-text';
import { Button } from '@/components/ui/button';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useCurrencySocket } from '@/hooks/use-currency-socket';
import { cleanNumericInput } from '@/utils';
import { CURRENCIES, CURRENCIES_NAMES } from '@/feautures/market/constants';
import { useAppDispatch } from '@/store/hooks';
import { getQuickTransaction } from '@/store/quickTransactions';
import { createTransactionSchema, type CreateTransactionFormData } from './validation';
import { CreateQuickTransaction } from '@/store/quickTransactions/types';
import { postQuickTransaction } from '@/store/quickTransactions';
import { styles } from './styles';

interface CreateTransactionProps {
  onQuickAdd: (currency: string, amount: number) => void;
}

export function CreateTransaction({ onQuickAdd }: CreateTransactionProps) {
  const dispatch = useAppDispatch();
  const textColor = useThemeColor({}, 'text');
  const { currencies: socketCurrencies, isConnected } = useCurrencySocket();
  const [showBaseAssetPicker, setShowBaseAssetPicker] = useState(false);
  const [showQuoteAssetPicker, setShowQuoteAssetPicker] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      amount: '',
      baseAsset: '',
      quoteAsset: 'TRY',
    },
  });

  const baseAsset = watch('baseAsset');
  const quoteAsset = watch('quoteAsset');
  const amount = watch('amount');

  // WebSocket'ten gelen currency'leri filtrele ve sırala
  const availableBaseAssets = useMemo(() => {
    const available = CURRENCIES.filter((currency) => {
      return socketCurrencies[currency] !== undefined;
    });
    return available;
  }, [socketCurrencies]);

  // Seçili base asset'in fiyatını al
  const selectedBaseCurrency = baseAsset ? socketCurrencies[baseAsset] : null;
  const price = selectedBaseCurrency?.buyPrice || 0;

  // Hesaplanan toplam tutar
  const calculatedTotal = useMemo(() => {
    if (!amount || !price) return 0;
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return 0;
    return numAmount * price;
  }, [amount, price]);

  const onSubmit = async (data: CreateTransactionFormData) => {
    try {
      const amountNum = parseFloat(data.amount);
      const total = amountNum * price;

      const postData: CreateQuickTransaction = {
        baseAsset: data.baseAsset,
        quoteAsset: data.quoteAsset,
        amount: amountNum,
        total: total,
        transactionDate: new Date(),
      }

      await dispatch(postQuickTransaction(postData));
      await dispatch(getQuickTransaction());

      setValue('amount', '');
      setValue('baseAsset', '');
      setValue('quoteAsset', 'TRY');
    } catch (error) {
      console.error('Transaction creation error:', error);
    }
  };

  return (
    <ThemedView card style={styles.card}>
      <ThemedText style={styles.title}>İşlem Oluştur</ThemedText>
      <ThemedText style={styles.subtitle}>
        Miktar ve döviz çifti seçerek yeni işlem ekleyin
      </ThemedText>

      {!isConnected && (
        <ThemedView style={styles.connectionStatus}>
          <Ionicons name="warning-outline" size={16} color="#F59E0B" />
          <ThemedText style={styles.connectionStatusText}>
            Fiyat verileri yükleniyor...
          </ThemedText>
        </ThemedView>
      )}

      <View style={styles.formContainer}>
        {/* Miktar Input */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Miktar</ThemedText>
          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    color: textColor,
                    borderColor: errors.amount ? '#EF4444' : textColor + '30',
                    backgroundColor: textColor + '10',
                  },
                ]}
                value={value}
                onChangeText={(text) => {
                  const cleaned = cleanNumericInput(text);
                  onChange(cleaned);
                }}
                placeholder="0.00"
                placeholderTextColor={textColor + '60'}
                keyboardType="decimal-pad"
              />
            )}
          />
          {errors.amount && (
            <ThemedText style={styles.errorText}>{errors.amount.message}</ThemedText>
          )}
        </View>

        {/* Base Asset Seçimi */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Döviz Çifti</ThemedText>
          <View style={styles.currencyPairContainer}>
            <Controller
              control={control}
              name="baseAsset"
              render={({ field: { value } }) => (
                <Pressable
                  style={[
                    styles.currencySelector,
                    {
                      borderColor: errors.baseAsset ? '#EF4444' : textColor + '30',
                      backgroundColor: textColor + '10',
                    },
                  ]}
                  onPress={() => setShowBaseAssetPicker(true)}
                >
                  <ThemedText
                    style={[
                      styles.currencySelectorText,
                      { color: value ? textColor : textColor + '60' },
                    ]}
                  >
                    {value || 'Varlık Seçin'}
                  </ThemedText>
                  <Ionicons name="chevron-down" size={20} color={textColor + '80'} />
                </Pressable>
              )}
            />

            <ThemedText style={styles.divider}>/</ThemedText>

            <Controller
              control={control}
              name="quoteAsset"
              render={({ field: { value } }) => (
                <Pressable
                  style={[
                    styles.currencySelector,
                    {
                      borderColor: textColor + '30',
                      backgroundColor: textColor + '10',
                    },
                  ]}
                  onPress={() => setShowQuoteAssetPicker(true)}
                >
                  <ThemedText style={[styles.currencySelectorText, { color: textColor }]}>
                    {value || 'TRY'}
                  </ThemedText>
                  <Ionicons name="chevron-down" size={20} color={textColor + '80'} />
                </Pressable>
              )}
            />
          </View>
          {errors.baseAsset && (
            <ThemedText style={styles.errorText}>{errors.baseAsset.message}</ThemedText>
          )}
        </View>

        {/* Otomatik Fiyat Gösterimi */}
        {baseAsset && price > 0 && (
          <View style={styles.priceContainer}>
            <View style={styles.priceRow}>
              <ThemedText style={styles.priceLabel}>Fiyat:</ThemedText>
              <ThemedText style={styles.priceValue}>
                1 {baseAsset} = {price.toLocaleString('tr-TR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                {quoteAsset}
              </ThemedText>
            </View>
            {amount && calculatedTotal > 0 && (
              <View style={styles.priceRow}>
                <ThemedText style={styles.priceLabel}>Toplam:</ThemedText>
                <ThemedText style={styles.totalValue}>
                  {calculatedTotal.toLocaleString('tr-TR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{' '}
                  {quoteAsset}
                </ThemedText>
              </View>
            )}
          </View>
        )}

        {/* Submit Button */}
        <Button
          title="Ekle"
          onPress={handleSubmit(onSubmit)}
          variant="primary"
          size="large"
          loading={isSubmitting}
          disabled={!baseAsset || !amount || !isConnected || isSubmitting}
          style={styles.submitButton}
        />
      </View>

      {/* Base Asset Picker Modal */}
      <Modal
        visible={showBaseAssetPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBaseAssetPicker(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowBaseAssetPicker(false)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <ThemedView card style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Varlık Seçin</ThemedText>
              <Pressable onPress={() => setShowBaseAssetPicker(false)}>
                <Ionicons name="close" size={24} color={textColor} />
              </Pressable>
            </View>
            <ScrollView style={styles.modalBody}>
              {availableBaseAssets.map((currency) => {
                const currencyData = socketCurrencies[currency];
                return (
                  <Pressable
                    key={currency}
                    style={[
                      styles.currencyOption,
                      {
                        backgroundColor:
                          baseAsset === currency ? textColor + '20' : 'transparent',
                      },
                    ]}
                    onPress={(e) => {
                      e.stopPropagation();
                      setValue('baseAsset', currency);
                      setShowBaseAssetPicker(false);
                    }}
                  >
                    <View style={styles.currencyOptionContent}>
                      <ThemedText style={styles.currencyOptionCode}>{currency}</ThemedText>
                      <ThemedText style={styles.currencyOptionName}>
                        {CURRENCIES_NAMES[currency as keyof typeof CURRENCIES_NAMES] ||
                          currency}
                      </ThemedText>
                    </View>
                    {currencyData && (
                      <ThemedText style={styles.currencyOptionPrice}>
                        {currencyData.buyPrice.toLocaleString('tr-TR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{' '}
                        TRY
                      </ThemedText>
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
            </ThemedView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Quote Asset Picker Modal */}
      <Modal
        visible={showQuoteAssetPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowQuoteAssetPicker(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowQuoteAssetPicker(false)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <ThemedView card style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Quote Asset Seçin</ThemedText>
              <Pressable onPress={() => setShowQuoteAssetPicker(false)}>
                <Ionicons name="close" size={24} color={textColor} />
              </Pressable>
            </View>
            <ScrollView style={styles.modalBody}>
              <Pressable
                style={[
                  styles.currencyOption,
                  {
                    backgroundColor: quoteAsset === 'TRY' ? textColor + '20' : 'transparent',
                  },
                ]}
                onPress={(e) => {
                  e.stopPropagation();
                  setValue('quoteAsset', 'TRY');
                  setShowQuoteAssetPicker(false);
                }}
              >
                <View style={styles.currencyOptionContent}>
                  <ThemedText style={styles.currencyOptionCode}>TRY</ThemedText>
                  <ThemedText style={styles.currencyOptionName}>Türk Lirası</ThemedText>
                </View>
              </Pressable>
            </ScrollView>
            </ThemedView>
          </Pressable>
        </Pressable>
      </Modal>
    </ThemedView>
  );
}
