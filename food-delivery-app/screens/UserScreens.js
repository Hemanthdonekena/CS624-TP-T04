// screens/UserScreens.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useApp } from '../context/AppContext';

export const ProfileScreen = () => {
  const { user, logout } = useApp();

  return (
    <View style={{ padding: 20 }}>
      <Text>Profile</Text>
      {user ? (
        <>
          <Text>Email: {user.email}</Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <Text>No user logged in</Text>
      )}
    </View>
  );
};
