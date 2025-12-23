import React from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

const AnimatedView = Animated.createAnimatedComponent(View);

type NavItem = {
  name: string;
  route: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
};

const navItems: NavItem[] = [
  { name: 'index', route: '/(tabs)/', label: 'Home', icon: 'home-outline', iconActive: 'home' },
  { name: 'markets', route: '/(tabs)/markets', label: 'Markets', icon: 'trending-up-outline', iconActive: 'trending-up' },
  { name: 'watchlist', route: '/(tabs)/watchlist', label: 'Watchlist', icon: 'star-outline', iconActive: 'star' },
  { name: 'alerts', route: '/(tabs)/alerts', label: 'Alerts', icon: 'notifications-outline', iconActive: 'notifications' },
];

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
      light: '#1A202C', // Beyaz background üzerinde daha belirgin
      dark: '#CBD5E0', // Daha belirgin renk
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

  React.useEffect(() => {
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

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          paddingBottom: Math.max(insets.bottom, 8),
          borderTopColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
        },
      ]}
    >
      <AnimatedView
        style={[
          styles.indicator,
          {
            backgroundColor: activeColor,
            width: width / navItems.length,
          },
          indicatorStyle,
        ]}
      />
      <View style={styles.navContainer}>
        {navItems.map((item, index) => {
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
                  style={[
                    styles.activeBorder,
                    {
                      backgroundColor: activeColor,
                    },
                  ]}
                />
              )}
              <Ionicons
                name={iconName}
                size={24}
                color={itemColor}
                style={styles.icon}
              />
              <ThemedText
                style={[
                  styles.navText,
                  {
                    color: itemColor,
                  },
                ]}
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

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0.5,
  },
  navContainer: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 8, // Indicator için yer - artırıldı
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
  },
  activeBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#22C55E',
  },
  icon: {
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    height: 1.5,
    borderRadius: 0.75,
  },
});

