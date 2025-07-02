import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { login } from '@/lib/auth';
import { router } from 'expo-router';
import alert from '@/lib/alert'

export default function LoginScreen() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // validation
    if (!id || !password) {
      alert('Error', 'Please enter both id and password.')
      return
    }

    if (id.length !== 8) {
      alert('Error', 'TP number must be 8 digits long.')
      return
    }

    if (!/^(TP)\d+$/.test(id)) {
      alert('Error', 'TP number must start with TP and contain only digits.')
      return
    }

    // login
    const success = await login(id, password)

    if (!success) {
      alert('Login failed', 'Incorrect TP number or password.')
      return
    }

    router.replace('/')
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inner}>
        <TextInput
          style={styles.input}
          placeholder="TP number"
          placeholderTextColor="#888"
          value={id}
          onChangeText={setId}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton} activeOpacity={0.7} onPress={handleLogin}>
          <LinearGradient
            colors={['#423cc5', '#4f52f5']}
            style={styles.gradient}
          >
            <Text style={styles.loginButtonText}>login</Text>
          </LinearGradient>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    maxWidth: 600,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    marginLeft: 1,
    marginRight: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  linksContainer: {
    marginTop: 25,
    alignItems: 'center',
  },
  linkText: {
    color: '#4f46e5',
    fontSize: 14,
    marginVertical: 5,
  },
});
