import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['+*#', '0', '⌫'],
];

export default function PhoneScreen() {
  const [number, setNumber] = useState('');

  const handleKey = (key: string) => {
    if (key === '⌫') {
      setNumber((prev) => prev.slice(0, -1));
    } else if (key !== '+*#') {
      if (number.length < 10) setNumber((prev) => prev + key);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color={Colors.black} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Enter your mobile number</Text>

        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.inputRow}>
          <Image
              source={{ uri: 'https://flagcdn.com/w40/bd.png' }}
              style={styles.flagImage}
            />
          <Text style={styles.code}>+880</Text>
          <Text style={styles.numberText}>{number}</Text>
        </View>
        <View style={styles.divider} />
      </View>

      {/* FAB next button */}
      <TouchableOpacity
        style={[styles.fab, number.length > 0 && styles.fabActive]}
        onPress={() => number.length > 0 && router.push('/(auth)/otp')}
      >
        <Ionicons name="chevron-forward" size={28} color={Colors.white} />
      </TouchableOpacity>

      {/* Custom keyboard */}
      <View style={styles.keyboard}>
        {KEYS.map((row, ri) => (
          <View key={ri} style={styles.keyRow}>
            {row.map((key) => (
              <TouchableOpacity
                key={key}
                style={styles.key}
                onPress={() => handleKey(key)}
              >
                {key === '⌫' ? (
                  <Ionicons name="backspace-outline" size={22} color={Colors.black} />
                ) : (
                  <Text style={styles.keyText}>{key}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const keyW = (width - 2) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  back: {
    padding: 16,
    paddingBottom: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 48,
    lineHeight: 34,
  },
  label: {
    fontSize: 13,
    color: Colors.gray,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  flagImage: {
    width: 28,
    height: 20,
    borderRadius: 2,
    marginRight: 10,
  },
  code: {
    fontSize: 18,
    color: Colors.black,
    fontWeight: '500',
    marginRight: 8,
  },
  numberText: {
    fontSize: 18,
    color: Colors.black,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 280,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabActive: {
    backgroundColor: Colors.primary,
  },
  keyboard: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  keyRow: {
    flexDirection: 'row',
  },
  key: {
    width: keyW,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.border,
  },
  keyText: {
    fontSize: 20,
    color: Colors.black,
    fontWeight: '400',
  },
});
