import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { ASSETS } from '../../data';
import { useApp } from '../../context/AppContext';
import { User, UserRole } from '../../types';

// ⭐ URL DO BACKEND - ADICIONADO
const API_URL = 'http://192.168.56.1:8080';

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false); // ⭐ ADICIONADO para mostrar carregando
  const { setUser, showToast } = useApp();

  // ⭐ FUNÇÃO DE LOGIN TOTALMENTE REEscrita
  const handleLogin = async () => {
    console.log("handleLogin foi chamado!");

    if (!email) {
      setErrorMsg('Por favor, digite seu e-mail');
      return;
    }
    if (!password) {
      setErrorMsg('Por favor, digite sua senha');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMsg(errorData.message || 'E-mail ou senha inválidos');
        setLoading(false);
        return;
      }

      const data = await response.json();

      // Ajuste os campos conforme o retorno do seu backend
      const newUser: User = {
        id: data.user?.id || Math.random().toString(),
        email: data.user?.email || email,
        role: data.user?.role || 'tourist',
        name: data.user?.name || email.split('@')[0],
        avatarUrl: ASSETS.userProfile1,
      };

      setUser(newUser);
      showToast(`Bem-vindo, ${newUser.name}!`);

      if (newUser.role === 'administrador') {
        navigation.replace('AdminDashboard');
      } else if (newUser.role === 'empreendedor') {
        navigation.replace('BusinessDashboard');
      } else {
        navigation.replace('TouristHome');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setErrorMsg('Erro de conexão com o servidor. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  // ⭐ Função para login rápido (mantida para teste sem backend)
  const loginAsMockUser = (role: UserRole) => {
    let mockUser: User;
    if (role === 'administrador') {
      mockUser = {
        id: 'adm',
        email: 'lucio.botelho@adm.coastal.com',
        role: 'administrador',
        name: 'Lucio Botelho',
        avatarUrl: ASSETS.userProfileHeader,
      };
      setUser(mockUser);
      navigation.replace('AdminDashboard');
    } else if (role === 'empreendedor') {
      mockUser = {
        id: 'emp',
        email: 'barraca.ceuazul@gmail.com',
        role: 'empreendedor',
        name: 'Barraca Céu Azul',
        avatarUrl: ASSETS.barracaCeuAzulProfile,
      };
      setUser(mockUser);
      navigation.replace('BusinessDashboard');
    } else {
      mockUser = {
        id: 'tourist',
        email: 'wagner.moura@gmail.com',
        role: 'tourist',
        name: 'Wagner Moura',
        avatarUrl: ASSETS.userProfile1,
      };
      setUser(mockUser);
      navigation.replace('TouristHome');
    }
    showToast(`Login como ${mockUser.name}`);
  };

  return (
    <LinearGradient colors={['#4DA297', '#3b8278']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={16} color="#fff" />
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>

          <View style={styles.content}>
            <Text style={styles.title}>Bem-vindo de volta!</Text>
            <Text style={styles.subtitle}>Acesse sua conta para continuar</Text>

            {errorMsg ? (
              <View style={styles.errorContainer}>
                <Feather name="alert-triangle" size={16} color="#fca5a5" />
                <Text style={styles.errorText}>{errorMsg}</Text>
              </View>
            ) : null}

            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity 
  style={styles.loginButton} 
  onPress={() => {
    console.log("Botão clicado!");
    handleLogin();
  }}
  disabled={loading}
>
  <Text style={styles.loginButtonText}>
    {loading ? 'Entrando...' : 'Entrar'}
  </Text>
</TouchableOpacity>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={() => loginAsMockUser('tourist')}
            >
              <Text style={styles.googleButtonText}>Entrar com Google</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <TouchableOpacity onPress={() => Alert.alert('Info', 'Uma senha temporária foi enviada ao seu e-mail.')}>
                <Text style={styles.footerLink}>Esqueceu sua senha?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.footerLink}>Não possui cadastro?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 32,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(239,68,68,0.2)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#fecaca',
    fontSize: 12,
    flex: 1,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 16,
    color: '#1c1917',
  },
  loginButton: {
    backgroundColor: '#80d6d1',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#1c1917',
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  mockContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 12,
    marginTop: 24,
  },
  mockLabel: {
    color: '#dbf5f3',
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1,
  },
  mockButtons: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  mockButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  mockButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  googleButtonText: {
    color: '#78716c',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 32,
  },
  footerLink: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});