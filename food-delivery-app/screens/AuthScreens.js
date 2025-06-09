// screens/AuthScreens.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { loginUser, registerUser } from '../firebase/services';

export const LoginScreen = () => {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await loginUser(email, password);
      login(userCredential.user);
    } catch (e) {
      alert('Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput placeholder="Email" onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export const RegisterScreen = () => {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await registerUser(email, password);
      login(userCredential.user);
    } catch (e) {
      alert('Registration failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <TextInput placeholder="Email" onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10 }
});