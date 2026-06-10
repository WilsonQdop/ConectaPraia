import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { ASSETS } from '../../data';

interface AdminDashboardScreenProps {
  navigation: any;
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({ navigation }) => {
  const { setUser, showToast } = useApp();
  const [showBugForm, setShowBugForm] = useState(false);
  const [bugDescription, setBugDescription] = useState('');

  const handleBugSubmit = () => {
    if (!bugDescription) return;
    setShowBugForm(false);
    setBugDescription('');
    showToast('Relatório de bug enviado aos engenheiros com sucesso!');
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
            showToast('Logout admin efetuado!');
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
          <Text style={styles.headerBadge}>Olá, Lucio!</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: ASSETS.userProfileHeader }} style={styles.avatar} />
          </View>
          <View>
            <Text style={styles.profileName}>Lucio Botelho</Text>
            <Text style={styles.profileRole}>(ADM)</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => showToast('Opção disponível no próximo ciclo de atualizações.')}
          >
            <Text style={styles.menuText}>Informações pessoais</Text>
            <Feather name="chevron-right" size={16} color="#78716c" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate('UserType');
              showToast('Escolha seu perfil de visualização!');
            }}
          >
            <Text style={styles.menuText}>Trocar conta</Text>
            <Feather name="chevron-right" size={16} color="#78716c" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setShowBugForm(true)}
          >
            <Text style={styles.menuText}>Relatar bug</Text>
            <Feather name="chevron-right" size={16} color="#78716c" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showBugForm} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalClose} onPress={() => setShowBugForm(false)}>
              <Feather name="x" size={20} color="#78716c" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Relatório de Bug</Text>

            <Text style={styles.modalLabel}>Descreva o problema encontrado:</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Descreva detalhadamente o comportamento inesperado na orla ou no sistema..."
              placeholderTextColor="#a8a29e"
              value={bugDescription}
              onChangeText={setBugDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <TouchableOpacity style={styles.modalButton} onPress={handleBugSubmit}>
              <Text style={styles.modalButtonText}>Enviar Relatório</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#e7e5e4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: '#a8a29e',
  },
  placeholder: {
    width: 36,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'rgba(255,255,255,0.4)',
    padding: 20,
    borderRadius: 24,
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e7e5e4',
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
  profileRole: {
    fontSize: 12,
    fontWeight: '800',
    color: '#4ea19b',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 2,
  },
  menuContainer: {
    gap: 12,
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e7e5e4',
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
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
  },
  modalClose: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1c1917',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#78716c',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  modalInput: {
    backgroundColor: '#f5f5f4',
    borderRadius: 12,
    padding: 12,
    fontSize: 12,
    color: '#1c1917',
    minHeight: 100,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#80d6d1',
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1c1917',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});