import React, { useState, useEffect, useMemo } from 'react';
import { Alert, Modal, Pressable, ScrollView, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { AppLogo, useAppLogoHeight } from '@/components/layout';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useCurrencySocket } from '@/hooks/use-currency-socket';
import { CURRENCIES, CURRENCIES_NAMES, getCurrencyColor } from '@/feautures/market/constants';
import { cleanNumericInput } from '@/utils';
import { RootStackParamList, TabType } from '@/types';
import { styles } from './EasyBuySellScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'EasyBuySell'>;

interface Currency {
  symbol: string;
  name: string;
}

// Döviz/Altın listesi
const currencyList: Currency[] = [
  { symbol: 'USD', name: CURRENCIES_NAMES.USD },
  { symbol: 'EUR', name: CURRENCIES_NAMES.EUR },
  { symbol: 'GRAM', name: CURRENCIES_NAMES.GRAM },
  { symbol: 'CEYREK', name: CURRENCIES_NAMES.CEYREK },
  { symbol: 'YARIM', name: CURRENCIES_NAMES.YARIM },
  { symbol: 'ATA', name: CURRENCIES_NAMES.ATA },
  { symbol: 'AYAR22', name: CURRENCIES_NAMES.AYAR22 },
  { symbol: 'AYAR14', name: CURRENCIES_NAMES.AYAR14 },
  { symbol: 'GUMUSTRY', name: CURRENCIES_NAMES.GUMUSTRY },
  { symbol: 'TRY', name: 'Türk Lirası' },
];

export default function EasyBuySellScreen({ navigation }: Props) {
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  
  const logoHeight = 60;
  const totalHeaderHeight = useAppLogoHeight(logoHeight);
  
  const [activeTab, setActiveTab] = useState<TabType>('buy');
  const [fromCurrency, setFromCurrency] = useState<Currency>(currencyList[0]); // USD
  const [toCurrency, setToCurrency] = useState<Currency>(currencyList[9]); // TRY
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const { currencies: socketCurrencies, isConnected } = useCurrencySocket();

  // Gerçek zamanlı fiyat hesaplama
  const exchangeRate = useMemo(() => {
    if (!isConnected || !fromCurrency || !toCurrency) return 0;

    // TRY'den başka bir dövize çevirme
    if (fromCurrency.symbol === 'TRY') {
      const toData = socketCurrencies[toCurrency.symbol];
      if (!toData) return 0;
      // TRY'yi dövize çevirmek için satış fiyatını kullan (TRY verdiğimiz için döviz alıyoruz)
      return 1 / toData.sellPrice;
    }

    // Başka bir dövizden TRY'ye çevirme
    if (toCurrency.symbol === 'TRY') {
      const fromData = socketCurrencies[fromCurrency.symbol];
      if (!fromData) return 0;
      // Dövizi TRY'ye çevirmek için alış fiyatını kullan (döviz verdiğimiz için TRY alıyoruz)
      return fromData.buyPrice;
    }

    // İki döviz arası çevirme (TRY üzerinden)
    const fromData = socketCurrencies[fromCurrency.symbol];
    const toData = socketCurrencies[toCurrency.symbol];
    if (!fromData || !toData) return 0;
    
    // Önce fromCurrency'yi TRY'ye çevir, sonra TRY'yi toCurrency'ye çevir
    const fromToTry = fromData.buyPrice; // Döviz -> TRY (alış)
    const tryToTo = 1 / toData.sellPrice; // TRY -> Döviz (satış)
    return fromToTry * tryToTo;
  }, [fromCurrency, toCurrency, socketCurrencies, isConnected]);

  // Miktar değiştiğinde otomatik hesaplama
  useEffect(() => {
    if (fromAmount && exchangeRate > 0) {
      const calculated = parseFloat(fromAmount) * exchangeRate;
      setToAmount(calculated.toFixed(2));
    } else {
      setToAmount('');
    }
  }, [fromAmount, exchangeRate]);

  const handleFromCurrencyChange = (currency: Currency) => {
    setFromCurrency(currency);
    setShowFromPicker(false);
    if (currency.symbol === toCurrency.symbol) {
      const otherCurrency = activeTab === 'buy' ? currencyList[9] : currencyList[0];
      setToCurrency(otherCurrency);
    }
    setFromAmount('');
    setToAmount('');
  };

  const handleToCurrencyChange = (currency: Currency) => {
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
      // Tab değiştiğinde para birimlerini değiştir
      if (tab === 'buy') {
        // Al: Döviz -> TRY
        setFromCurrency(currencyList[0]); // USD
        setToCurrency(currencyList[9]); // TRY
      } else {
        // Sat: TRY -> Döviz
        setFromCurrency(currencyList[9]); // TRY
        setToCurrency(currencyList[0]); // USD
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
            // TODO: Navigate to login/register screen
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
          {/* Tabs */}
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

          {/* Bağlantı durumu */}
          {!isConnected && (
            <ThemedView style={styles.connectionStatus}>
              <Ionicons name="warning-outline" size={16} color="#F59E0B" />
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

            {/* Kur bilgisi */}
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
                {currencyList.map((currency) => (
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
                {currencyList.map((currency) => (
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
