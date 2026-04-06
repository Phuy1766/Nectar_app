import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800' }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <SafeAreaView style={styles.safe}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🥕</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>Welcome{'\n'}to our store</Text>
            <Text style={styles.subtitle}>Ger your groceries in as fast as one hour</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/(auth)/auth-entry')}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width,
    height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  safe: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 48,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoIcon: {
    fontSize: 44,
  },
  content: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 12,
    lineHeight: 56,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 40,
    lineHeight: 22,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
