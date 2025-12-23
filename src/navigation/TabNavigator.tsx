import React from 'react';
import { StyleSheet,TouchableOpacity, View } from 'react-native';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui';
import { useTheme as useAppTheme } from '@/contexts/ThemeContext';
import { HomeScreen } from '@/feautures/home';
import { PortfolioScreen } from '@/feautures/portfolio';
import { ProfileScreen } from '@/feautures/profile';
import { TabParamList } from '@/types';
import MarketStack from './stacks/MarketStack';

const Tab = createBottomTabNavigator<TabParamList>();

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const theme = useTheme();
  const { colorScheme } = useAppTheme();
  const borderColor = colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
  const inactiveTextColor = colorScheme === 'dark' ? '#9BA1A6' : '#687076';
  const activeColor = colorScheme === 'dark' ? '#fff' : '#333';

  if (!navigation || !state || !descriptors) {
    return null;
  }

  return (
    <View
      style={[
        styles.tabBarContainer,
        {
          backgroundColor: theme.colors.background,
          borderTopColor: borderColor,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          if (!navigation) return;
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            try {
              navigation.navigate(route.name as never);
            } catch (error) {
              // Navigation not ready, ignore
            }
          }
        };

        const onLongPress = () => {
          if (!navigation) return;
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';
        if (route.name === 'Home') {
          iconName = isFocused ? 'home' : 'home-outline';
        } else if (route.name === 'Market') {
          iconName = isFocused ? 'trending-up' : 'trending-up-outline';
        } else if (route.name === 'Portfolio') {
          iconName = isFocused ? 'pie-chart' : 'pie-chart-outline';
        } else if (route.name === 'Profile') {
          iconName = isFocused ? 'person' : 'person-outline';
        }

        const iconColor = isFocused ? activeColor : inactiveTextColor;
        const textColor = isFocused ? activeColor : inactiveTextColor;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            {isFocused && (
              <View
                style={[
                  styles.activeBorder,
                  {
                    backgroundColor: activeColor,
                  },
                ]}
              />
            )}
            <Ionicons name={iconName} size={24} color={iconColor} />
            <ThemedText
              style={[
                styles.tabLabel,
                {
                  color: textColor,
                  fontWeight: isFocused ? '600' : '500',
                },
              ]}
            >
              {label}
            </ThemedText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: 70,
    borderTopWidth: 0.5,
    paddingBottom: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeBorder: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 0.5,
  },
  tabLabel: {
    fontSize: 12,
  },
});

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Market" component={MarketStack} />
      <Tab.Screen name="Portfolio" component={PortfolioScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
