import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { ASSETS } from '../../data';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, setUser, bookings, showToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');

  const handleUpdateName = () => {
    if (editName.trim()) {
      setUser({ ...user!, name: editName });
      setIsEditing(false);
      showToast('Nome atualizado!');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          onPress: () => {
            setUser(null);
            navigation.replace('Welcome');
            showToast('Logged out cleanly!');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={20} color="#1c1917" />
          </TouchableOpacity>
          <Text style={styles.headerGreeting}>Olá, {user?.name}!</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user?.avatarUrl || ASSETS.userProfile1 }} style={styles.avatar} />
          </View>
          {isEditing ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.editInput}
                value={editName}
                onChangeText={setEditName}
                placeholder="Digite seu nome"
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleUpdateName}>
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.profileName}>{user?.name}</Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
            </>
          )}
        </View>

        <View style={styles.menuContainer}>
          {!isEditing && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.menuText}>Alterar Nome</Text>
              <Feather name="chevron-right" size={16} color="#78716c" />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate('UserType');
              showToast('Redirecionado para seleção de perfil!');
            }}
          >
            <Text style={styles.menuText}>Trocar de Perfil</Text>
            <Feather name="chevron-right" size={16} color="#78716c" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('TouristReservations')}
          >
            <Text style={styles.menuText}>Meus Agendamentos ({bookings.length})</Text>
            <Feather name="chevron-right" size={16} color="#78716c" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="log-out" size={16} color="#fff" />
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3E9',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerGreeting: {
    fontSize: 12,
    fontWeight: '700',
    color: '#a8a29e',
  },
  placeholder: {
    width: 36,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: 24,
    borderRadius: 24,
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#80d6d1',
    marginBottom: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1c1917',
  },
  profileEmail: {
    fontSize: 12,
    color: '#78716c',
    marginTop: 4,
  },
  editContainer: {
    alignItems: 'center',
    width: '100%',
  },
  editInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1917',
    width: '100%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e7e5e4',
  },
  saveButton: {
    backgroundColor: '#80d6d1',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 50,
  },
  saveButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1c1917',
    textTransform: 'uppercase',
  },
  menuContainer: {
    gap: 12,
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  menuText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1c1917',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: 120,
    alignSelf: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});