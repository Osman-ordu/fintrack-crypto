import React, { useEffect, useMemo,useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { AppLogo, useAppLogoHeight } from '@/components/layout';
import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { currencyList } from '@/db';
import { useCurrencySocket } from '@/hooks/use-currency-socket';
import { useThemeColor } from '@/hooks/use-theme-color';
import { RootStackParamList } from '@/navigation/types';
import { SemanticColors } from '@/theme';
import { ICurrency, TabType } from '@/types';
import { cleanNumericInput } from '@/utils';
import { styles } from './EasyBuySellScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'EasyBuySell'>;

export default function EasyBuySellScreen({ navigation }: Props) {
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');

  const logoHeight = 60;
  const totalHeaderHeight = useAppLogoHeight(logoHeight);

  const [activeTab, setActiveTab] = useState<TabType>('buy');
  const [fromCurrency, setFromCurrency] = useState<ICurrency>(currencyList[0]);
  const [toCurrency, setToCurrency] = useState<ICurrency>(currencyList[9]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const { currencies: socketCurrencies, isConnected } = useCurrencySocket();

  const exchangeRate = useMemo(() => {
    if (!isConnected || !fromCurrency || !toCurrency) return 0;

    if (fromCurrency.symbol === 'TRY') {
      const toData = socketCurrencies[toCurrency.symbol];
      if (!toData) return 0;
      return 1 / toData.sellPrice;
    }

    if (toCurrency.symbol === 'TRY') {
      const fromData = socketCurrencies[fromCurrency.symbol];
      if (!fromData) return 0;
      return fromData.buyPrice;
    }

    const fromData = socketCurrencies[fromCurrency.symbol];
    const toData = socketCurrencies[toCurrency.symbol];
    if (!fromData || !toData) return 0;

    const fromToTry = fromData.buyPrice;
    const tryToTo = 1 / toData.sellPrice;
    return fromToTry * tryToTo;
  }, [fromCurrency, toCurrency, socketCurrencies, isConnected]);

  useEffect(() => {
    if (fromAmount && exchangeRate > 0) {
      const calculated = parseFloat(fromAmount) * exchangeRate;
      setToAmount(calculated.toFixed(2));
    } else {
      setToAmount('');
    }
  }, [fromAmount, exchangeRate]);

  const handleFromCurrencyChange = (currency: ICurrency) => {
    setFromCurrency(currency);
    setShowFromPicker(false);
    if (currency.symbol === toCurrency.symbol) {
      const otherCurrency = activeTab === 'buy' ? currencyList[9] : currencyList[0];
      setToCurrency(otherCurrency);
    }
    setFromAmount('');
    setToAmount('');
  };

  const handleToCurrencyChange = (currency: ICurrency) => {
    setToCurrency(currency);
    setShowToPicker(false);
    if (currency.symbol === fromCurrency.symbol) {
      const otherCurrency = activeTab === 'buy' ? currencyList[0] : currencyList[9];
      setFromCurrency(otherCurrency);
    }
    setFromAmount('');
    setToAmount('');
  };

  const handleTabChange = (tab: TabType) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      if (tab === 'buy') {
        setFromCurrency(currencyList[0]);
        setToCurrency(currencyList[9]);
      } else {
        setFromCurrency(currencyList[9]);
        setToCurrency(currencyList[0]);
      }
      setFromAmount('');
      setToAmount('');
    }
  };

  const handleSubmit = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      Alert.alert('Hata', 'Lütfen geçerli bir miktar girin.');
      return;
    }

    if (!isConnected) {
      Alert.alert('Bağlantı Hatası', 'Fiyat verileri yükleniyor. Lütfen bekleyin.');
      return;
    }

    Alert.alert(
      'Giriş Yap / Kayıt Ol',
      `İşlem Tipi: ${activeTab === 'buy' ? 'Al' : 'Sat'}\n` +
        `${fromAmount} ${fromCurrency.symbol} = ${toAmount} ${toCurrency.symbol}\n` +
        `Kur: 1 ${fromCurrency.symbol} = ${exchangeRate.toFixed(4)} ${toCurrency.symbol}`,
      [
        {
          text: 'Tamam',
          onPress: () => {
            void navigation.navigate('Login' as keyof RootStackParamList);
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <AppLogo logoHeight={logoHeight} />
      <View style={[styles.header, { paddingTop: totalHeaderHeight }]}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color={textColor} />
        </Pressable>
        <ThemedText style={styles.headerTitle}>Kolay Al Sat</ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.card}>
          <View style={styles.tabsContainer}>
            <Pressable
              style={[styles.tab, activeTab === 'buy' && styles.activeTab, styles.leftTab]}
              onPress={() => handleTabChange('buy')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ThemedText
                style={[styles.tabText, activeTab === 'buy' && styles.activeTabText]}
              >
                Al
              </ThemedText>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'sell' && styles.activeTab, styles.rightTab]}
              onPress={() => handleTabChange('sell')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ThemedText
                style={[styles.tabText, activeTab === 'sell' && styles.activeTabText]}
              >
                Sat
              </ThemedText>
            </Pressable>
          </View>

          {!isConnected && (
            <ThemedView style={styles.connectionStatus}>
              <Ionicons name="warning-outline" size={16} color={SemanticColors.warning} />
              <ThemedText style={styles.connectionStatusText}>
                Fiyat verileri yükleniyor...
              </ThemedText>
            </ThemedView>
          )}

          <View style={styles.inputsContainer}>
            <View style={styles.inputWrapper}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, { color: textColor }]}
                  placeholder="0.00"
                  placeholderTextColor={textColor + '60'}
                  value={fromAmount}
                  onChangeText={(text) => {
                    const cleaned = cleanNumericInput(text);
                    setFromAmount(cleaned);
                  }}
                  keyboardType="decimal-pad"
                />
                <Pressable
                  style={[styles.currencySelector, { borderLeftColor: textColor + '20' }]}
                  onPress={() => setShowFromPicker(true)}
                >
                  <ThemedText style={[styles.currencyText, { color: textColor }]}>
                    {fromCurrency.symbol}
                  </ThemedText>
                  <Ionicons name="chevron-down" size={16} color={textColor + '80'} />
                </Pressable>
              </View>
              <ThemedText style={styles.inputLabel}>{fromCurrency.name}</ThemedText>
            </View>

            <View style={styles.swapContainer}>
              <Ionicons name="swap-vertical" size={24} color={textColor + '60'} />
            </View>

            <View style={styles.inputWrapper}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, { color: textColor }]}
                  placeholder="0.00"
                  placeholderTextColor={textColor + '60'}
                  value={toAmount}
                  editable={false}
                  keyboardType="decimal-pad"
                />
                <Pressable
                  style={[styles.currencySelector, { borderLeftColor: textColor + '20' }]}
                  onPress={() => setShowToPicker(true)}
                >
                  <ThemedText style={[styles.currencyText, { color: textColor }]}>
                    {toCurrency.symbol}
                  </ThemedText>
                  <Ionicons name="chevron-down" size={16} color={textColor + '80'} />
                </Pressable>
              </View>
              <ThemedText style={styles.inputLabel}>{toCurrency.name}</ThemedText>
            </View>

            {exchangeRate > 0 && (
              <ThemedView style={styles.rateInfo}>
                <ThemedText style={styles.rateText}>
                  1 {fromCurrency.symbol} = {exchangeRate.toFixed(4)} {toCurrency.symbol}
                </ThemedText>
              </ThemedView>
            )}
          </View>

          <Button
            title="Giriş Yap / Kayıt Ol"
            onPress={handleSubmit}
            variant="primary"
            size="large"
            style={styles.submitButton}
            disabled={!isConnected || !fromAmount || parseFloat(fromAmount) <= 0}
          />
        </ThemedView>
      </ScrollView>

      {showFromPicker && (
        <Modal
          visible={showFromPicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowFromPicker(false)}
        >
          <ThemedView style={[styles.modalOverlay, { backgroundColor: backgroundColor + 'CC' }]}>
            <ThemedView card style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <ThemedText style={styles.modalTitle}>Para Birimi Seç</ThemedText>
                <Pressable onPress={() => setShowFromPicker(false)}>
                  <Ionicons name="close" size={24} color={textColor} />
                </Pressable>
              </View>
              <ScrollView>
                {currencyList?.map((currency) => (
                  <Pressable
                    key={currency.symbol}
                    style={[
                      styles.currencyOption,
                      fromCurrency.symbol === currency.symbol && styles.selectedCurrencyOption,
                    ]}
                    onPress={() => handleFromCurrencyChange(currency)}
                  >
                    <ThemedText
                      style={[
                        styles.currencyOptionText,
                        fromCurrency.symbol === currency.symbol && styles.selectedCurrencyOptionText,
                      ]}
                    >
                      {currency.symbol} - {currency.name}
                    </ThemedText>
                  </Pressable>
                ))}
              </ScrollView>
            </ThemedView>
          </ThemedView>
        </Modal>
      )}

      {showToPicker && (
        <Modal
          visible={showToPicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowToPicker(false)}
        >
          <ThemedView style={[styles.modalOverlay, { backgroundColor: backgroundColor + 'CC' }]}>
            <ThemedView card style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <ThemedText style={styles.modalTitle}>Para Birimi Seç</ThemedText>
                <Pressable onPress={() => setShowToPicker(false)}>
                  <Ionicons name="close" size={24} color={textColor} />
                </Pressable>
              </View>
              <ScrollView>
                {currencyList?.map((currency) => (
                  <Pressable
                    key={currency.symbol}
                    style={[
                      styles.currencyOption,
                      toCurrency.symbol === currency.symbol && styles.selectedCurrencyOption,
                    ]}
                    onPress={() => handleToCurrencyChange(currency)}
                  >
                    <ThemedText
                      style={[
                        styles.currencyOptionText,
                        toCurrency.symbol === currency.symbol && styles.selectedCurrencyOptionText,
                      ]}
                    >
                      {currency.symbol} - {currency.name}
                    </ThemedText>
                  </Pressable>
                ))}
              </ScrollView>
            </ThemedView>
          </ThemedView>
        </Modal>
      )}
    </ThemedView>
  );
}
