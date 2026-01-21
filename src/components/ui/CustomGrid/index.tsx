import React, { useMemo,useState } from 'react';
import { ActivityIndicator, FlatList, Pressable,View } from 'react-native';
import { EmptyState } from '@/components/ui/EmptyState';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { CustomGridProps, IColumn } from '@/types';
import { styles } from './styles';

export function CustomGrid({
  gridKey,
  data,
  columns,
  loading = false,
  emptyMessage = 'Veri bulunamadı',
  renderRowActions,
  style,
  headerStyle,
  rowStyle,
  cellStyle,
  tab,
  tabConfig,
}: CustomGridProps) {
  const [activeTab, setActiveTab] = useState<string>(
    tab && tabConfig ? (tabConfig.defaultTab || tabConfig.tabs[0]?.value || '') : ''
  );

  const filteredData = useMemo(() => {
    if (!tab || !tabConfig || !activeTab) return data;
    return data.filter((row) => row[tabConfig.type] === activeTab);
  }, [data, tab, tabConfig, activeTab]);

  const renderHeader = () => {
    return (
      <View style={[styles.tableHeader, headerStyle]}>
        {columns?.map((column, index) => {
          const columnWidth = column.addition?.width || 'auto';
          const align = column.addition?.align || 'center';
          const columnKey = getColumnKey(column);

          return (
            <View
              key={`${gridKey}-header-${columnKey}-${index}`}
              style={[
                styles.headerCell,
                typeof columnWidth === 'number' ? { width: columnWidth } : { flex: 1 },
                align === 'left' && styles.alignLeft,
                align === 'right' && styles.alignRight,
              ]}
            >
              <ThemedText style={styles.headerText}>{column.caption}</ThemedText>
            </View>
          );
        })}
        {renderRowActions && (
          <View style={[styles.headerCell, styles.actionHeaderCell]}>
            <ThemedText style={styles.headerText}>İşlem</ThemedText>
          </View>
        )}
      </View>
    );
  };

  const parseDataField = (dataField: string | string[]): string[] => {
    if (Array.isArray(dataField)) {
      return dataField;
    }
    if (typeof dataField === 'string' && (dataField.includes(' + ') || dataField.includes('+'))) {
      return dataField.split(/\s*\+\s*/).map(field => field.trim()).filter(Boolean);
    }
    return [dataField];
  };

  const getCellValue = (column: IColumn, row: any): any => {
    const fields = parseDataField(column.dataField);

    if (fields.length > 1) {
      const separator = column.addition?.separator || ' ';
      return fields
        .map((field) => {
          const fieldValue = row[field];
          return fieldValue !== null && fieldValue !== undefined ? String(fieldValue) : '';
        })
        .filter(Boolean)
        .join(separator);
    }
    return row[fields[0]];
  };

  const getColumnKey = (column: IColumn): string => {
    const fields = parseDataField(column.dataField);
    return fields.join('-');
  };

  const renderCell = (column: IColumn, value: any, row: any, rowIndex: number) => {
    const columnWidth = column.addition?.width || 'auto';
    const align = column.addition?.align || 'center';
    const columnKey = getColumnKey(column);

    if (column.addition?.renderCell) {
      return (
        <View
          key={`${gridKey}-cell-${columnKey}-${rowIndex}`}
          style={[
            styles.tableCell,
            typeof columnWidth === 'number' ? { width: columnWidth } : { flex: 1 },
            align === 'left' && styles.alignLeft,
            align === 'right' && styles.alignRight,
            cellStyle,
          ]}
        >
          {column.addition.renderCell(value, row, rowIndex)}
        </View>
      );
    }

    return (
      <View
        key={`${gridKey}-cell-${columnKey}-${rowIndex}`}
        style={[
          styles.tableCell,
          typeof columnWidth === 'number' ? { width: columnWidth } : { flex: 1 },
          align === 'left' && styles.alignLeft,
          align === 'right' && styles.alignRight,
          cellStyle,
        ]}
      >
        <ThemedText style={styles.cellText} numberOfLines={1} ellipsizeMode="tail">
          {value !== null && value !== undefined ? String(value) : '-'}
        </ThemedText>
      </View>
    );
  };

  const renderRow = ({ item, index }: { item: any; index: number }) => {
    return (
      <ThemedView
        card
        style={[styles.tableRow, index === filteredData.length - 1 && styles.tableRowNoBorder, rowStyle]}
      >
        {columns.map((column) => {
          const value = getCellValue(column, item);
          return renderCell(column, value, item, index);
        })}
        {renderRowActions && (
          <View style={[styles.tableCell, styles.actionCell]}>
            {renderRowActions(item, index)}
          </View>
        )}
      </ThemedView>
    );
  };

  const renderTabs = () => {
    if (!tab || !tabConfig) return null;

    return (
      <View style={styles.tabsContainer}>
        {tabConfig.tabs.map((tabItem, index) => {
          const isActive = activeTab === tabItem.value;
          const isFirst = index === 0;
          const isLast = index === tabConfig.tabs.length - 1;

          return (
            <Pressable
              key={`${gridKey}-tab-${tabItem.value}`}
              style={[
                styles.tab,
                isActive && styles.activeTab,
                isFirst && styles.leftTab,
                isLast && styles.rightTab,
              ]}
              onPress={() => setActiveTab(tabItem.value)}
            >
              <ThemedText style={[styles.tabText, isActive && styles.activeTabText]}>
                {tabItem.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" />
          <ThemedText style={styles.loadingText}>Yükleniyor...</ThemedText>
        </View>
      );
    }

    return <EmptyState message={emptyMessage} />;
  };

  return (
    <View style={[styles.container, style]}>
      {renderTabs()}
      {renderHeader()}
      <FlatList
        data={filteredData}
        renderItem={renderRow}
        keyExtractor={(item, index) => `${gridKey}-row-${index}`}
        ListEmptyComponent={renderEmpty}
        scrollEnabled={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={10}
      />
    </View>
  );
}

