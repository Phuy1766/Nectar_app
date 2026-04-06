import { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.carrot}>🥕</Text>
        <Text style={styles.brand}>nectar</Text>
        <Text style={styles.tagline}>online groceriet</Text>
      </View>
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
