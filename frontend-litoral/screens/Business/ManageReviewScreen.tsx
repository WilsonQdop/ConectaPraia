import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';

interface ManageReviewsScreenProps {
  navigation: any;
}

export const ManageReviewsScreen: React.FC<ManageReviewsScreenProps> = ({ navigation }) => {
  const { reviews, deleteReview, showToast } = useApp();
  
  const businessReviews = reviews.filter(r => r.targetId === 's1');

  const handleDelete = (id: string, name: string) => {
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

  const renderReviewItem = ({ item }: { item: any }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewLeft}>
        <View style={styles.initialCircle}>
          <Text style={styles.initialText}>{item.userName.substring(0, 2)}</Text>
        </View>
        <View style={styles.ratingChip}>
          <Feather name="star" size={12} color="#f59e0b" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>

      <View style={styles.reviewContent}>
        <View style={styles.reviewHeader}>
          <Text style={styles.userName}>{item.userName}</Text>
          <TouchableOpacity onPress={() => handleDelete(item.id, item.userName)}>
            <Feather name="trash-2" size={16} color="#a8a29e" />
          </TouchableOpacity>
        </View>
        <Text style={styles.comment}>"{item.comment}"</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={20} color="#1c1917" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Avaliações</Text>
        <View style={styles.placeholder} />
      </View>

      {businessReviews.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="file-text" size={40} color="#d6d3d1" />
          <Text style={styles.emptyTitle}>Sem avaliações recebidas</Text>
          <Text style={styles.emptySubtitle}>As avaliações dos clientes da praia aparecerão aqui.</Text>
        </View>
      ) : (
        <FlatList
          data={businessReviews}
          keyExtractor={(item) => item.id}
          renderItem={renderReviewItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f4',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1c1917',
    textTransform: 'uppercase',
  },
  placeholder: {
    width: 36,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  reviewCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  reviewLeft: {
    alignItems: 'center',
    gap: 6,
  },
  initialCircle: {
    width: 48,
    height: 56,
    backgroundColor: '#e6f7f5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#4ea19b',
    textTransform: 'uppercase',
  },
  ratingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#fffbeb',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 50,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1c1917',
  },
  reviewContent: {
    flex: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1c1917',
  },
  comment: {
    fontSize: 11,
    color: '#78716c',
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 24,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1c1917',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#78716c',
    textAlign: 'center',
    marginTop: 4,
  },
});