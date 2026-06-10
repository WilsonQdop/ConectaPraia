import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';

interface TouristReservationsScreenProps {
  navigation: any;
}

export const TouristReservationsScreen: React.FC<TouristReservationsScreenProps> = ({ navigation }) => {
  const { bookings, removeBooking, showToast } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('Todas');

  const filters = ['Todas', 'Restaurantes', 'Bares', 'Autônomos'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={20} color="#1c1917" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meus Agendamentos</Text>
        <View style={styles.placeholder} />
      </View>

      <Text style={styles.title}>Confira seus agendamentos</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterChip, selectedFilter === filter && styles.filterChipActive]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[styles.filterText, selectedFilter === filter && styles.filterTextActive]}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.bookingsList}>
        {bookings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Feather name="calendar" size={40} color="#d6d3d1" />
            <Text style={styles.emptyTitle}>Nenhum agendamento ativo</Text>
            <Text style={styles.emptySubtitle}>Que tal explorar novas atividades na praia agora mesmo?</Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('TouristExplore')}
            >
              <Text style={styles.emptyButtonText}>Explorar Eventos</Text>
            </TouchableOpacity>
          </View>
        ) : (
          bookings.map(booking => (
            <View key={booking.id} style={styles.bookingCard}>
              <View style={styles.bookingIcon}>
                <Feather name="calendar" size={24} color="#4ea19b" />
              </View>

              <View style={styles.bookingContent}>
                <View style={styles.bookingHeader}>
                  <View>
                    <Text style={styles.bookingTitle}>{booking.title}</Text>
                    <View style={styles.bookingInfo}>
                      <Feather name="calendar" size={12} color="#78716c" />
                      <Text style={styles.bookingInfoText}>{booking.date}</Text>
                    </View>
                    <View style={styles.bookingInfo}>
                      <Feather name="map-pin" size={12} color="#78716c" />
                      <Text style={styles.bookingInfoText}>{booking.location}</Text>
                    </View>
                  </View>

                  <View style={styles.bookingStatus}>
                    <Text style={styles.statusBadge}>Confirmado</Text>
                    <TouchableOpacity onPress={() => {
                      removeBooking(booking.id);
                      showToast('Agendamento cancelado com sucesso.');
                    }}>
                      <Text style={styles.cancelText}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.bookingFooter}>
                  <Text style={styles.organizer}>{booking.organizer}</Text>
                  <Text style={styles.price}>{booking.price}</Text>
                  <View style={styles.ratingRow}>
                    <Feather name="star" size={12} color="#f59e0b" />
                    <Text style={styles.rating}>{booking.rating}</Text>
                    <Text style={styles.reviewsCount}>({booking.reviewsCount} avaliações)</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.mapButton}
                    onPress={() => {
                      navigation.navigate('TouristHome');
                      showToast(`Localizando ${booking.title} no mapa real da orla!`);
                    }}
                  >
                    <Text style={styles.mapButtonText}>Localizar no Mapa</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
    paddingHorizontal: 16,
    paddingTop: 50,
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
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#a8a29e',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  placeholder: {
    width: 36,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1c1917',
    marginBottom: 16,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: '#fff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e7e5e4',
  },
  filterChipActive: {
    backgroundColor: '#4ea19b',
    borderColor: '#4ea19b',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#78716c',
  },
  filterTextActive: {
    color: '#fff',
  },
  bookingsList: {
    paddingBottom: 2000,
  },
  emptyContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1c1917',
    marginTop: 12,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#78716c',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyButton: {
    backgroundColor: '#80d6d1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  emptyButtonText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1c1917',
    textTransform: 'uppercase',
  },
  bookingCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  bookingIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#e6f7f5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingContent: {
    flex: 1,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookingTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1c1917',
  },
  bookingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  bookingInfoText: {
    fontSize: 10,
    color: '#78716c',
    fontWeight: '600',
  },
  bookingStatus: {
    alignItems: 'flex-end',
    gap: 4,
  },
  statusBadge: {
    fontSize: 10,
    backgroundColor: '#d1fae5',
    color: '#065f46',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 50,
    overflow: 'hidden',
    fontWeight: '700',
  },
  cancelText: {
    fontSize: 9,
    color: '#ef4444',
    fontWeight: '700',
  },
  bookingFooter: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f4',
    borderStyle: 'dashed',
  },
  organizer: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1c1917',
  },
  price: {
    fontSize: 10,
    color: '#78716c',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  rating: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1c1917',
  },
  reviewsCount: {
    fontSize: 9,
    color: '#4ea19b',
  },
  mapButton: {
    backgroundColor: '#80d6d1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  mapButtonText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#1c1917',
  },
});