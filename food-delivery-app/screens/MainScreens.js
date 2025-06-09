// screens/MainScreens.js
import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useApp } from '../context/AppContext';

export const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome to FoodExpress!</Text>
      <Button title="Go to Menu" onPress={() => navigation.navigate('Menu')} />
    </View>
  );
};

export const MenuScreen = () => {
  const { addToCart } = useApp();
  const menuItems = [
    { id: '1', name: 'Pizza', price: 12 },
    { id: '2', name: 'Burger', price: 8 },
    { id: '3', name: 'Sushi', price: 15 },
  ];

  return (
    <FlatList
      data={menuItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
          <Text>{item.name} - ${item.price}</Text>
          <Button title="Add to Cart" onPress={() => addToCart(item)} />
        </View>
      )}
    />
  );
};
