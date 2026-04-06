import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { ZONES, AREAS } from '@/constants/data';

export default function LocationScreen() {
  const [zone, setZone] = useState('Banasree');
  const [area, setArea] = useState('');
  const [showZone, setShowZone] = useState(false);
  const [showArea, setShowArea] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color={Colors.black} />
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Map pin illustration */}
        <View style={styles.illustrationContainer}>
          <Text style={styles.mapPin}>📍</Text>
          <View style={styles.mapBase}>
            <View style={styles.mapRoad} />
          </View>
        </View>

        <Text style={styles.title}>Select Your Location</Text>
        <Text style={styles.subtitle}>
          Swithch on your location to stay in tune with{'\n'}what's happening in your area
        </Text>

        {/* Zone picker */}
        <Text style={styles.label}>Your Zone</Text>
        <TouchableOpacity style={styles.picker} onPress={() => setShowZone(true)}>
          <Text style={styles.pickerText}>{zone}</Text>
          <Ionicons name="chevron-down" size={20} color={Colors.gray} />
        </TouchableOpacity>
        <View style={styles.divider} />

        {/* Area picker */}
        <Text style={styles.label}>Your Area</Text>
        <TouchableOpacity style={styles.picker} onPress={() => setShowArea(true)}>
          <Text style={[styles.pickerText, !area && styles.placeholder]}>
            {area || 'Types of your area'}
          </Text>
          <Ionicons name="chevron-down" size={20} color={Colors.gray} />
        </TouchableOpacity>
        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Zone Modal */}
      <Modal visible={showZone} transparent animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowZone(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Zone</Text>
            {ZONES.map((z) => (
              <TouchableOpacity
                key={z}
                style={styles.modalItem}
                onPress={() => { setZone(z); setShowZone(false); }}
              >
                <Text style={[styles.modalItemText, z === zone && styles.activeItem]}>{z}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Area Modal */}
      <Modal visible={showArea} transparent animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowArea(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Area</Text>
            {AREAS.map((a) => (
              <TouchableOpacity
                key={a}
                style={styles.modalItem}
                onPress={() => { setArea(a); setShowArea(false); }}
              >
                <Text style={[styles.modalItemText, a === area && styles.activeItem]}>{a}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

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
    alignItems: 'center',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  mapPin: {
    fontSize: 72,
  },
  mapBase: {
    width: 100,
    height: 30,
    backgroundColor: '#C8E6C9',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -16,
  },
  mapRoad: {
    width: 40,
    height: 8,
    backgroundColor: '#E8D5A3',
    borderRadius: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 13,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 8,
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 12,
  },
  pickerText: {
    fontSize: 16,
    color: Colors.black,
  },
  placeholder: {
    color: Colors.gray,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    width: '100%',
    marginBottom: 24,
  },
  submitButton: {
    width: '100%',
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  submitText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 16,
  },
  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalItemText: {
    fontSize: 16,
    color: Colors.black,
  },
  activeItem: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
