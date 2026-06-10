import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { EventItem } from '../../types';

const { width } = Dimensions.get('window');

interface EventCardProps {
  event: EventItem;
  isFavorite?: boolean;
  onPress: () => void;
  onFavoritePress?: () => void;
  onBookingPress?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  isFavorite = false,
  onPress,
  onFavoritePress,
  onBookingPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.imageContainer}>
        <Image source={{ uri: event.image }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.content}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.title} numberOfLines={1}>
            {event.title}
          </Text>
        </TouchableOpacity>

        <View style={styles.infoRow}>
          <Feather name="calendar" size={12} color="#78716c" />
          <Text style={styles.infoText}>{event.date}</Text>
        </View>

        <View style={styles.infoRow}>
          <Feather name="map-pin" size={12} color="#78716c" />
          <Text style={styles.infoText}>{event.location}</Text>
        </View>

        <Text style={styles.organizer}>{event.organizer}</Text>
        <Text style={styles.price}>{event.price}</Text>

        <View style={styles.ratingRow}>
          <Feather name="star" size={14} color="#f59e0b" />
          <Text style={styles.rating}>{event.rating}</Text>
          <Text style={styles.reviewsCount}>({event.reviewsCount} avaliações)</Text>
        </View>
      </View>

      {onFavoritePress && (
        <TouchableOpacity style={styles.favoriteButton} onPress={onFavoritePress}>
          <Feather name="heart" size={18} color={isFavorite ? '#ef4444' : '#78716c'} />
        </TouchableOpacity>
      )}

      {onBookingPress && (
        <TouchableOpacity style={styles.bookingButton} onPress={onBookingPress}>
          <Text style={styles.bookingButtonText}>Participar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1c1917',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  infoText: {
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