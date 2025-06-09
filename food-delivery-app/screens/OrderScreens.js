import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { AppButton, RestaurantCard, CartItem, Header } from '../components/UIComponents';

export function CartScreen({ navigation }) {
  const { cart, removeFromCart, placeOrder } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{item.name} - ${item.price.toFixed(2)}</Text>
                <Button title="Remove" onPress={() => removeFromCart(item.id)} />
              </View>
            )}
          />
          <Button
            title="Place Order"
            onPress={() => {
              placeOrder();
              navigation.navigate('TrackOrder');
            }}
          />
        </>
      )}
    </View>
  );
}

export function OrderTrackingScreen() {
  const { orders } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Tracking</Text>
      {orders.length === 0 ? (
        <Text>No orders placed yet.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(order) => order.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>Order ID: {item.id}</Text>
              <Text>Status: {item.status}</Text>
              <Text>Items: {item.items.map(i => i.name).join(', ')}</Text>
            </View>
          )}
        />
      )}
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
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 6
  }
});
