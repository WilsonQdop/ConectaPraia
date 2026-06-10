import { TextStyle } from 'react-native';

// Definindo os tipos literais para fontWeight para evitar erro de 'string' genérica
type FontWeightType = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export const Typography = {
  fontFamily: 'System',
  fontSize: {
    small: { fontSize: 12 } as TextStyle,
    medium: { fontSize: 16 } as TextStyle,
    large: { fontSize: 20 } as TextStyle,
    extraLarge: { fontSize: 24 } as TextStyle,
  },
  fontWeight: {
    light: { fontWeight: '300' as FontWeightType } as TextStyle,
    regular: { fontWeight: '400' as FontWeightType } as TextStyle,
    medium: { fontWeight: '500' as FontWeightType } as TextStyle,
    bold: { fontWeight: '700' as FontWeightType } as TextStyle,
  },
};

export const Colors = {
  primary: '#007AFF',
  secondary: '#5AC8FA',
  background: '#FFFFFF',
  text: '#000000',
  textLight: '#666666',
  border: '#E0E0E0',
  error: '#FF3B30',
  success: '#34C759',
  buttonText: '#FFFFFF', // Adicionado para compatibilidade com o print do usuário
  white: '#FFFFFF',      // Adicionado para compatibilidade com o print do usuário
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

export const theme = {
  Typography,
  Colors,
  Spacing,
  BorderRadius,
};

