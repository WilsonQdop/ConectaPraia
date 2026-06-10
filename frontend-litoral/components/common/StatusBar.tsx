import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface StatusBarProps {
  backgroundColor?: string;
  textColor?: string;
  showTime?: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({
  backgroundColor = 'transparent',
  textColor = '#1c1917',
  showTime = true,
}) => {
  const insets = useSafeAreaInsets();

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor }]}>
      {showTime && (
        <View style={styles.timeContainer}>
          <Text style={[styles.time, { color: textColor }]}>{getCurrentTime()}</Text>
        </View>
      )}
      <View style={styles.batteryContainer}>
        <View style={[styles.signalBar, { backgroundColor: textColor }]} />
        <View style={[styles.signalBar, { backgroundColor: textColor, height: 8 }]} />
        <View style={[styles.signalBar, { backgroundColor: textColor, height: 10 }]} />
        <View style={[styles.signalBar, { backgroundColor: textColor, height: 12 }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  timeContainer: {
    flex: 1,
  },
  time: {
    fontSize: 14,
    fontWeight: '600',
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  signalBar: {
    width: 3,
    height: 6,
    borderRadius: 1,
  },
});

export default StatusBar;