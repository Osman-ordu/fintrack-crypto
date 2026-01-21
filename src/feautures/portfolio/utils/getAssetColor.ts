import { CurrencyColors } from '@/theme';

export const getAssetColor = (asset: string): string => {
  const normalized = asset.toUpperCase();

  if (normalized in CurrencyColors) {
    return CurrencyColors[normalized as keyof typeof CurrencyColors];
  }

  if (normalized.includes('AYAR22') || normalized.includes('XAU22') || normalized.includes('GOLD22')) {
    return CurrencyColors.GOLD22;
  }

  if (normalized.includes('AYAR14') || normalized.includes('XAU14') || normalized.includes('GOLD14')) {
    return CurrencyColors.GOLD14;
  }

  if (normalized.includes('XAU') || normalized.includes('GOLD') || normalized.includes('AYAR')) {
    return CurrencyColors.GOLD;
  }

  if (normalized.includes('XAG') || normalized.includes('SILVER')) {
    return CurrencyColors.SILVER;
  }

  return CurrencyColors.default;
};
