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

interface ServiceDetailScreenProps {
  navigation: any;
  route: any;
}

export const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({ navigation, route }) => {
  const { serviceId } = route.params;
  const { services, bookings, reviews, addBooking, showToast } = useApp();
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['s1']);
  
  const service = services.find(s => s.id === serviceId) || services[0];
  const serviceReviews = reviews.filter(r => r.targetId === service.id).slice(0, 3);

  const toggleFavorite = () => {
    if (favoriteIds.includes(service.id)) {
      setFavoriteIds(favoriteIds.filter(id => id !== service.id));
      showToast('Removido dos favoritos');
    } else {
      setFavoriteIds([...favoriteIds, service.id]);
      showToast('Adicionado aos favoritos!');
    }
  };

  const handleBooking = () => {
    const isAlreadyBooked = bookings.some(b => b.itemId === service.id && b.itemType === 'service');

    if (isAlreadyBooked) {
      showToast('Você já possui agendamento para este item!');
      return;
    }

    const newBooking: Booking = {
      id: Math.random().toString(),
      itemId: service.id,
      itemType: 'service',
      title: service.title,
      date: service.date,
      location: service.location,
      organizer: service.organizer,
      price: service.price,
      rating: service.rating,
      reviewsCount: service.reviewsCount,
      icon: 'restaurant',
      status: 'confirmed',
    };

    addBooking(newBooking);
    showToast('Reserva efetuada com sucesso!');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: ASSETS.mapDetailPeixada }} style={styles.headerImage}>
        <View style={styles.headerOverlay}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Feather name="arrow-left" size={20} color="#1c1917" />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton} onPress={() => showToast('Link de compartilhamento copiado!')}>
              <Feather name="share-2" size={18} color="#1c1917" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={toggleFavorite}>
              <Feather name="heart" size={18} color={favoriteIds.includes(service.id) ? '#ef4444' : '#1c1917'} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.pinContainer}>
          <View style={styles.pinBadge}>
            <Text style={styles.pinBadgeText}>{service.organizer}</Text>
          </View>
          <View style={styles.pinDot} />
        </View>
      </ImageBackground>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.handle} />
        <Text style={styles.serviceTitle}>{service.title}</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Parceiro / Fornecedor</Text>
            <Text style={styles.infoValue}>{service.organizer}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Local</Text>
            <Text style={styles.infoValue}>{service.location}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Horário</Text>
            <Text style={styles.infoValue}>{service.date}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Descrição & Oferta</Text>
            <Text style={styles.description}>{service.description}</Text>
            <Text style={styles.priceValue}>{service.price}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.ratingContainer}>
            <Text style={styles.infoLabel}>Avaliações</Text>
            <View style={styles.ratingBadge}>
              <Feather name="star" size={14} color="#f59e0b" />
              <Text style={styles.ratingValue}>{service.rating}</Text>
              <Text style={styles.ratingCount}>({service.reviewsCount} votos)</Text>
            </View>

            {serviceReviews.length > 0 && (
              <View style={styles.reviewsList}>
                {serviceReviews.map(review => (
                  <View key={review.id} style={styles.reviewItem}>
                    <View style={styles.reviewHeader}>
                      <Text style={styles.reviewName}>{review.userName}</Text>
                      <View style={styles.reviewStars}>
                        <Feather name="star" size={10} color="#f59e0b" />
                        <Text style={styles.reviewRating}>{review.rating}</Text>
                      </View>
                    </View>
                    <Text style={styles.reviewComment}>"{review.comment}"</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.bookingButton} onPress={handleBooking}>
            <Feather name="calendar" size={16} color="#1c1917" />
            <Text style={styles.bookingButtonText}>Reservar</Text>
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
  serviceTitle: {
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
  description: {
    fontSize: 12,
    color: '#78716c',
    lineHeight: 18,
    marginBottom: 8,
  },
  priceValue: {
    fontSize: 12,
    fontWeight: '800',
    color: '#4ea19b',
    backgroundColor: '#e6f7f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  ratingContainer: {
    alignItems: 'center',
    gap: 12,
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
  reviewsList: {
    width: '100%',
    gap: 8,
    marginTop: 8,
  },
  reviewItem: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderRadius: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewName: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1c1917',
  },
  reviewStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  reviewRating: {
    fontSize: 9,
    fontWeight: '700',
    color: '#1c1917',
  },
  reviewComment: {
    fontSize: 10,
    color: '#78716c',
    fontStyle: 'italic',
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