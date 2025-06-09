import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome to the Food Delivery App!</Text>
      <Button title="Go to Explore" onPress={() => router.push('/(tabs)/explore')} />
    </View>
  );
}
