import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ADAIcon, BNBIcon, BTCIcon, DOGEIcon, ETHIcon, SOLIcon, XRPIcon } from '@/assets/icons';
import { CURRENCIES_NAMES } from '@/feautures/market/constants';
import { Currency,PopularCoin, Slide, TrendingCoin  } from '@/types';

export type NavItem = {
  name: string;
  route: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
};

export const navItems: NavItem[] = [
  { name: 'index', route: '/(tabs)/', label: 'Home', icon: 'home-outline', iconActive: 'home' },
  { name: 'markets', route: '/(tabs)/markets', label: 'Markets', icon: 'trending-up-outline', iconActive: 'trending-up' },
  { name: 'watchlist', route: '/(tabs)/watchlist', label: 'Watchlist', icon: 'star-outline', iconActive: 'star' },
  { name: 'alerts', route: '/(tabs)/alerts', label: 'Alerts', icon: 'notifications-outline', iconActive: 'notifications' },
];

export const currencies = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin' },
  { id: '2', symbol: 'ETH', name: 'Ethereum' },
  { id: '3', symbol: 'BNB', name: 'Binance Coin' },
  { id: '4', symbol: 'SOL', name: 'Solana' },
  { id: '5', symbol: 'ADA', name: 'Cardano' },
  { id: '6', symbol: 'XRP', name: 'Ripple' },
  { id: '7', symbol: 'DOGE', name: 'Dogecoin' },
  { id: '8', symbol: 'TL', name: 'Türk Lirası' },
];

export const popularCoins: PopularCoin[] = [
    { id: '1', symbol: 'BTC', pair: 'BTC/TRY', change: 2.5, iconComponent: BTCIcon },
    { id: '2', symbol: 'ETH', pair: 'ETH/TRY', change: -1.2, iconComponent: ETHIcon },
    { id: '3', symbol: 'BNB', pair: 'BNB/TRY', change: 3.8, iconComponent: BNBIcon },
    { id: '4', symbol: 'SOL', pair: 'SOL/TRY', change: -0.5, iconComponent: SOLIcon },
    { id: '5', symbol: 'ADA', pair: 'ADA/TRY', change: 1.9, iconComponent: ADAIcon },
    { id: '6', symbol: 'XRP', pair: 'XRP/TRY', change: -2.1, iconComponent: XRPIcon },
    { id: '7', symbol: 'DOGE', pair: 'DOGE/TRY', change: 4.2, iconComponent: DOGEIcon },
    // Diğer coin icon'ları eklendikçe buraya eklenecek
    // { id: '8', symbol: 'DOT', pair: 'DOT/TRY', change: -0.8, iconComponent: DOTIcon },
  ];

  // Döviz/Altın listesi
