/**
 * Color definitions for the application
 * Organized by semantic meaning and usage
 */

const tintColorLight = '#22C55E';
const tintColorDark = '#22C55E';

// Theme-aware colors (light/dark mode)
export const Colors = {
  light: {
    text: '#11181C',
    background: '#FFFFFF',
    card: 'rgba(0, 0, 0, 0.02)',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    borderColor: 'rgba(0,0,0,0.1)',
    placeholderColor: 'rgba(0,0,0,0.4)',
  },
  dark: {
    text: '#ECEDEE',
    background: '#08080f',
    card: 'rgba(255, 255, 255, 0.05)',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    borderColor: 'rgba(255,255,255,0.1)',
    placeholderColor: 'rgba(255,255,255,0.4)',
  },
} as const;

// Semantic Colors (Error, Success, Warning)
export const SemanticColors = {
  error: '#EF4444',
  errorBackground: 'rgba(239, 68, 68, 0.1)',
  success: '#22C55E',
  successBackground: 'rgba(34, 197, 94, 0.1)',
  warning: '#F59E0B',
  warningBackground: '#FEF3C7',
  warningBackgroundLight: 'rgba(245, 158, 11, 0.1)',
} as const;

// Overlay & Border Colors
export const OverlayColors = {
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.1)',
  overlayLighter: 'rgba(0, 0, 0, 0.05)',
  overlayLightest: 'rgba(0, 0, 0, 0.02)',
  overlayVeryLight: 'rgba(0, 0, 0, 0.03)',
  overlayBorder: 'rgba(0, 0, 0, 0.08)',
  overlayBorderLight: 'rgba(0, 0, 0, 0.12)',
  overlayDark: 'rgba(255, 255, 255, 0.1)',
  overlayDarkMedium: 'rgba(255, 255, 255, 0.15)',
  overlayDarkLight: 'rgba(255, 255, 255, 0.05)',
  overlayText: 'rgba(226, 232, 240, 0.9)',
  overlayTextLight: 'rgba(255, 255, 255, 0.4)',
} as const;

// Currency/Coin Colors
export const CurrencyColors = {
  // Crypto
  BTC: '#F7931A',
  ETH: '#627EEA',
  SOL: '#9945FF',
  DOGE: '#C2A633',
  BNB: '#F3BA2F',
  ADA: '#0033AD',
  XRP: '#23292F',
  // Fiat
  USD: '#10B981',
  EUR: '#3B82F6',
  // Precious Metals
  GOLD22: '#FF7A00',
  GOLD14: '#FFCC33',
  GOLD: '#FFE700',
  SILVER: '#C0C0C0',
  // Default
  default: '#666',
} as const;

// Icon & Text Colors
export const IconColors = {
  gray: '#9BA1A6',
  grayLight: '#687076',
  white: '#FFFFFF',
  black: '#000000',
  darkGray: '#333',
  mediumGray: '#666',
  switchGray: '#767577',
} as const;

// Background Colors
export const BackgroundColors = {
  dark: '#1a1a1a',
  veryDark: '#111111',
  darkGray: '#2a2a2a',
  lightGray: '#f0f0f0',
  white: '#FFFFFF',
} as const;

