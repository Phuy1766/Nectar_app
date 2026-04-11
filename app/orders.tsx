import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { Colors } from '@/constants/Colors';
import { OrderItem, getOrders } from '@/services/storageService';

function formatDate(ts: number): string {
  const d = new Date(ts);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function OrdersScreen() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.title}>My Orders</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.headerLine} />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : orders.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="receipt-outline" size={64} color={Colors.gray} />
          <Text style={styles.emptyText}>No orders yet</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderId}>Order #{item.id.slice(-6).toUpperCase()}</Text>
                  <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
                </View>
                <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
              </View>

              <View style={styles.itemsRow}>
                {item.items.slice(0, 4).map((p) => (
                  <Image
                    key={p.id}
                    source={{ uri: p.image }}
                    style={styles.itemThumb}
                    resizeMode="contain"
                  />
                ))}
                {item.items.length > 4 && (
                  <View style={styles.itemThumbMore}>
                    <Text style={styles.itemThumbMoreText}>+{item.items.length - 4}</Text>
                  </View>
                )}
              </View>

              <View style={styles.itemsList}>
                {item.items.map((p) => (
                  <Text key={p.id} style={styles.itemLine}>
                    {p.qty} × {p.name}{' '}
                    <Text style={styles.itemLinePrice}>${(p.price * p.qty).toFixed(2)}</Text>
                  </Text>
                ))}
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backBtn: { padding: 4 },
  title: { fontSize: 20, fontWeight: '700', color: Colors.black },
  headerLine: { height: 1, backgroundColor: Colors.border },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyText: { fontSize: 16, color: Colors.gray },
  list: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 },
  separator: { height: 16 },
  orderCard: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderId: { fontSize: 16, fontWeight: '700', color: Colors.black, marginBottom: 4 },
  orderDate: { fontSize: 13, color: Colors.gray },
  orderTotal: { fontSize: 18, fontWeight: '700', color: Colors.primary },
  itemsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  itemThumb: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
  },
  itemThumbMore: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemThumbMoreText: { fontSize: 13, fontWeight: '600', color: Colors.gray },
  itemsList: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
    gap: 4,
  },
  itemLine: { fontSize: 13, color: Colors.gray },
  itemLinePrice: { color: Colors.black, fontWeight: '600' },
});
