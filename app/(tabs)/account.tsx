import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { getOrders } from '@/services/storageService';

const MENU_ITEMS: { icon: string; label: string; route?: string }[] = [
  { icon: 'bag-handle-outline', label: 'Orders', route: '/orders' },
  { icon: 'id-card-outline', label: 'My Details' },
  { icon: 'location-outline', label: 'Delivery Address' },
  { icon: 'card-outline', label: 'Payment Methods' },
  { icon: 'pricetag-outline', label: 'Promo Cord' },
  { icon: 'notifications-outline', label: 'Notifications' },
  { icon: 'help-circle-outline', label: 'Help' },
  { icon: 'information-circle-outline', label: 'About' },
];

export default function AccountScreen() {
  const { user, logout } = useAuth();
  const { clearCart } = useCart();
  const [orderCount, setOrderCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const orders = await getOrders();
          setOrderCount(orders.length);
        } catch (err) {
          console.error('Failed to load orders count:', err);
        }
      })();
    }, [])
  );

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await clearCart();
            await logout();
            router.replace('/(auth)/login');
          } catch (err) {
            Alert.alert('Error', 'Failed to log out');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile */}
        <View style={styles.profile}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{user?.name ?? 'Afsar Hossen'}</Text>
              <TouchableOpacity hitSlop={8}>
                <Ionicons name="pencil-outline" size={18} color={Colors.primary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.email}>{user?.email ?? 'imshuvo97@gmail.com'}</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menu}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.menuItem}
              onPress={() => item.route && router.push(item.route as any)}
            >
              <View style={styles.menuLeft}>
                <Ionicons name={item.icon as any} size={22} color={Colors.black} />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <View style={styles.menuRight}>
                {item.label === 'Orders' && orderCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{orderCount}</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={18} color={Colors.black} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={22} color={Colors.primary} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.lightGray,
  },
  profileInfo: { flex: 1 },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  name: { fontSize: 20, fontWeight: '700', color: Colors.black },
  email: { fontSize: 14, color: Colors.gray },
  menu: { paddingHorizontal: 24 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  menuRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  menuLabel: { fontSize: 18, fontWeight: '600', color: Colors.black },
  badge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: Colors.white, fontSize: 12, fontWeight: '700' },
  logoutContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: Colors.lightGray,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
});
