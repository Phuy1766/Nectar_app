import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

export default function AuthEntryScreen() {
  return (
    <View style={styles.container}>
      {/* Top image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600' }}
          style={styles.topImage}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay} />
      </View>

      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <View style={styles.content}>
          <Text style={styles.title}>Get your groceries{'\n'}with nectar</Text>

          {/* Phone input row */}
          <TouchableOpacity
            style={styles.phoneRow}
            onPress={() => router.push('/(auth)/phone')}
          >
            <Image
              source={{ uri: 'https://flagcdn.com/w40/bd.png' }}
              style={styles.flagImage}
            />
            <Text style={styles.phoneCode}>+880</Text>
          </TouchableOpacity>
          <View style={styles.divider} />

          <Text style={styles.orText}>Or connect with social media</Text>

          {/* Google button */}
          <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
            <Text style={styles.socialIcon}>G</Text>
            <Text style={[styles.socialText, { color: Colors.black }]}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Facebook button */}
          <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
            <Text style={[styles.socialIcon, { color: Colors.white }]}>f</Text>
            <Text style={[styles.socialText, { color: Colors.white }]}>Continue with Facebook</Text>
          </TouchableOpacity>

          {/* Login link */}
          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.loginText}>Already have an account? </Text>
            <Text style={[styles.loginText, { color: Colors.primary }]}>Log In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageContainer: {
    height: '45%',
    position: 'relative',
  },
  topImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  safe: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 28,
    lineHeight: 34,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  flagImage: {
    width: 28,
    height: 20,
    borderRadius: 2,
    marginRight: 12,
  },
  phoneCode: {
    fontSize: 18,
    color: Colors.black,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: 20,
  },
  orText: {
    textAlign: 'center',
    color: Colors.gray,
    fontSize: 14,
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 14,
    justifyContent: 'center',
  },
  googleButton: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  facebookButton: {
    backgroundColor: '#4A66AC',
  },
  socialIcon: {
    fontSize: 20,
    fontWeight: '700',
    marginRight: 12,
    color: '#4285F4',
  },
  socialText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    fontSize: 14,
    color: Colors.gray,
  },
});
