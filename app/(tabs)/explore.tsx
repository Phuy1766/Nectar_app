import {
  View, Text, StyleSheet, TouchableOpacity, Image,
  FlatList, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { CATEGORIES } from '@/constants/data';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 48 - 14) / 2;

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Find Products</Text>

      {/* Search bar - tappable, navigates to search screen */}
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => router.push('/search' as any)}
        activeOpacity={0.7}
      >
        <Ionicons name="search-outline" size={18} color={Colors.gray} />
        <Text style={styles.searchPlaceholder}>Search Store</Text>
      </TouchableOpacity>

      {/* Categories grid */}
      <FlatList
        data={CATEGORIES}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryCard, {
              backgroundColor: item.bgColor,
              borderColor: item.borderColor,
            }]}
            onPress={() => router.push(`/category/${item.name.toLowerCase().replace(/\s+/g, '-').replace(/\n/g, '-')}` as any)}
          >
            <Image source={{ uri: item.image }} style={styles.categoryImage} resizeMode="contain" />
            <Text style={styles.categoryName}>{item.name}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.black,
    textAlign: 'center',
    paddingTop: 12,
    paddingBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    marginHorizontal: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 20,
    gap: 8,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 15,
    color: Colors.gray,
    marginLeft: 8,
  },
  grid: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  categoryCard: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  categoryImage: {
    width: CARD_SIZE - 48,
    height: CARD_SIZE - 80,
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.black,
    textAlign: 'center',
    lineHeight: 22,
  },
});
