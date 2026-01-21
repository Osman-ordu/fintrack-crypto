import React from 'react';
import { Pressable, View } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ITabsProps } from '@/types';
import { ThemedText } from '../ThemedText';
import { styles } from './styles';

export function Tabs({ tabs, defaultTab, onTabChange }: ITabsProps) {
  const [activeTab, setActiveTab] = React.useState<string>(
    defaultTab || tabs[0]?.value || ''
  );
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'card');

  const handleTabPress = (value: string) => {
    setActiveTab(value);
    onTabChange?.(value);
  };

  const activeContent = tabs.find((tab) => tab.value === activeTab)?.content;

  return (
    <View style={styles.container}>
      <View style={[styles.tabsContainer, { backgroundColor: backgroundColor + '20' }]}>
        {tabs?.map((tab, index) => {
          const isActive = activeTab === tab.value;
          const isFirst = index === 0;
          const isLast = index === tabs.length - 1;

          return (
            <Pressable
              key={tab.value}
              style={[
                styles.tab,
                isActive && [styles.activeTab, { backgroundColor: textColor + '15' }],
                isFirst && styles.leftTab,
                isLast && styles.rightTab,
              ]}
              onPress={() => handleTabPress(tab.value)}
            >
              <ThemedText
                style={[
                  styles.tabText,
                  { color: isActive ? textColor : textColor + '70' },
                  isActive && styles.activeTabText,
                ]}
              >
                {tab.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.contentContainer}>{activeContent}</View>
    </View>
  );
}

