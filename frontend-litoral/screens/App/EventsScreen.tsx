import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  RefreshControl,
  TextStyle,
  ViewStyle,
  SafeAreaView,
} from 'react-native';
import { EventCard } from '../../components';
import { Colors, Spacing, Typography, BorderRadius } from '../../styles/themes';

// ─── Tipos ───────────────────────────────────────────────────────────────────

export type EventCategory = 'Todas' | 'Ciclismo' | 'Corrida' | 'Caminhada' | 'Surf' | 'Música';

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  category: EventCategory;
  emoji?: string;
  imageUrl?: string;
  description?: string;
  priceInfo?: string;
  rating?: number;
  reviewCount?: string;
}

// ─── Mock (substitua por fetch real) ─────────────────────────────────────────

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Aula de Surf',
    date: '25/05 - 05h',
    location: 'Gaibu',
    category: 'Surf',
    emoji: '🏄',
    description: 'Surf estilo de vida',
    priceInfo: 'R$ 80 (aula + prancha)',
    rating: 4.8,
    reviewCount: '230 avaliações',
  },
  {
    id: '2',
    title: 'Festival de Música',
    date: '15 a 20/05 - 17h',
    location: 'Porto de Galinhas',
    category: 'Música',
    emoji: '🎸',
    priceInfo: 'Entrada gratuita',
    reviewCount: '2.5k interessados',
  },
  {
    id: '3',
    title: 'Trilha em Gaibu',
    date: '30/05 - 05h',
    location: 'Gaibu',
    category: 'Caminhada',
    emoji: '🚴',
    description: 'Ponto de encontro: Arcomix.\nDestino: Bica do ferrugem',
    priceInfo: '🏷️ Guia R$15',
    rating: 4.91,
    reviewCount: '126 avaliações',
  },
  {
    id: '4',
    title: 'Aulão Fitdance',
    date: '23/05 - 08h',
    location: 'Orla de Boa Viagem',
    category: 'Corrida',
    emoji: '💃',
    priceInfo: 'Aula gratuita',
    rating: 4.95,
    reviewCount: '98 avaliações',
  },
  {
    id: '5',
    title: 'Pedal Noturno',
    date: '28/05 - 20h',
    location: 'Recife Antigo',
    category: 'Ciclismo',
    emoji: '🚲',
    description: 'Percurso de 20km pelas orlas',
    priceInfo: 'Gratuito',
    rating: 4.7,
    reviewCount: '85 avaliações',
  },
];

const CATEGORIES: EventCategory[] = ['Todas', 'Ciclismo', 'Corrida', 'Caminhada', 'Surf', 'Música'];

// ─── Fetch (troque pelo endpoint real) ───────────────────────────────────────

async function fetchEvents(category: EventCategory): Promise<Event[]> {
  // TODO: substituir por chamada real, ex:
  // const res = await fetch(`https://sua-api.com/events?category=${category}`);
  // return res.json();
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(category === 'Todas'
        ? MOCK_EVENTS
        : MOCK_EVENTS.filter((e) => e.category === category)
      );
    }, 600)
  );
}

// ─── Componente ──────────────────────────────────────────────────────────────

interface EventsScreenProps {
  navigation?: any;
  userAvatar?: string;
}

