import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { ASSETS } from '../../data';

const { width, height } = Dimensions.get('window');

interface TouristHomeScreenProps {
  navigation: any;
}

type NavTab = 'home' | 'search' | 'reservations' | 'explore';

export const TouristHomeScreen: React.FC<TouristHomeScreenProps> = ({ navigation }) => {
  const { showToast, user } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  const handleNavPress = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === 'reservations') navigation.navigate('TouristReservations');
    if (tab === 'explore') navigation.navigate('TouristExplore');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: ASSETS.mapSearchBackground }}
        style={styles.mapBackground}
        imageStyle={{ resizeMode: 'cover' }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.searchBar}>
            <Feather name="search" size={16} color="#78716c" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar na praia..."
              placeholderTextColor="#a8a29e"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Avatar / botão de perfil */}
          <TouchableOpacity
            style={styles.avatarButton}
            onPress={() => navigation.navigate('Profile')}
          >
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitial}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Pins no mapa */}
        <View style={styles.pinsContainer}>
          <TouchableOpacity
            style={[styles.pin, { top: '20%', left: '55%' }]}
            onPress={() => {
              navigation.navigate('EventDetail', { eventId: 'e2' });
              showToast('Aberto Festival de Música no Enotel');
            }}
          >
            <View style={styles.pinLabel}>
              <Text style={styles.pinLabelText}>Enotel Porto de Galinhas</Text>
            </View>
            <View style={[styles.pinDot, { backgroundColor: '#ec4899' }]} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.pin, { top: '45%', left: '62%' }]}
            onPress={() => {
              navigation.navigate('ServiceDetail', { serviceId: 's2' });
              showToast('Aberto Muqueca Baiana no OrlaBar!');
            }}
          >
            <View style={styles.pinLabel}>
              <Text style={styles.pinLabelText}>Ruda Boutique Hotel</Text>
            </View>
            <View style={[styles.pinDot, { backgroundColor: '#ec4899' }]} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.pin, { top: '70%', left: '45%' }]}
            onPress={() => {
              navigation.navigate('EventDetail', { eventId: 'e1' });
              showToast('Aberta Aula de Surf na praia!');
            }}
          >
            <View style={styles.pinLabel}>
              <Text style={styles.pinLabelText}>Porto de Galinhas</Text>
            </View>
            <View style={[styles.pinDot, { backgroundColor: '#10b981' }]} />
          </TouchableOpacity>
        </View>

        {/* Barra de navegação inferior */}
        <View style={styles.bottomNav}>

          {/* Reservas */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => handleNavPress('reservations')}
          >
            <Feather
              name="calendar"
              size={22}
              color={activeTab === 'reservations' ? '#10b981' : '#78716c'}
            />
          </TouchableOpacity>

          {/* Explorar */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => handleNavPress('explore')}
          >
            <Feather
              name="grid"
              size={22}
              color={activeTab === 'explore' ? '#10b981' : '#78716c'}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  // ── Header ──────────────────────────────────────────────────
  header: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    zIndex: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#1c1917',
  },
  avatarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#80d6d1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },

  // ── Pins ────────────────────────────────────────────────────
  pinsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  pin: {
    position: 'absolute',
    alignItems: 'center',
  },
  pinLabel: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  pinLabelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#db2777',
  },
  pinDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 3,
    borderColor: '#fff',
  },

  // ── Bottom Drawer ────────────────────────────────────────────
  bottomDrawer: {
    position: 'absolute',
    bottom: 96,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  drawerHandle: {
    width: 48,
    height: 4,
    backgroundColor: '#e5e5e5',
    borderRadius: 2,
    alignSelf: 'center',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1c1917',
  },
  locationSubtitle: {
    fontSize: 10,
    color: '#78716c',
  },
  quickCards: {
    flexDirection: 'row',
    gap: 8,
  },
  quickCard: {
    flex: 1,
    backgroundColor: '#f5f5f4',
    padding: 12,
    borderRadius: 12,
  },
  quickCardTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1c1917',
  },
  quickCardPrice: {
    fontSize: 9,
    color: '#4ea19b',
    fontWeight: '700',
    marginTop: 4,
  },

  // ── Bottom Nav ───────────────────────────────────────────────
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
    backgroundColor: 'rgba(255,255,255,0.97)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  navIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconActive: {
    backgroundColor: '#10b981',
  },
});