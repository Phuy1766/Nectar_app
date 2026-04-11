import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useCart } from '@/contexts/CartContext';

export default function CartScreen() {
  const { items, loading, total, updateQty, removeItem } = useCart();

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator color={Colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cart</Text>
      </View>
      <View style={styles.headerLine} />

      {items.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="cart-outline" size={64} color={Colors.gray} />
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
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
      )}

      {items.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/checkout' as any)}>
            <Text style={styles.checkoutText}>Go to Checkout</Text>
            <View style={styles.totalBadge}>
              <Text style={styles.totalBadgeText}>${total.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyText: { fontSize: 16, color: Colors.gray },
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
