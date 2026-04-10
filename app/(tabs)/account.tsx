import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

const MENU_ITEMS = [
  { icon: 'bag-handle-outline', label: 'Orders' },
  { icon: 'id-card-outline', label: 'My Details' },
  { icon: 'location-outline', label: 'Delivery Address' },
  { icon: 'card-outline', label: 'Payment Methods' },
  { icon: 'pricetag-outline', label: 'Promo Cord' },
  { icon: 'notifications-outline', label: 'Notifications' },
  { icon: 'help-circle-outline', label: 'Help' },
  { icon: 'information-circle-outline', label: 'About' },
];

export default function AccountScreen() {
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
              <Text style={styles.name}>Afsar Hossen</Text>
              <TouchableOpacity hitSlop={8}>
                <Ionicons name="pencil-outline" size={18} color={Colors.primary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.email}>Imshuvo97@gmail.com</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menu}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity key={i} style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Ionicons name={item.icon as any} size={22} color={Colors.black} />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.black} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => router.replace('/(auth)/login')}
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
  menuLabel: { fontSize: 18, fontWeight: '600', color: Colors.black },
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
