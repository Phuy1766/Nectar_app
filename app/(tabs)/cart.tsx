import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { PRODUCTS } from '@/constants/data';

interface CartItem {
  id: string;
  name: string;
  unit: string;
  price: number;
  image: string;
  qty: number;
}

export default function CartScreen() {
  const [items, setItems] = useState<CartItem[]>(
    [PRODUCTS[2], PRODUCTS[12], PRODUCTS[0], PRODUCTS[3]].map((p) => ({ ...p, qty: 1 }))
  );

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item)
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cart</Text>
      </View>
      <View style={styles.headerLine} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
            <View style={styles.itemInfo}>
              <View style={styles.itemHeader}>
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemUnit}>{item.unit}, Price</Text>
                </View>
                <TouchableOpacity onPress={() => removeItem(item.id)} hitSlop={8}>
                  <Ionicons name="close" size={22} color={Colors.gray} />
                </TouchableOpacity>
              </View>
              <View style={styles.itemBottom}>
                <View style={styles.qtyRow}>
                  <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.id, -1)}>
                    <Ionicons name="remove" size={18} color={Colors.gray} />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.qty}</Text>
                  <TouchableOpacity style={[styles.qtyBtn, styles.qtyBtnPlus]} onPress={() => updateQty(item.id, 1)}>
                    <Ionicons name="add" size={18} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemPrice}>${(item.price * item.qty).toFixed(2)}</Text>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/checkout' as any)}>
          <Text style={styles.checkoutText}>Go to Checkout</Text>
          <View style={styles.totalBadge}>
            <Text style={styles.totalBadgeText}>${total.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { paddingHorizontal: 24, paddingVertical: 16 },
  title: { fontSize: 24, fontWeight: '700', color: Colors.black, textAlign: 'center' },
  headerLine: { height: 1, backgroundColor: Colors.border },
  list: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 16 },
  separator: { height: 1, backgroundColor: Colors.border, marginVertical: 20 },
  cartItem: { flexDirection: 'row', alignItems: 'center' },
  itemImage: { width: 80, height: 80, marginRight: 20 },
  itemInfo: { flex: 1 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  itemName: { fontSize: 16, fontWeight: '700', color: Colors.black, marginBottom: 4 },
  itemUnit: { fontSize: 13, color: Colors.gray },
  itemBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  qtyBtn: {
    width: 40, height: 40, borderRadius: 12,
    borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  qtyBtnPlus: { borderColor: Colors.border },
  qtyText: { fontSize: 17, fontWeight: '600', color: Colors.black, minWidth: 20, textAlign: 'center' },
  itemPrice: { fontSize: 18, fontWeight: '700', color: Colors.black },
  footer: { paddingHorizontal: 24, paddingBottom: 24, paddingTop: 8 },
  checkoutBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  checkoutText: { color: Colors.white, fontSize: 18, fontWeight: '600' },
  totalBadge: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  totalBadgeText: { color: Colors.white, fontSize: 13, fontWeight: '600' },
});
