import React, { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { currencies } from '@/db';
import { Currency, RootStackParamList, TabType } from '@/types';
import { styles } from './EasyBuySellScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'EasyBuySell'>;

export default function EasyBuySellScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('buy');
  const [fromCurrency, setFromCurrency] = useState<Currency>(currencies[0]);
  const [toCurrency, setToCurrency] = useState<Currency>(currencies[7]); // TL
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const handleFromCurrencyChange = (currency: Currency) => {
    setFromCurrency(currency);
    setShowFromPicker(false);
    if (currency.symbol === toCurrency.symbol) {
      const otherCurrency = activeTab === 'buy' ? currencies[7] : currencies[0];
      setToCurrency(otherCurrency);
    }
  };

  const handleToCurrencyChange = (currency: Currency) => {
    setToCurrency(currency);
    setShowToPicker(false);
    if (currency.symbol === fromCurrency.symbol) {
      const otherCurrency = activeTab === 'buy' ? currencies[0] : currencies[7];
      setFromCurrency(otherCurrency);
    }
  };

  const handleSubmit = () => {
    Alert.alert(
      'Giriş Yap / Kayıt Ol',
      `İşlem Tipi: ${activeTab === 'buy' ? 'Al' : 'Sat'}\n` +
        `From: ${fromAmount} ${fromCurrency.symbol}\n` +
        `To: ${toAmount} ${toCurrency.symbol}`,
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
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
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
              onPress={() => {
                if (activeTab !== 'buy') {
                  setActiveTab('buy');
                  setFromCurrency(currencies[0]);
                  setToCurrency(currencies[7]);
                  setFromAmount('');
                  setToAmount('');
                }
              }}
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
              onPress={() => {
                if (activeTab !== 'sell') {
                  setActiveTab('sell');
                  setFromCurrency(currencies[7]);
                  setToCurrency(currencies[0]);
                  setFromAmount('');
                  setToAmount('');
                }
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ThemedText
                style={[styles.tabText, activeTab === 'sell' && styles.activeTabText]}
              >
                Sat
              </ThemedText>
            </Pressable>
          </View>

          <View style={styles.inputsContainer}>
            <View style={styles.inputWrapper}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  placeholderTextColor="#999"
                  value={fromAmount}
                  onChangeText={setFromAmount}
                  keyboardType="decimal-pad"
                />
                <Pressable
                  style={styles.currencySelector}
                  onPress={() => setShowFromPicker(true)}
                >
                  <ThemedText style={styles.currencyText}>{fromCurrency.symbol}</ThemedText>
                  <Ionicons name="chevron-down" size={16} color="#666" />
                </Pressable>
              </View>
              <ThemedText style={styles.inputLabel}>{fromCurrency.name}</ThemedText>
            </View>

            <View style={styles.inputWrapper}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  placeholderTextColor="#999"
                  value={toAmount}
                  onChangeText={setToAmount}
                  keyboardType="decimal-pad"
                />
                <Pressable
                  style={styles.currencySelector}
                  onPress={() => setShowToPicker(true)}
                >
                  <ThemedText style={styles.currencyText}>{toCurrency.symbol}</ThemedText>
                  <Ionicons name="chevron-down" size={16} color="#666" />
                </Pressable>
              </View>
              <ThemedText style={styles.inputLabel}>{toCurrency.name}</ThemedText>
            </View>
          </View>

          <Button
            title="Giriş Yap / Kayıt Ol"
            onPress={handleSubmit}
            variant="primary"
            size="large"
            style={styles.submitButton}
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
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <ThemedText style={styles.modalTitle}>Para Birimi Seç</ThemedText>
                <Pressable onPress={() => setShowFromPicker(false)}>
                  <Ionicons name="close" size={24} color="#666" />
                </Pressable>
              </View>
              <ScrollView>
                {currencies.map((currency) => (
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
            </View>
          </View>
        </Modal>
      )}

      {showToPicker && (
        <Modal
          visible={showToPicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowToPicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <ThemedText style={styles.modalTitle}>Para Birimi Seç</ThemedText>
                <Pressable onPress={() => setShowToPicker(false)}>
                  <Ionicons name="close" size={24} color="#666" />
                </Pressable>
              </View>
              <ScrollView>
                {currencies.map((currency) => (
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
            </View>
          </View>
        </Modal>
      )}
    </ThemedView>
  );
}

