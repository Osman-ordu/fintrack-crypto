import { Ionicons } from '@expo/vector-icons';

export const CURRENCIES = ['USD', 'EUR', 'AYAR14', 'AYAR22', 'GRAM', 'CEYREK', 'YARIM', 'ATA', 'GUMUSTRY'];

export const CURRENCIES_NAMES = {
  USD: 'Dolar',
  EUR: 'Euro',
  AYAR22: '22 Ayar Altın',
  AYAR14: '14 Ayar Altın',
  GRAM: 'Gram Altın',
  CEYREK: 'Çeyrek Altın',
  YARIM: 'Yarım Altın',
  ATA: 'Ata Lira',
  GUMUSTRY: 'Gümüş',
  default: 'Türk Lirası',
} as const;

export const DUMMY_QUICK_TRANSACTIONS = [
  { currency: 'USD', amount: 100, tryAmount: 4284.44 },
  { currency: 'EUR', amount: 50, tryAmount: 2514.48 },
  { currency: 'GRAM', amount: 10, tryAmount: 62117.30 },
];

export const getCurrencyIcon = (symbol: string): keyof typeof Ionicons.glyphMap => {
  const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    USD: 'logo-usd',
    EUR: 'logo-euro',
    AYAR22: 'ellipse',
    AYAR14: 'ellipse',
    GRAM: 'ellipse',
    CEYREK: 'ellipse',
    YARIM: 'ellipse',
    ATA: 'ellipse',
    GUMUSTRY: 'ellipse',
  };
  return iconMap[symbol] || 'ellipse';
};

export const getCurrencyColor = (symbol: string): string => {
  const colorMap: Record<string, string> = {
    USD: '#10B981',
    EUR: '#3B82F6',
    AYAR22: '#FFD700',
    AYAR14: '#FFD700',
    GRAM: '#FFD700',
    CEYREK: '#FFD700',
    YARIM: '#FFD700',
    ATA: '#FFD700',
    GUMUSTRY: '#C0C0C0',
  };
  return colorMap[symbol] || '#666';
};

