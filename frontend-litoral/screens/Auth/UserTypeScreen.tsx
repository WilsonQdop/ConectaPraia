import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../../context/AppContext';
import { ASSETS } from '../../data';
import { User } from '../../types/user';

interface UserTypeScreenProps {
  navigation: any;
}

export const UserTypeScreen: React.FC<UserTypeScreenProps> = ({ navigation }) => {
  const { setUser, showToast } = useApp();

  const selectRole = (role: 'tourist' | 'empreendedor' | 'administrador') => {
    let newUser: User;

    switch (role) {
      case 'administrador':
        newUser = {
          id: 'adm_user',
          email: 'lucio.botelho@adm.coastal.com',
          role: 'administrador',
          name: 'Lucio Botelho',
          avatarUrl: ASSETS.userProfileHeader,
        };
        setUser(newUser);
        showToast('Login como Administrador');
        navigation.replace('AdminDashboard');
        break;
      case 'empreendedor':
        newUser = {
          id: 'emp_user',
          email: 'barraca.ceuazul@gmail.com',
          role: 'empreendedor',
          name: 'Barraca Céu Azul',
          avatarUrl: ASSETS.barracaCeuAzulProfile,
        };
        setUser(newUser);
        showToast('Login como Empreendedor');
        navigation.replace('BusinessDashboard');
        break;
      default:
        newUser = {
          id: 'tour_user',
          email: 'wagner.moura@gmail.com',
          role: 'tourist',
          name: 'Wagner Moura',
          avatarUrl: ASSETS.userProfile1,
        };
        setUser(newUser);
        showToast('Login como Turista');
        navigation.replace('TouristHome');
    }
  };

  return (
    <ImageBackground
      source={{ uri: ASSETS.heroWelcome }}
      style={styles.background}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.5)']}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>VOCÊ É?</Text>

            <TouchableOpacity
              style={[styles.button, styles.touristButton]}
              onPress={() => selectRole('tourist')}
              activeOpacity={0.8}
            >
              <Text style={styles.touristButtonText}>Turista / Conector</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.businessButton]}
              onPress={() => selectRole('empreendedor')}
              activeOpacity={0.8}
            >
              <Text style={styles.businessButtonText}>Empreendedor / Parceiro</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.adminButton]}
              onPress={() => selectRole('administrador')}
              activeOpacity={0.8}
            >
              <Text style={styles.adminButtonText}>Administrador Geral</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 32,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#4ea19b',
    marginBottom: 32,
    letterSpacing: 2,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  touristButton: {
    backgroundColor: '#80d6d1',
  },
  touristButtonText: {
    color: '#1c1917',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  businessButton: {
    backgroundColor: '#4ea19b',
  },
  businessButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  adminButton: {
    backgroundColor: '#f5f5f4',
    borderWidth: 1,
    borderColor: '#e7e5e4',
  },
  adminButtonText: {
    color: '#1c1917',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});