import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function OrderAcceptedScreen() {
  return (
    <View style={styles.container}>
      {/* Decorative elements */}
      <View style={styles.decorContainer}>
        {/* Confetti / decorative shapes */}
        <View style={[styles.dot, { top: 40, left: '45%', backgroundColor: Colors.primary, width: 12, height: 12 }]} />
        <View style={[styles.dot, { top: 50, left: '52%', backgroundColor: Colors.error, width: 8, height: 8 }]} />
        <View style={[styles.squiggle, { top: 60, right: 60, borderColor: '#F3603F', transform: [{ rotate: '-30deg' }] }]} />
        <View style={[styles.circle, { top: 100, left: 70, borderColor: '#F8A44C', width: 14, height: 14 }]} />
        <View style={[styles.squiggleBlue, { top: 140, left: 50 }]} />
        <View style={[styles.circle, { top: 130, right: 70, borderColor: '#D3B6E8', width: 12, height: 12 }]} />
        <View style={[styles.circle, { bottom: 40, left: '35%', borderColor: Colors.primary, width: 10, height: 10 }]} />
        <View style={[styles.dot, { bottom: 30, left: '48%', backgroundColor: Colors.primary, width: 6, height: 6 }]} />
        <View style={[styles.dot, { bottom: 26, left: '54%', backgroundColor: '#4A66AC', width: 10, height: 10 }]} />
        <View style={[styles.squiggle, { bottom: 20, right: 80, borderColor: '#F8A44C', transform: [{ rotate: '60deg' }], width: 20, height: 20 }]} />

        {/* Main checkmark circle */}
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <Ionicons name="checkmark" size={60} color={Colors.white} />
          </View>
        </View>
      </View>

      {/* Text */}
      <Text style={styles.title}>Your Order has been{'\n'}accepted</Text>
      <Text style={styles.subtitle}>
        Your items has been placed and is on{'\n'}it's way to being processed
      </Text>

      {/* Spacer */}
      <View style={{ flex: 1 }} />

      {/* Buttons */}
      <TouchableOpacity style={styles.trackBtn} onPress={() => router.replace('/(tabs)' as any)}>
        <Text style={styles.trackBtnText}>Track Order</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.replace('/(tabs)' as any)}>
        <Text style={styles.backBtnText}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  decorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 260,
    marginBottom: 40,
  },
  outerCircle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 2,
    borderColor: 'rgba(83, 177, 117, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    borderRadius: 50,
  },
  circle: {
    position: 'absolute',
    borderRadius: 50,
    borderWidth: 2,
  },
  squiggle: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 0,
    borderWidth: 2.5,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  squiggleBlue: {
    position: 'absolute',
    width: 30,
    height: 16,
    borderWidth: 2.5,
    borderColor: '#4A66AC',
    borderRadius: 10,
    borderRightColor: 'transparent',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    transform: [{ rotate: '-20deg' }],
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.black,
    textAlign: 'center',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 16,
  },
  trackBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  trackBtnText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  backBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  backBtnText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
});
