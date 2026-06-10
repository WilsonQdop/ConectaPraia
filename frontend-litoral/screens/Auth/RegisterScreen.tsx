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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';

const API_URL = 'http://192.168.56.1:8080';

interface RegisterScreenProps {
  navigation: any;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('TOURIST'); // ⭐ NOVO: role
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useApp();

  const handleRegister = async () => {
    if (!name) {
      setErrorMsg('Por favor, digite seu nome');
      return;
    }
    if (!email) {
      setErrorMsg('Por favor, digite seu e-mail');
      return;
    }
    if (!cpf) {
      setErrorMsg('Por favor, digite seu CPF');
      return;
    }
    if (!phone) {
      setErrorMsg('Por favor, digite seu telefone');
      return;
    }
    if (!password) {
      setErrorMsg('Por favor, digite sua senha');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('As senhas não coincidem');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          cpf: cpf,
          phone: phone,
          password: password,
          role: role, // ⭐ ENVIA O ROLE SELECIONADO
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMsg(errorData.message || 'Erro ao cadastrar');
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log('Cadastro realizado:', data);
      
      showToast('Cadastro realizado com sucesso! Faça login.');
      navigation.replace('Login');
      
    } catch (error) {
      console.error('Erro na requisição:', error);
      setErrorMsg('Erro de conexão com o servidor. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#fff', '#f5f5f4']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={16} color="#1c1917" />
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>

          <View style={styles.content}>
            <Text style={styles.title}>Crie uma conta</Text>
            <Text style={styles.subtitle}>
              Insira seus dados e escolha seu tipo de conta.
            </Text>

            {errorMsg ? (
              <View style={styles.errorContainer}>
                <Feather name="alert-triangle" size={16} color="#dc2626" />
                <Text style={styles.errorText}>{errorMsg}</Text>
              </View>
            ) : null}

            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              placeholderTextColor="#a8a29e"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#a8a29e"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="CPF (apenas números)"
              placeholderTextColor="#a8a29e"
              value={cpf}
              onChangeText={setCpf}
              keyboardType="numeric"
              maxLength={11}
            />

            <TextInput
              style={styles.input}
              placeholder="Telefone (com DDD)"
              placeholderTextColor="#a8a29e"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <TextInput
              style={styles.input}
              placeholder="Senha (mínimo 6 caracteres)"
              placeholderTextColor="#a8a29e"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TextInput
              style={styles.input}
              placeholder="Confirme sua senha"
              placeholderTextColor="#a8a29e"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            {/* ⭐ SEÇÃO DE ESCOLHA DO TIPO DE CONTA */}
            <Text style={styles.roleLabel}>Tipo de conta:</Text>
            <View style={styles.roleContainer}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === 'TURISTA' && styles.roleButtonActive
                ]}
                onPress={() => setRole('TURISTA')}
              >
                <Feather name="user" size={20} color={role === 'TURISTA' ? '#fff' : '#4ea19b'} />
                <Text style={[
                  styles.roleButtonText,
                  role === 'TURISTA' && styles.roleButtonTextActive
                ]}>
                  Turista
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === 'EMPREENDEDOR' && styles.roleButtonActive
                ]}
                onPress={() => setRole('EMPREENDEDOR')}
              >
                <Feather name="briefcase" size={20} color={role === 'EMPREENDEDOR' ? '#fff' : '#4ea19b'} />
                <Text style={[
                  styles.roleButtonText,
                  role === 'EMPREENDEDOR' && styles.roleButtonTextActive
                ]}>
                  Empreendedor
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === 'ADMIN' && styles.roleButtonActive
                ]}
                onPress={() => setRole('ADMIN')}
              >
                <Feather name="shield" size={20} color={role === 'ADMIN' ? '#fff' : '#4ea19b'} />
                <Text style={[
                  styles.roleButtonText,
                  role === 'ADMIN' && styles.roleButtonTextActive
                ]}>
                  Administrador
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.registerButton} 
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.registerButtonText}>
                {loading ? 'Cadastrando...' : 'Cadastrar-se'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Já possuo cadastro</Text>
            </TouchableOpacity>
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
    backgroundColor: '#e7e5e4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#1c1917',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1c1917',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#78716c',
    textAlign: 'center',
    marginBottom: 32,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 12,
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 16,
    color: '#1c1917',
    borderWidth: 1,
    borderColor: '#e7e5e4',
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1c1917',
    marginBottom: 8,
    marginTop: 8,
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#f5f5f4',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e7e5e4',
  },
  roleButtonActive: {
    backgroundColor: '#4ea19b',
    borderColor: '#4ea19b',
  },
  roleButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4ea19b',
  },
  roleButtonTextActive: {
    color: '#fff',
  },
  registerButton: {
    backgroundColor: '#80d6d1',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  registerButtonText: {
    color: '#1c1917',
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  loginLink: {
    fontSize: 12,
    color: '#4ea19b',
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
});