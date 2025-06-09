import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { AppButton, RestaurantCard, CartItem, Header } from '../components/UIComponents';

export function HomeScreen({ navigation }) {
  const restaurants = [
    { id: 1, name: 'Pizza Palace' },
    { id: 2, name: 'Burger Bistro' },
    { id: 3, name: 'Noodle Nirvana' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurants</Text>
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Button
              title="View Menu"
              onPress={() => navigation.navigate('Menu', { restaurant: item })}
            />
          </View>
        )}
      />
    </View>
  );
}

export function MenuScreen({ route, navigation }) {
  const { restaurant } = route.params;
  const { addToCart } = useApp();

  const menuItems = [
    { id: 'm1', name: 'Margherita Pizza', price: 9.99 },
    { id: 'm2', name: 'BBQ Chicken Pizza', price: 12.99 },
    { id: 'm3', name: 'Garlic Bread', price: 4.99 },
    { id: 'm4', name: 'Pasta Alfredo', price: 10.49 }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{restaurant.name} Menu</Text>
      <FlatList
        data={menuItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name} - ${item.price.toFixed(2)}</Text>
            <Button title="Add to Cart" onPress={() => addToCart(item)} />
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
      </View>
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
  },
  item: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 6
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5
  },
  buttonContainer: {
    marginTop: 20
  }
});
