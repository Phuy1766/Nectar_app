import {
  View, Text, StyleSheet, TouchableOpacity, Image,
  FlatList, Dimensions,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { PRODUCTS } from '@/constants/data';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48 - 14) / 2;

export default function CategoryScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();

  const displayName = name
    ? name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Category';

  // Show beverages products for beverages category, else show all
  const products = name?.includes('beverage')
    ? PRODUCTS.filter((p) => p.category === 'beverages')
    : PRODUCTS;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.title}>{displayName}</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={22} color={Colors.black} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/product/${item.id}` as any)}
          >
            <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="contain" />
            <Text style={styles.cardName}>{item.name}</Text>
            <Text style={styles.cardUnit}>{item.unit}, Price</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardPrice}>${item.price.toFixed(2)}</Text>
              <TouchableOpacity style={styles.addBtn}>
                <Ionicons name="add" size={22} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
  },
  filterBtn: {
    padding: 4,
  },
  grid: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
  },
  cardImage: {
    width: '100%',
    height: 110,
    marginBottom: 8,
  },
  cardName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 4,
  },
  cardUnit: {
    fontSize: 13,
    color: Colors.gray,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardPrice: {
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
