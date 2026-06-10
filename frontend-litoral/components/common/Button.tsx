import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const getButtonStyles = (): ViewStyle => {
    let baseStyle: ViewStyle = {};
    
    switch (variant) {
      case 'primary':
        baseStyle = styles.primary;
        break;
      case 'secondary':
        baseStyle = styles.secondary;
        break;
      case 'danger':
        baseStyle = styles.danger;
        break;
      case 'outline':
        baseStyle = styles.outline;
        break;
    }
    
    switch (size) {
      case 'small':
        return { ...baseStyle, ...styles.small };
      case 'large':
        return { ...baseStyle, ...styles.large };
      default:
        return { ...baseStyle, ...styles.medium };
    }
  };

  const getTextStyles = (): TextStyle => {
    let baseStyle: TextStyle = {};
    
    switch (variant) {
      case 'primary':
        baseStyle = styles.primaryText;
        break;
      case 'secondary':
        baseStyle = styles.secondaryText;
        break;
      case 'danger':
        baseStyle = styles.dangerText;
        break;
      case 'outline':
        baseStyle = styles.outlineText;
        break;
    }
    
    switch (size) {
      case 'small':
        return { ...baseStyle, ...styles.smallText };
      case 'large':
        return { ...baseStyle, ...styles.largeText };
      default:
        return { ...baseStyle, ...styles.mediumText };
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <Text style={[getTextStyles(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primary: {
    backgroundColor: '#80d6d1',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: '#4ea19b',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  danger: {
    backgroundColor: '#ef4444',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#80d6d1',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  primaryText: {
    color: '#1c1917',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  secondaryText: {
    color: '#fff',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dangerText: {
    color: '#fff',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  outlineText: {
    color: '#80d6d1',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  smallText: {
    fontSize: 10,
  },
  mediumText: {
    fontSize: 12,
  },
  largeText: {
    fontSize: 14,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;