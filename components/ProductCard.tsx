import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Product } from '@/constants/data';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/product/${product.id}` as any)}
    >
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.unit}>{product.unit}, Price</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 174,
    backgroundColor: Colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    marginRight: 14,
  },
  image: {
    width: '100%',
    height: 100,
    marginBottom: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 4,
  },
  unit: {
    fontSize: 13,
    color: Colors.gray,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
