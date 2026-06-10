import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  onPress?: () => void;
  buttonText?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  onPress,
  buttonText,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.valueContainer}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={styles.value}>{value}</Text>
      </View>
      {onPress && buttonText && (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CBCBC1',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 125,
  },
  title: {
    fontSize: 10,
    fontWeight: '800',
    color: '#44403c',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 8,
  },
  iconContainer: {
    marginRight: 4,
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1c1917',
  },
  button: {
    backgroundColor: '#A9A9A0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1c1917',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default MetricCard;