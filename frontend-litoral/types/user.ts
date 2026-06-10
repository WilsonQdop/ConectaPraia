export interface UserProfile {
  id: string;
  name: string;
  profilePicture: string; // URL ou caminho para asset local
  type: 'turista' | 'empreendedor' | 'adm';
  
  // Campos específicos para Empreendedor
  businessName?: string;
  profileRating?: number;
  reviewCount?: number; // Total de avaliações para o perfil
  dailyReviews?: number; // Avaliações do dia
  postedServices?: number;
  reportsReceived?: number;

  // Campos específicos para ADM (se houver, além dos itens de menu)
  // ...
}

export interface ProfileMenuItemType {
  label: string;
  icon?: string; // Nome do ícone ou caminho para asset
  onPress: () => void;
}
