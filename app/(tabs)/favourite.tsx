import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { PRODUCTS } from '@/constants/data';

export default function FavouriteScreen() {
  const favourites = PRODUCTS.filter((p) => p.category === 'beverages');
  const [showError, setShowError] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favourites</Text>
      </View>
      <View style={styles.headerLine} />

      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push(`/product/${item.id}` as any)}
          >
            <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemUnit}>{item.unit}, Price</Text>
            </View>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.black} />
          </TouchableOpacity>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addAllBtn} onPress={() => setShowError(true)}>
          <Text style={styles.addAllText}>Add All To Cart</Text>
        </TouchableOpacity>
      </View>

      {/* Order Failed Modal */}
      <Modal visible={showError} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setShowError(false)}
              hitSlop={8}
            >
              <Ionicons name="close" size={24} color={Colors.black} />
            </TouchableOpacity>

            <View style={styles.modalImageWrap}>
              <View style={styles.modalImageCircle}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300' }}
                  style={styles.modalImage}
                  resizeMode="cover"
                />
              </View>
            </View>

            <Text style={styles.modalTitle}>Oops! Order Failed</Text>
            <Text style={styles.modalSubtitle}>Something went terribly wrong.</Text>

            <TouchableOpacity
              style={styles.retryBtn}
              onPress={() => setShowError(false)}
            >
              <Text style={styles.retryText}>Please Try Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalBackBtn}
              onPress={() => {
                setShowError(false);
                router.replace('/(tabs)' as any);
              }}
            >
              <Text style={styles.modalBackText}>Back to home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { paddingHorizontal: 24, paddingVertical: 16 },
  title: { fontSize: 24, fontWeight: '700', color: Colors.black, textAlign: 'center' },
  headerLine: { height: 1, backgroundColor: Colors.border },
  list: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 },
  separator: { height: 1, backgroundColor: Colors.border, marginVertical: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: { width: 60, height: 60, marginRight: 16 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: '700', color: Colors.black, marginBottom: 4 },
  itemUnit: { fontSize: 13, color: Colors.gray },
  itemPrice: { fontSize: 16, fontWeight: '700', color: Colors.black, marginRight: 8 },
  footer: { paddingHorizontal: 24, paddingBottom: 24, paddingTop: 8 },
  addAllBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  addAllText: { color: Colors.white, fontSize: 18, fontWeight: '600' },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
    width: '100%',
    alignItems: 'center',
  },
  modalClose: {
    alignSelf: 'flex-start',
  },
  modalImageWrap: {
    marginTop: 8,
    marginBottom: 28,
  },
  modalImageCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#E8F5E9',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 12,
  },
  modalSubtitle: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 28,
  },
  retryBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  retryText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  modalBackBtn: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  modalBackText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
});
