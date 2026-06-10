export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  UserType: undefined;
  TuristaRegister: undefined;
  TuristaPersonalData: undefined;
  TouristHome: undefined;
  TouristExplore: undefined;
  TouristReservations: undefined;
  Profile: undefined;
  EventDetail: { eventId: string };
  ServiceDetail: { serviceId: string };
  BusinessDashboard: undefined;
  ManageReviews: undefined;
  AdminDashboard: undefined;
};

export type UserRole = 'tourist' | 'empreendedor' | 'administrador';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatarUrl?: string;
  phone?: string;
  document?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  targetId: string;
  targetType: 'event' | 'service';
  createdAt?: string;
}

export interface EventItem {
  id: string;
  title: string;
  icon: string;
  date: string;
  location: string;
  organizer: string;
  price: string;
  rating: number;
  reviewsCount: number;
  image: string;
  category: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  date: string;
  timeRange?: string;
  location: string;
  organizer: string;
  price: string;
  rating: number;
  reviewsCount: number;
  image: string;
  category: string;
  description: string;
}

export interface Booking {
  id: string;
  itemId: string;
  itemType: 'event' | 'service';
  title: string;
  date: string;
  location: string;
  organizer: string;
  price: string;
  rating: number;
  reviewsCount: number;
  icon: string;
  status?: 'confirmed' | 'pending' | 'cancelled';
}