export const currencyList: Currency[] = [
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

  // Dummy analysis data
export const portfolioAnalysis = {
    type: 'risk', // 'risk' | 'balance' | 'diversification'
    level: 'medium', // 'low' | 'medium' | 'high'
    title: 'Risk Seviyesi: Orta',
    message: 'Portföyünüzde BTC ağırlığı %45 seviyesinde. Daha dengeli bir dağılım için ETH ve diğer altcoinlere yatırım yapmayı düşünebilirsiniz.',
    action: 'Dengele',
    icon: 'warning-outline' as keyof typeof Ionicons.glyphMap,
    color: '#F59E0B',
  };

  export const portfolioDistribution = [
    { coin: 'Gram Altın', percentage: 45, color: '#F7931A', value: 56452.84 },
    { coin: 'Gümüş', percentage: 30, color: '#627EEA', value: 37635.23 },
    { coin: 'Dolar', percentage: 15, color: '#F3BA2F', value: 18817.61 },
    { coin: 'Euro', percentage: 10, color: '#9945FF', value: 12545.07 },
  ];

  export const portfolioData = {
    totalValue: 125450.75,
    dailyChange: 2.45,
    totalProfitLoss: 15230.50,
  };

  export const todayPerformance = {
    topGainer: {
      coin: 'Gram Altın',
      change: 5.2,
      value: 1250.50,
      icon: BTCIcon,
    },
    topLoser: {
      coin: 'Gümüş',
      change: -3.8,
      value: -850.25,
      icon: ETHIcon,
    },
  };

  export const baseTrendingCoins: TrendingCoin[] = [
    { id: '1', symbol: 'BTC', name: 'Bitcoin', change24h: 2.5, price: 125450.75 },
    { id: '2', symbol: 'ETH', name: 'Ethereum', change24h: 1.8, price: 45620.30 },
    { id: '3', symbol: 'BNB', name: 'Binance Coin', change24h: 3.2, price: 3250.50 },
    { id: '4', symbol: 'SOL', name: 'Solana', change24h: -0.5, price: 1250.75 },
    { id: '5', symbol: 'ADA', name: 'Cardano', change24h: 1.9, price: 850.25 },
    { id: '6', symbol: 'XRP', name: 'Ripple', change24h: 0.8, price: 125.50 },
    { id: '7', symbol: 'DOGE', name: 'Dogecoin', change24h: 1.2, price: 0.125 },
    { id: '8', symbol: 'DOT', name: 'Polkadot', change24h: 2.1, price: 450.30 },
    { id: '9', symbol: 'MATIC', name: 'Polygon', change24h: -1.5, price: 85.20 },
    { id: '10', symbol: 'AVAX', name: 'Avalanche', change24h: 3.5, price: 320.75 },
  ];

  export const slides: Slide[] = [
    {
      key: 'slide-1',
      title: 'Portföyünü tek yerden yönet',
      subtitle: 'Tüm borsalardaki kripto varlıklarını FinTrack ile tek ekrandan takip et.',
    },
    {
      key: 'slide-2',
      title: 'Piyasayı anlık izle',
      subtitle: 'Canlı fiyatlar, trendler ve piyasayı okumayı kolaylaştıran sade grafikler.',
    },
    {
      key: 'slide-3',
      title: 'Hedefler koy, riskini yönet',
      subtitle: 'Uyarılar ve hedefler ile duygusal kararları azalt, stratejine sadık kal.',
    },
  ];

  export type PortfolioHolding = {
    id: string;
    symbol: string;
    name: string;
    amount: string;
    value: number;
    pricePerUnit: number;
    change24h: number;
    iconComponent: React.ComponentType<{ width?: number; height?: number; color?: string }>;
  };

  export const portfolioHoldings: PortfolioHolding[] = [
    {
      id: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: '0.45',
      value: 56452.84,
      pricePerUnit: 125450.75,
      change24h: 2.5,
      iconComponent: BTCIcon,
    },
    {
      id: '2',
      symbol: 'ETH',
      name: 'Ethereum',
      amount: '0.825',
      value: 37635.23,
      pricePerUnit: 45620.30,
      change24h: 1.8,
      iconComponent: ETHIcon,
    },
    {
      id: '3',
      symbol: 'BNB',
      name: 'Binance Coin',
      amount: '5.79',
      value: 18817.61,
      pricePerUnit: 3250.50,
      change24h: 3.2,
      iconComponent: BNBIcon,
    },
    {
      id: '4',
      symbol: 'SOL',
      name: 'Solana',
      amount: '10.03',
      value: 12545.07,
      pricePerUnit: 1250.75,
      change24h: -0.5,
      iconComponent: SOLIcon,
    },
  ];

  export const allowedEndpoints: Set<string> = new Set([
    '/latest/USDT',
    '/latest/USDC'
  ]);

  export const DISPLAY_CURRENCIES = ['USD', 'EUR', 'AYAR14', 'AYAR22', 'GRAM', 'CEYREK', 'YARIM', 'ATA'];

  export const CURRENCY_WIDTH = 140;
export const SCROLL_SPEED = 50;

export const CURRENCY_LABELS: Record<string, string> = {
  USD: 'Dolar',
  EUR: 'Euro',
  AYAR22: '22 Ayar Altın',
  AYAR14: '14 Ayar Altın',
  GRAM: 'Gram Altın',
  CEYREK: 'Çeyrek Altın',
  YARIM: 'Yarım Altın',
  ATA: 'Ata Lira',
};