import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { ASSETS } from '../../data';

interface BusinessDashboardScreenProps {
  navigation: any;
}

export const BusinessDashboardScreen: React.FC<BusinessDashboardScreenProps> = ({ navigation }) => {
  const { user, setUser, reviews, deleteReview, services, showToast } = useApp();
  
  const businessReviews = reviews.filter(r => r.targetId === 's1');
  const totalRating = businessReviews.reduce((acc, curr) => acc + curr.rating, 0);
  const averageRating = businessReviews.length > 0 ? (totalRating / businessReviews.length).toFixed(1) : '4.8';
  const serviceCount = services.filter(s => s.organizer === user?.name).length || 1;

  const handleDeleteReview = (id: string, name: string) => {
    Alert.alert(
      'Excluir avaliação',
      `Tem certeza que deseja excluir a avaliação de ${name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            deleteReview(id);
            showToast('Avaliação excluída com sucesso!');
          },
        },
      ]
    );
  };

  const handleDeleteProfile = () => {
    Alert.alert(
      'Excluir perfil',
      'Tem certeza que deseja excluir seu perfil de parceiro da praia? Esta ação é irreversível.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setUser(null);
            navigation.replace('Welcome');
            showToast('Seu perfil foi removido com sucesso!');
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
          <Text style={styles.headerBadge}>Parceiro Oficial</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: ASSETS.barracaCeuAzulProfile }} style={styles.avatar} />
          </View>
          <View>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>Barraca Ativa</Text>
            </View>
            <Text style={styles.profileName}>Barraca Céu Azul</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Nota do perfil</Text>
            <View style={styles.statValueContainer}>
              <Feather name="star" size={32} color="#f59e0b" />
              <Text style={styles.statValue}>{averageRating}</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Avaliações do dia</Text>
            <Text style={styles.statNumber}>{businessReviews.length}</Text>
            <TouchableOpacity
              style={styles.statButton}
              onPress={() => navigation.navigate('ManageReviews')}
            >
              <Text style={styles.statButtonText}>Detalhes</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Serviços postados</Text>
            <Text style={styles.statNumber}>{serviceCount}</Text>
            <TouchableOpacity
              style={styles.statButton}
              onPress={() => showToast('Opção disponível apenas para parceiros premium de Porto')}
            >
              <Text style={styles.statButtonText}>Detalhes</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Denúncias</Text>
            <Text style={[styles.statNumber, styles.zeroNumber]}>0</Text>
            <TouchableOpacity
              style={styles.statButton}
              onPress={() => showToast('Tudo limpo! Sua barraca não possui denúncias.')}
            >
              <Text style={styles.statButtonText}>Detalhes</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteProfile}>
          <Text style={styles.deleteButtonText}>Excluir perfil</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4E8',
  },
  scrollContent: {
    paddingHorizontal: 20,
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
  },
  headerBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#a8a29e',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  placeholder: {
    width: 36,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  activeBadge: {
    backgroundColor: 'rgba(20,184,166,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  activeBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#4ea19b',
    textTransform: 'uppercase',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1c1917',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#CBCBC1',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#44403c',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1c1917',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1c1917',
    marginVertical: 8,
  },
  zeroNumber: {
    color: '#065f46',
  },
  statButton: {
    backgroundColor: '#A9A9A0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  statButtonText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1c1917',
    textTransform: 'uppercase',
  },
  deleteButton: {
    backgroundColor: '#e11d48',
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});