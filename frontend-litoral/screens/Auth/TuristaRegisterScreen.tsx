// screens/Auth/TuristaRegisterScreen.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';

interface TuristaRegisterScreenProps {
  navigation: any;
}

const TuristaRegisterScreen: React.FC<TuristaRegisterScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleEmailRegister = () => {
    if (!email) {
      Alert.alert('Erro', 'Digite seu email');
      return;
    }
    navigation.navigate('TuristaPersonalData', { email });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Botão Voltar */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>🏖️</Text>
          </View>
        </View>

        <Text style={styles.title}>Crie uma conta</Text>
        <Text style={styles.subtitle}>Insira seu email e junte-se a nós.</Text>

        <TextInput
          style={styles.input}
          placeholder="email@domain.com"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.registerButton} onPress={handleEmailRegister}>
          <Text style={styles.registerButtonText}>Cadastrar-se com o email</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou continue com</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.googleButton} onPress={() => Alert.alert('Google', 'Cadastro com Google em breve')}>
          <Text style={styles.googleButtonText}>Google</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          Ao continuar, você aceita nossa Política de Privacidade e Termos de uso
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Já possuo cadastro</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1, padding: 20, paddingTop: 60 },
  backButton: { marginBottom: 20 },
  backText: { fontSize: 16, color: '#4ECDC4' },
  logoContainer: { alignItems: 'center', marginBottom: 30 },
  logo: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#4ECDC4', justifyContent: 'center', alignItems: 'center' },
  logoText: { fontSize: 40 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#333', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#666', marginBottom: 30 },
  input: { backgroundColor: '#f5f5f5', borderRadius: 10, padding: 15, marginBottom: 20, fontSize: 16, borderWidth: 1, borderColor: '#eee' },
  registerButton: { backgroundColor: '#4ECDC4', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  registerButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#ddd' },
  dividerText: { marginHorizontal: 10, color: '#999', fontSize: 14 },
  googleButton: { backgroundColor: '#fff', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 30, borderWidth: 1, borderColor: '#ddd' },
  googleButtonText: { color: '#333', fontSize: 16 },
  termsText: { textAlign: 'center', fontSize: 12, color: '#999', marginBottom: 20 },
  loginLink: { textAlign: 'center', color: '#4ECDC4', fontSize: 14, fontWeight: 'bold' },
});

export default TuristaRegisterScreen;