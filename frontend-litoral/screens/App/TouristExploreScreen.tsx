import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { EventItem, ServiceItem, Booking } from '../../types';

interface TouristExploreScreenProps {
  navigation: any;
}

type ExploreView = 'eventos' | 'servicos';

export const TouristExploreScreen: React.FC<TouristExploreScreenProps> = ({ navigation }) => {
  const { events, services, bookings, addBooking, showToast } = useApp();
  const [exploreView, setExploreView] = useState<ExploreView>('eventos');
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['e1', 's1']);
  const [selectedEventCategory, setSelectedEventCategory] = useState('Todas');
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('Todas');

  const toggleFavorite = (id: string) => {
    if (favoriteIds.includes(id)) {
      setFavoriteIds(favoriteIds.filter(favId => favId !== id));
      showToast('Removido dos favoritos');
    } else {
      setFavoriteIds([...favoriteIds, id]);
      showToast('Adicionado aos favoritos!');
    }
  };

  const handleBookingClick = (item: EventItem | ServiceItem, type: 'event' | 'service') => {
    const isAlreadyBooked = bookings.some(b => b.itemId === item.id && b.itemType === type);

    if (isAlreadyBooked) {
      showToast('Você já possui agendamento para este item!');
      return;
    }

    const newBooking: Booking = {
      id: Math.random().toString(),
      itemId: item.id,
      itemType: type,
      title: item.title,
      date: item.date,
      location: item.location,
      organizer: item.organizer,
      price: item.price,
      rating: item.rating,
      reviewsCount: item.reviewsCount,
      icon: type === 'event' ? 'calendar_today' : 'restaurant',
      status: 'confirmed',
    };

    addBooking(newBooking);
    showToast('Inscrição / Reserva efetuada com sucesso!');
  };

  const eventCategories = ['Todas', 'Surf', 'Música', 'Caminhada'];
  const serviceCategories = ['Todas', 'Restaurantes', 'Bares', 'Autônomos'];

  const filteredEvents = events.filter(e => {
    const matchesCategory = selectedEventCategory === 'Todas' || e.category === selectedEventCategory;
    return matchesCategory;
  });

  const filteredServices = services.filter(s => {
    const matchesCategory = selectedServiceCategory === 'Todas' || s.category === selectedServiceCategory;
    return matchesCategory;
  });

  const renderEventItem = ({ item }: { item: EventItem }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardImage}
        onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.cardContent}>
        <TouchableOpacity onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}>
          <Text style={styles.cardTitle}>{item.title}</Text>
        </TouchableOpacity>

        <View style={styles.cardInfo}>
          <Feather name="calendar" size={12} color="#78716c" />
          <Text style={styles.cardInfoText}>{item.date}</Text>
        </View>

        <View style={styles.cardInfo}>
          <Feather name="map-pin" size={12} color="#78716c" />
          <Text style={styles.cardInfoText}>{item.location}</Text>
        </View>

        <Text style={styles.organizer}>{item.organizer}</Text>
        <Text style={styles.price}>{item.price}</Text>

        <View style={styles.ratingRow}>
          <Feather name="star" size={12} color="#f59e0b" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviewsCount}>({item.reviewsCount} avaliações)</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(item.id)}>
        <Feather name="heart" size={16} color={favoriteIds.includes(item.id) ? '#ef4444' : '#78716c'} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.bookingButton} onPress={() => handleBookingClick(item, 'event')}>
        <Text style={styles.bookingButtonText}>Participar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderServiceItem = ({ item }: { item: ServiceItem }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardImageService}
        onPress={() => navigation.navigate('ServiceDetail', { serviceId: item.id })}
      >
        <Image source={{ uri: item.image }} style={styles.serviceImage} />
      </TouchableOpacity>

      <View style={styles.cardContent}>
        <TouchableOpacity onPress={() => navigation.navigate('ServiceDetail', { serviceId: item.id })}>
          <Text style={styles.cardTitle}>{item.title}</Text>
        </TouchableOpacity>

        <View style={styles.cardInfo}>
          <Feather name="clock" size={12} color="#78716c" />
          <Text style={styles.cardInfoText}>{item.date}</Text>
        </View>

        <View style={styles.cardInfo}>
          <Feather name="map-pin" size={12} color="#78716c" />
          <Text style={styles.cardInfoText}>{item.location}</Text>
        </View>

        <Text style={styles.organizer}>{item.organizer}</Text>
        <Text style={styles.price}>{item.price}</Text>

        <View style={styles.ratingRow}>
          <Feather name="star" size={12} color="#f59e0b" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviewsCount}>({item.reviewsCount} avaliações)</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(item.id)}>
        <Feather name="heart" size={16} color={favoriteIds.includes(item.id) ? '#ef4444' : '#78716c'} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.bookingButton} onPress={() => handleBookingClick(item, 'service')}>
        <Text style={styles.bookingButtonText}>Reservar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={20} color="#1c1917" />
        </TouchableOpacity>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, exploreView === 'eventos' && styles.toggleActive]}
            onPress={() => setExploreView('eventos')}
          >
            <Text style={[styles.toggleText, exploreView === 'eventos' && styles.toggleTextActive]}>Eventos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, exploreView === 'servicos' && styles.toggleActive]}
            onPress={() => setExploreView('servicos')}
          >
            <Text style={[styles.toggleText, exploreView === 'servicos' && styles.toggleTextActive]}>Serviços</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileButton}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' }} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>
        {exploreView === 'eventos' ? 'Participe dos nossos eventos' : 'Participe dos nossos serviços'}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {(exploreView === 'eventos' ? eventCategories : serviceCategories).map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryChip,
              (exploreView === 'eventos' ? selectedEventCategory === cat : selectedServiceCategory === cat) && styles.categoryChipActive
            ]}
            onPress={() => {
              if (exploreView === 'eventos') {
                setSelectedEventCategory(cat);
              } else {
                setSelectedServiceCategory(cat);
              }
            }}
          >
            <Text style={[
              styles.categoryText,
              (exploreView === 'eventos' ? selectedEventCategory === cat : selectedServiceCategory === cat) && styles.categoryTextActive
            ]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={exploreView === 'eventos' ? filteredEvents : filteredServices}
        keyExtractor={(item) => item.id}
        renderItem={exploreView === 'eventos' ? renderEventItem : renderServiceItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
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
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#e7e5e4',
    borderRadius: 50,
    padding: 4,
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 50,
  },
  toggleActive: {
    backgroundColor: '#80d6d1',
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#78716c',
    textTransform: 'uppercase',
  },
  toggleTextActive: {
    color: '#1c1917',
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#80d6d1',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1c1917',
    marginBottom: 16,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 50,
    backgroundColor: '#fff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e7e5e4',
  },
  categoryChipActive: {
    backgroundColor: '#80d6d1',
    borderColor: '#80d6d1',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#78716c',
  },
  categoryTextActive: {
    color: '#1c1917',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
  },
  cardImageService: {
    width: 64,
    height: 64,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: '#e6f7f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  serviceImage: {
    width: 48,
    height: 48,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1c1917',
    marginBottom: 4,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  cardInfoText: {
    fontSize: 10,
    color: '#78716c',
    fontWeight: '600',
  },
  organizer: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1c1917',
    marginTop: 4,
  },
  price: {
    fontSize: 10,
    color: '#4ea19b',
    fontWeight: '700',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f4',
  },
  rating: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1c1917',
  },
  reviewsCount: {
    fontSize: 9,
    color: '#4ea19b',
    fontWeight: '700',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#f5f5f4',
    padding: 6,
    borderRadius: 20,
  },
  bookingButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#80d6d1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  bookingButtonText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1c1917',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});