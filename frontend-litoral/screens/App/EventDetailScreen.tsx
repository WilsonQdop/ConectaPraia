import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { ASSETS } from '../../data';
import { Booking } from '../../types';

interface EventDetailScreenProps {
  navigation: any;
  route: any;
}

export const EventDetailScreen: React.FC<EventDetailScreenProps> = ({ navigation, route }) => {
  const { eventId } = route.params;
  const { events, bookings, addBooking, showToast } = useApp();
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['e1']);
  
  const event = events.find(e => e.id === eventId) || events[0];

  const toggleFavorite = () => {
    if (favoriteIds.includes(event.id)) {
      setFavoriteIds(favoriteIds.filter(id => id !== event.id));
      showToast('Removido dos favoritos');
    } else {
      setFavoriteIds([...favoriteIds, event.id]);
      showToast('Adicionado aos favoritos!');
    }
  };

  const handleBooking = () => {
    const isAlreadyBooked = bookings.some(b => b.itemId === event.id && b.itemType === 'event');

    if (isAlreadyBooked) {
      showToast('Você já possui agendamento para este item!');
      return;
    }

    const newBooking: Booking = {
      id: Math.random().toString(),
      itemId: event.id,
      itemType: 'event',
      title: event.title,
      date: event.date,
      location: event.location,
      organizer: event.organizer,
      price: event.price,
      rating: event.rating,
      reviewsCount: event.reviewsCount,
      icon: 'calendar_today',
      status: 'confirmed',
    };

    addBooking(newBooking);
    showToast('Inscrição efetuada com sucesso!');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: ASSETS.mapDetailSurf }} style={styles.headerImage}>
        <View style={styles.headerOverlay}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Feather name="arrow-left" size={20} color="#1c1917" />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton} onPress={() => showToast('Link de compartilhamento copiado!')}>
              <Feather name="share-2" size={18} color="#1c1917" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={toggleFavorite}>
              <Feather name="heart" size={18} color={favoriteIds.includes(event.id) ? '#ef4444' : '#1c1917'} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.pinContainer}>
          <View style={styles.pinBadge}>
            <Text style={styles.pinBadgeText}>{event.title}</Text>
          </View>
          <View style={styles.pinDot} />
        </View>
      </ImageBackground>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.handle} />
        <Text style={styles.eventTitle}>{event.title}</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Local</Text>
            <Text style={styles.infoValue}>{event.location}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Data</Text>
            <Text style={styles.infoValue}>{event.date}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Valor</Text>
            <Text style={styles.priceValue}>{event.price}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Descrição</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.ratingContainer}>
            <Text style={styles.infoLabel}>Nota da Atividade</Text>
            <View style={styles.ratingBadge}>
              <Feather name="star" size={14} color="#f59e0b" />
              <Text style={styles.ratingValue}>{event.rating}</Text>
              <Text style={styles.ratingCount}>({event.reviewsCount} votos)</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.bookingButton} onPress={handleBooking}>
            <Feather name="bell" size={16} color="#1c1917" />
            <Text style={styles.bookingButtonText}>Inscrever</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ratingButton}>
            <Feather name="star" size={16} color="#78716c" />
            <Text style={styles.ratingButtonText}>Avaliar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f5f0',
  },
  headerImage: {
    height: 280,
    width: '100%',
  },
  headerOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: 'center',
  },
  pinBadge: {
    backgroundColor: '#006a66',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 50,
    marginBottom: 4,
  },
  pinBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  pinDot: {
    width: 14,
    height: 14,
    backgroundColor: '#006a66',
    transform: [{ rotate: '45deg' }],
    borderWidth: 2,
    borderColor: '#fff',
  },
  content: {
    flex: 1,
    marginTop: -32,
    backgroundColor: '#f8f5f0',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
  },
  handle: {
    width: 48,
    height: 6,
    backgroundColor: '#d6d3d1',
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 16,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1c1917',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#f5f5f4',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    marginBottom: 24,
  },
  infoRow: {
    gap: 4,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#605e58',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1c1917',
  },
  divider: {
    height: 1,
    backgroundColor: '#e7e5e4',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#4ea19b',
    backgroundColor: '#e6f7f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  description: {
    fontSize: 12,
    color: '#78716c',
    lineHeight: 18,
  },
  ratingContainer: {
    alignItems: 'center',
    gap: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 50,
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1c1917',
  },
  ratingCount: {
    fontSize: 10,
    color: '#78716c',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  bookingButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#80d6d1',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  bookingButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1c1917',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  ratingButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#e7e5e4',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ratingButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1c1917',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});