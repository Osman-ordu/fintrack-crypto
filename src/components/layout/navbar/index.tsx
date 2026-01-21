import React, { useEffect } from 'react';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { NAVBAR_COLORS } from '@/constants/navbar';
import { navItems } from '@/db';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors } from '@/theme';
import { getDynamicStyles,styles } from './styles';

const AnimatedView = Animated.createAnimatedComponent(View);

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const backgroundColor = useThemeColor({}, 'background');
  const activeColor = Colors[colorScheme ?? 'light'].tint;
  const inactiveColor = useThemeColor(
    {
      light: NAVBAR_COLORS.inactiveIcon.light,
      dark: NAVBAR_COLORS.inactiveIcon.dark,
    },
    'icon'
  );

  const getActiveIndex = () => {
    if (pathname === '/(tabs)/' || pathname === '/(tabs)') return 0;
    if (pathname?.includes('/markets')) return 1;
    if (pathname?.includes('/watchlist')) return 2;
    if (pathname?.includes('/alerts')) return 3;
    return 0;
  };

  const activeIndex = useSharedValue(getActiveIndex());

  useEffect(() => {
    activeIndex.value = withSpring(getActiveIndex());
  }, [pathname]);

  const indicatorStyle = useAnimatedStyle(() => {
    const itemWidth = width / navItems.length;
    return {
      transform: [{ translateX: activeIndex.value * itemWidth }],
    };
  });

  const handlePress = (route: string) => {
    router.push(route as any);
  };

  const dynamicStyles = getDynamicStyles();

  return (
    <View
      style={[
        styles.container,
        dynamicStyles.container(backgroundColor, insets.bottom, colorScheme),
      ]}
    >
      <AnimatedView
        style={[
          styles.indicator,
          dynamicStyles.indicator(activeColor, width / navItems.length),
          indicatorStyle,
        ]}
      />
      <View style={styles.navContainer}>
        {navItems?.map((item) => {
          let isActive = false;
          if (item.name === 'index') {
            isActive = pathname === '/(tabs)/' || pathname === '/(tabs)';
          } else {
            isActive = pathname?.includes(item.name);
          }
          const itemColor = isActive ? activeColor : inactiveColor;
          const iconName = isActive ? item.iconActive : item.icon;

          return (
            <TouchableOpacity
              key={item.name}
              style={styles.navItem}
              onPress={() => handlePress(item.route)}
              activeOpacity={0.7}
            >
              {isActive && (
                <View
                  style={[styles.activeBorder, dynamicStyles.activeBorder(activeColor)]}
                />
              )}
              <Ionicons
                name={iconName}
                size={24}
                color={itemColor}
                style={styles.icon}
              />
              <ThemedText
                style={[styles.navText, dynamicStyles.navText(itemColor)]}
              >
                {item.label}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
