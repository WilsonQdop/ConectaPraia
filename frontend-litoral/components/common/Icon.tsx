import React from 'react';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color = '#1c1917' }) => {
  // Mapeamento dos ícones do lucide para @expo/vector-icons
  const iconMap: Record<string, { family: string; name: string }> = {
    'arrow-left': { family: 'Feather', name: 'arrow-left' },
    'user': { family: 'Feather', name: 'user' },
    'help-circle': { family: 'Feather', name: 'help-circle' },
    'log-out': { family: 'Feather', name: 'log-out' },
    'check': { family: 'Feather', name: 'check' },
    'chevron-right': { family: 'Feather', name: 'chevron-right' },
    'check-circle-2': { family: 'Feather', name: 'check-circle' },
    'star': { family: 'Feather', name: 'star' },
    'file-text': { family: 'Feather', name: 'file-text' },
    'alert-triangle': { family: 'Feather', name: 'alert-triangle' },
    'trash-2': { family: 'Feather', name: 'trash-2' },
    'shield-alert': { family: 'Feather', name: 'shield' },
    'heart': { family: 'Feather', name: 'heart' },
    'calendar': { family: 'Feather', name: 'calendar' },
    'smartphone': { family: 'Feather', name: 'smartphone' },
    'map-pin': { family: 'Feather', name: 'map-pin' },
    'share-2': { family: 'Feather', name: 'share-2' },
    'clock': { family: 'Feather', name: 'clock' },
    'search': { family: 'Feather', name: 'search' },
    'sliders-horizontal': { family: 'Feather', name: 'sliders' },
    'bell': { family: 'Feather', name: 'bell' },
    'message-square': { family: 'Feather', name: 'message-square' },
    'plus': { family: 'Feather', name: 'plus' },
    'x': { family: 'Feather', name: 'x' },
    'compass': { family: 'Feather', name: 'compass' },
  };

  const mapping = iconMap[name] || { family: 'Feather', name: 'help-circle' };

  if (mapping.family === 'Feather') {
    return <Feather name={mapping.name as any} size={size} color={color} />;
  } else if (mapping.family === 'MaterialIcons') {
    return <MaterialIcons name={mapping.name as any} size={size} color={color} />;
  } else {
    return <Ionicons name={mapping.name as any} size={size} color={color} />;
  }
};