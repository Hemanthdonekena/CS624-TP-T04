// UIComponents.js
import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button as RNButton,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

export function AppButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export function RestaurantCard({ name }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{name}</Text>
    </View>
  );
}

export function CartItem({ item, onRemove }) {
  return (
    <View style={styles.cartItem}>
      <Text>{item.name} - ${item.price.toFixed(2)}</Text>
      <RNButton title="Remove" onPress={() => onRemove(item.id)} />
    </View>
  );
}

export function OrderStatus({ status }) {
  return (
    <View style={styles.statusBox}>
      <Text style={styles.statusText}>Order Status: {status}</Text>
    </View>
  );
}

export function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

export function InputField({ placeholder, value, onChangeText, secureTextEntry }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
}

export function Loader({ visible }) {
  return visible ? <ActivityIndicator size="large" color="#ff5a5f" /> : null;
}
