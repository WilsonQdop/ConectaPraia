import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Booking, Review, EventItem, ServiceItem } from '../types';
import { INITIAL_EVENTS, INITIAL_SERVICES, INITIAL_REVIEWS } from '../data';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  events: EventItem[];
  setEvents: (events: EventItem[]) => void;
  services: ServiceItem[];
  setServices: (services: ServiceItem[]) => void;
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  removeBooking: (id: string) => void;
  addReview: (review: Review) => void;
  deleteReview: (id: string) => void;
  showToast: (message: string) => void;
  toastMessage: string;
  clearToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [toastMessage, setToastMessage] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'b1',
      itemId: 's1',
      itemType: 'service',
      title: 'Peixada do Nê',
      date: '10/08 - 20h',
      location: 'Cupe',
      organizer: 'Barraca Céu Azul',
      price: '15% de desconto na primeira compra',
      rating: 4.8,
      reviewsCount: 200,
      icon: 'restaurant',
      status: 'confirmed',
    },
    {
      id: 'b2',
      itemId: 'e2',
      itemType: 'event',
      title: 'Festival de Música',
      date: '15 a 20/05 - 19h',
      location: 'Porto de Galinhas',
      organizer: 'Prefeitura Municipal',
      price: 'Entrada gratuita',
      rating: 4.9,
      reviewsCount: 2300,
      icon: 'music_note',
      status: 'confirmed',
    }
  ]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  const clearToast = () => {
    setToastMessage('');
  };

  const addBooking = (newBooking: Booking) => {
    setBookings(prev => [{ ...newBooking, status: 'confirmed' }, ...prev]);
  };

  const removeBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const addReview = (newReview: Review) => {
    setReviews(prev => [{ ...newReview, createdAt: new Date().toISOString() }, ...prev]);

    if (newReview.targetType === 'event') {
      setEvents(prevEvents =>
        prevEvents.map(evt => {
          if (evt.id === newReview.targetId) {
            const newCount = evt.reviewsCount + 1;
            const newAvg = Number(((evt.rating * evt.reviewsCount + newReview.rating) / newCount).toFixed(2));
            return { ...evt, rating: newAvg, reviewsCount: newCount };
          }
          return evt;
        })
      );
    } else {
      setServices(prevServices =>
        prevServices.map(srv => {
          if (srv.id === newReview.targetId) {
            const newCount = srv.reviewsCount + 1;
            const newAvg = Number(((srv.rating * srv.reviewsCount + newReview.rating) / newCount).toFixed(2));
            return { ...srv, rating: newAvg, reviewsCount: newCount };
          }
          return srv;
        })
      );
    }
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        events,
        setEvents,
        services,
        setServices,
        reviews,
        setReviews,
        bookings,
        addBooking,
        removeBooking,
        addReview,
        deleteReview,
        showToast,
        toastMessage,
        clearToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};