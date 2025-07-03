import Button from '@/components/button';
import GetApp from '@/components/getApp';
import alert from '@/lib/alert';
import { login } from '@/lib/auth';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

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
      <GetApp />

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

        <Button onPress={handleLogin} title="Login" />

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
    marginLeft: 5,
    marginRight: 5,
    fontSize: 16,
    color: '#1e293b',
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
