import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { PRODUCTS } from '@/constants/data';

export default function FavouriteScreen() {
  const favourites = PRODUCTS.filter((p) => p.category === 'beverages');

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
        <TouchableOpacity style={styles.addAllBtn}>
          <Text style={styles.addAllText}>Add All To Cart</Text>
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
});
