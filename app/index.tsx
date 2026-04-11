import { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';

export default function SplashScreen() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => {
      if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/onboarding');
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [loading, user]);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.carrot}>🥕</Text>
        <Text style={styles.brand}>nectar</Text>
        <Text style={styles.tagline}>online groceriet</Text>
      </View>
      {loading && <ActivityIndicator color={Colors.white} style={{ marginTop: 24 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
  },
  carrot: {
    fontSize: 48,
    marginBottom: 8,
  },
  brand: {
    fontSize: 42,
    fontWeight: '600',
    color: Colors.white,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: Colors.white,
    letterSpacing: 4,
    marginTop: 4,
    opacity: 0.9,
  },
});