const EventsScreen: React.FC<EventsScreenProps> = ({ navigation, userAvatar }) => {
  const [activeCategory, setActiveCategory] = useState<EventCategory>('Todas');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = useCallback(async (category: EventCategory) => {
    try {
      setError(null);
      const data = await fetchEvents(category);
      setEvents(data);
    } catch {
      setError('Não foi possível carregar os eventos. Tente novamente.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    loadEvents(activeCategory);
  }, [activeCategory, loadEvents]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadEvents(activeCategory);
  };

  const handleCategoryPress = (category: EventCategory) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
      setLoading(true);
    }
  };

  const handleParticipate = (event: Event) => {
    // TODO: navigation?.navigate('EventDetail', { eventId: event.id });
    console.log('Participar de:', event.title);
  };

  const renderCategory = ({ item }: { item: EventCategory }) => {
    const isActive = item === activeCategory;
    return (
      <TouchableOpacity
        style={[styles.categoryChip, isActive && styles.categoryChipActive]}
        onPress={() => handleCategoryPress(item)}
        activeOpacity={0.75}
      >
        <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderEvent = ({ item }: { item: Event }) => (
    <EventCard
      title={item.title}
      date={item.date}
      location={item.location}
      emoji={item.emoji}
      imageUrl={item.imageUrl}
      description={item.description}
      priceInfo={item.priceInfo}
      rating={item.rating}
      reviewCount={item.reviewCount}
      onParticipate={() => handleParticipate(item)}
      onPress={() => handleParticipate(item)}
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>🏖️</Text>
      <Text style={styles.emptyTitle}>Nenhum evento encontrado</Text>
      <Text style={styles.emptySubtitle}>
        Não há eventos em "{activeCategory}" por enquanto.
      </Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>⚠️</Text>
      <Text style={styles.emptyTitle}>Algo deu errado</Text>
      <Text style={styles.emptySubtitle}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={() => loadEvents(activeCategory)}>
        <Text style={styles.retryText}>Tentar novamente</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, styles.tabActive]}>
            <Text style={[styles.tabText, styles.tabTextActive]}>Eventos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => navigation?.navigate('Services')}>
            <Text style={styles.tabText}>Serviços</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          {userAvatar ? (
            <Image source={{ uri: userAvatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarInitial}>U</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Participe dos nossos eventos</Text>

      {/* Filtros */}
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={renderCategory}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
        style={styles.categoriesList}
      />

      {/* Lista de eventos */}
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : error ? (
        renderError()
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={renderEvent}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[Colors.primary]}
              tintColor={Colors.primary}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  } as ViewStyle,
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  } as ViewStyle,
  backButton: {
    padding: 4,
    marginRight: Spacing.sm,
  } as ViewStyle,
  backIcon: {
    fontSize: 22,
    color: Colors.text,
    fontWeight: '600',
  } as TextStyle,
  tabs: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#E8EAF0',
    borderRadius: 20,
    padding: 3,
    marginHorizontal: Spacing.sm,
  } as ViewStyle,
  tab: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 18,
  } as ViewStyle,
  tabActive: {
    backgroundColor: Colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  } as ViewStyle,
  tabText: {
    ...Typography.fontSize.small,
    color: Colors.textLight,
    ...Typography.fontWeight.medium,
  } as TextStyle,
  tabTextActive: {
    color: Colors.text,
    ...Typography.fontWeight.bold,
  } as TextStyle,
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  avatarInitial: {
    color: Colors.white,
    ...Typography.fontWeight.bold,
    ...Typography.fontSize.medium,
  } as TextStyle,
  sectionTitle: {
    ...Typography.fontSize.extraLarge,
    ...Typography.fontWeight.bold,
    color: Colors.text,
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  } as TextStyle,
  categoriesList: {
    maxHeight: 46,
    marginBottom: Spacing.md,
  },
  categoriesContainer: {
    paddingHorizontal: Spacing.md,
    gap: 8,
  } as ViewStyle,
  categoryChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  } as ViewStyle,
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  } as ViewStyle,
  categoryText: {
    ...Typography.fontSize.small,
    ...Typography.fontWeight.medium,
    color: Colors.text,
  } as TextStyle,
  categoryTextActive: {
    color: Colors.white,
    ...Typography.fontWeight.bold,
  } as TextStyle,
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
    flexGrow: 1,
  } as ViewStyle,
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing.xl * 2,
    paddingHorizontal: Spacing.xl,
  } as ViewStyle,
  emptyEmoji: {
    fontSize: 48,
    marginBottom: Spacing.md,
  } as TextStyle,
  emptyTitle: {
    ...Typography.fontSize.large,
    ...Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  } as TextStyle,
  emptySubtitle: {
    ...Typography.fontSize.medium,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 22,
  } as TextStyle,
  retryButton: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  } as ViewStyle,
  retryText: {
    color: Colors.white,
    ...Typography.fontWeight.bold,
    ...Typography.fontSize.medium,
  } as TextStyle,
});

export default EventsScreen;