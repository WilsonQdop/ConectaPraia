import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface ProfileHeaderProps {
  name: string;
  role?: string;
  avatarUrl?: string;
  onBack?: () => void;
  showBack?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  role,
  avatarUrl,
  onBack,
  showBack = true,
}) => {
  return (
    <View style={styles.container}>
      {showBack && onBack && (
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Feather name="arrow-left" size={20} color="#1c1917" />
        </TouchableOpacity>
      )}
      
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          {role && <Text style={styles.role}>{role}</Text>}
        </View>
      </View>
      
      {showBack && <View style={styles.placeholder} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e7e5e4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    justifyContent: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#80d6d1',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1c1917',
  },
  role: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4ea19b',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 2,
  },
  placeholder: {
    width: 40,
  },
});

export default ProfileHeader;