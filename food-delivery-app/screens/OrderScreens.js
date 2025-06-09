// screens/OrderScreens.js
import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useApp } from '../context/AppContext';

export const OrderScreen = () => {
  const { orders } = useApp();

  return (
    <View style={{ padding: 20 }}>
      <Text>My Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>Order ID: {item.id}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Items: {item.items.map(i => i.name).join(', ')}</Text>
          </View>
        )}
      />
    </View>
  );
};
