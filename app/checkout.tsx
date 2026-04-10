import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

const CHECKOUT_ROWS = [
  { label: 'Delivery', value: 'Select Method', icon: null },
  { label: 'Payment', value: null, icon: 'card' as const },
  { label: 'Promo Code', value: 'Pick discount', icon: null },
  { label: 'Total Cost', value: '$13.97', icon: null },
];

export default function CheckoutScreen() {
  const handlePlaceOrder = () => {
    router.replace('/order-accepted' as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.sheet}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Checkout</Text>
          <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
            <Ionicons name="close" size={24} color={Colors.black} />
          </TouchableOpacity>
        </View>

        {/* Rows */}
        {CHECKOUT_ROWS.map((row, i) => (
          <TouchableOpacity key={i} style={styles.row}>
            <Text style={styles.rowLabel}>{row.label}</Text>
            <View style={styles.rowRight}>
              {row.icon ? (
                <View style={styles.cardIcon}>
                  <Ionicons name="card" size={20} color={Colors.primary} />
                </View>
              ) : (
                <Text style={[styles.rowValue, row.label === 'Total Cost' && styles.rowValueBold]}>
                  {row.value}
                </Text>
              )}
              <Ionicons name="chevron-forward" size={18} color={Colors.black} />
            </View>
          </TouchableOpacity>
        ))}

        {/* Terms */}
        <View style={styles.terms}>
          <Text style={styles.termsText}>
            By placing an order you agree to our{'\n'}
            <Text style={styles.termsLink}>Terms</Text> And{' '}
            <Text style={styles.termsLink}>Conditions</Text>
          </Text>
        </View>

        {/* Place Order Button */}
        <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  rowLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rowValue: {
    fontSize: 16,
    color: Colors.black,
  },
  rowValueBold: {
    fontWeight: '700',
    fontSize: 16,
  },
  cardIcon: {
    width: 28,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  terms: {
    marginTop: 16,
    marginBottom: 20,
  },
  termsText: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 20,
  },
  termsLink: {
    fontWeight: '700',
    color: Colors.black,
  },
  placeOrderBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  placeOrderText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
