import {
  View, Text, StyleSheet, TouchableOpacity, Image,
  FlatList, TextInput, Dimensions, Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useMemo } from 'react';
import { Colors } from '@/constants/Colors';
import { PRODUCTS, FILTER_CATEGORIES, FILTER_BRANDS } from '@/constants/data';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48 - 14) / 2;

const CATEGORY_MAP: Record<string, string[]> = {
  'Eggs': ['eggs'],
  'Noodles & Pasta': ['noodles'],
  'Chips & Crisps': ['snacks'],
  'Fast Food': ['fast food'],
};

export default function SearchScreen() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  const [query, setQuery] = useState(q || '');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [appliedCategories, setAppliedCategories] = useState<string[]>([]);
  const [appliedBrands, setAppliedBrands] = useState<string[]>([]);

  const results = useMemo(() => {
    let filtered = PRODUCTS;

    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(q)
      );
    }

    if (appliedCategories.length > 0) {
      const cats = appliedCategories.flatMap((c) => CATEGORY_MAP[c] || [c.toLowerCase()]);
      filtered = filtered.filter((p) => cats.includes(p.category));
    }

    if (appliedBrands.length > 0) {
      filtered = filtered.filter((p) => p.brand && appliedBrands.includes(p.brand));
    }

    return filtered;
  }, [query, appliedCategories, appliedBrands]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const applyFilter = () => {
    setAppliedCategories([...selectedCategories]);
    setAppliedBrands([...selectedBrands]);
    setShowFilter(false);
  };

  const openFilter = () => {
    setSelectedCategories([...appliedCategories]);
    setSelectedBrands([...appliedBrands]);
    setShowFilter(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color={Colors.gray} />
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Search Store"
            placeholderTextColor={Colors.gray}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color={Colors.gray} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterIcon} onPress={openFilter}>
          <Ionicons name="options-outline" size={22} color={Colors.black} />
        </TouchableOpacity>
      </View>

      {/* Results */}
      <FlatList
        data={results}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={48} color={Colors.border} />
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        }
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

      {/* Filter Modal */}
      <Modal visible={showFilter} animationType="slide">
        <SafeAreaView style={styles.filterContainer}>
          <View style={styles.filterHeader}>
            <TouchableOpacity onPress={() => setShowFilter(false)}>
              <Ionicons name="close" size={28} color={Colors.black} />
            </TouchableOpacity>
            <Text style={styles.filterTitle}>Filters</Text>
            <View style={{ width: 28 }} />
          </View>

          <View style={styles.filterBody}>
            <Text style={styles.filterSection}>Categories</Text>
            {FILTER_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={styles.filterOption}
                onPress={() => toggleCategory(cat)}
              >
                <View style={[
                  styles.checkbox,
                  selectedCategories.includes(cat) && styles.checkboxActive,
                ]}>
                  {selectedCategories.includes(cat) && (
                    <Ionicons name="checkmark" size={16} color={Colors.white} />
                  )}
                </View>
                <Text style={[
                  styles.filterOptionText,
                  selectedCategories.includes(cat) && styles.filterOptionActive,
                ]}>{cat}</Text>
              </TouchableOpacity>
            ))}

            <Text style={[styles.filterSection, { marginTop: 28 }]}>Brand</Text>
            {FILTER_BRANDS.map((brand) => (
              <TouchableOpacity
                key={brand}
                style={styles.filterOption}
                onPress={() => toggleBrand(brand)}
              >
                <View style={[
                  styles.checkbox,
                  selectedBrands.includes(brand) && styles.checkboxActive,
                ]}>
                  {selectedBrands.includes(brand) && (
                    <Ionicons name="checkmark" size={16} color={Colors.white} />
                  )}
                </View>
                <Text style={[
                  styles.filterOptionText,
                  selectedBrands.includes(brand) && styles.filterOptionActive,
                ]}>{brand}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.filterFooter}>
            <TouchableOpacity style={styles.applyBtn} onPress={applyFilter}>
              <Text style={styles.applyText}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 15, color: Colors.black },
  filterIcon: { padding: 4 },
  grid: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 24 },
  row: { justifyContent: 'space-between', marginBottom: 14 },
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
  },
  cardImage: { width: '100%', height: 110, marginBottom: 8 },
  cardName: { fontSize: 15, fontWeight: '700', color: Colors.black, marginBottom: 4 },
  cardUnit: { fontSize: 13, color: Colors.gray, marginBottom: 12 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardPrice: { fontSize: 18, fontWeight: '700', color: Colors.black },
  addBtn: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  emptyContainer: { alignItems: 'center', paddingTop: 80, gap: 12 },
  emptyText: { fontSize: 16, color: Colors.gray },

  // Filter modal
  filterContainer: { flex: 1, backgroundColor: Colors.white },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  filterTitle: { fontSize: 20, fontWeight: '700', color: Colors.black },
  filterBody: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  filterSection: { fontSize: 22, fontWeight: '700', color: Colors.black, marginBottom: 20 },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    gap: 12,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterOptionText: { fontSize: 16, color: Colors.black },
  filterOptionActive: { color: Colors.primary, fontWeight: '600' },
  filterFooter: { backgroundColor: Colors.lightGray, paddingHorizontal: 24, paddingBottom: 24 },
  applyBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  applyText: { color: Colors.white, fontSize: 18, fontWeight: '600' },
});
