import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { AppButton, RestaurantCard, CartItem, Header } from '../components/UIComponents';

export default function UserScreen({ navigation }) {
  const { user, logout } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.email || 'Guest'}!</Text>
      <Button title="Logout" onPress={() => {
        logout();
        navigation.navigate('Login');
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  }
});
