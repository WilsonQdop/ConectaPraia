import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { ASSETS } from '../../data';

const { width, height } = Dimensions.get('window');

interface TouristHomeScreenProps {
  navigation: any;
}

export const TouristHomeScreen: React.FC<TouristHomeScreenProps> = ({ navigation }) => {
  const { showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: ASSETS.mapSearchBackground }}
        style={styles.mapBackground}
        imageStyle={{ resizeMode: 'cover' }}
      >
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
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate('TouristExplore')}
          >
            <Feather name="sliders" size={18} color="#1c1917" />
          </TouchableOpacity>
        </View>

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

        <View style={styles.bottomDrawer}>
          <View style={styles.drawerHandle} />
          <View style={styles.locationInfo}>
            <Feather name="map-pin" size={20} color="#10b981" />
            <View>
              <Text style={styles.locationTitle}>Porto de Galinhas</Text>
              <Text style={styles.locationSubtitle}>Clique nos alfinetes no mapa para ver!</Text>
            </View>
          </View>

          <View style={styles.quickCards}>
            <TouchableOpacity
              style={styles.quickCard}
              onPress={() => navigation.navigate('EventDetail', { eventId: 'e1' })}
            >
              <Text style={styles.quickCardTitle}>🏄 Aula de Surf</Text>
              <Text style={styles.quickCardPrice}>R$ 80 + prancha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickCard}
              onPress={() => navigation.navigate('ServiceDetail', { serviceId: 's1' })}
            >
              <Text style={styles.quickCardTitle}>🐟 Peixada do Nê</Text>
              <Text style={styles.quickCardPrice}>Barraca Céu Azul</Text>
            </TouchableOpacity>
          </View>
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
  header: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    flexDirection: 'row',
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
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#80d6d1',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  bottomDrawer: {
    position: 'absolute',
    bottom: 80,
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
});