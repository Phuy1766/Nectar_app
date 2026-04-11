import { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { PRODUCTS, BANNERS, CATEGORIES } from '@/constants/data';
import ProductCard from '@/components/ProductCard';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [bannerIndex, setBannerIndex] = useState(0);

  const exclusiveOffers = PRODUCTS.slice(0, 4);
  const bestSelling = PRODUCTS.slice(2, 6);
  const groceries = PRODUCTS.slice(4, 8);

  const handleBannerScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    setBannerIndex(Math.round(x / (width - 48)));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.carrot}>🥕</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={16} color={Colors.black} />
            <Text style={styles.location}>Dhaka, Banassre</Text>
          </View>
          <Text style={styles.studentInfo}>Phạm Quang Huy · 23810310347</Text>
        </View>

        {/* Search bar */}
        <TouchableOpacity style={styles.searchBar} onPress={() => router.push('/(tabs)/explore')}>
          <Ionicons name="search-outline" size={18} color={Colors.gray} />
          <Text style={styles.searchText}>Search Store</Text>
        </TouchableOpacity>

        {/* Banner carousel */}
        <FlatList
          data={BANNERS}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleBannerScroll}
          scrollEventThrottle={16}
          style={styles.bannerList}
          renderItem={({ item }) => (
            <View style={[styles.bannerCard, { backgroundColor: item.bgColor }]}>
              <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerTitle}>{item.title}</Text>
                <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
              </View>
              <Image source={{ uri: item.image }} style={styles.bannerImage} resizeMode="cover" />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
        {/* Dots */}
        <View style={styles.dots}>
          {BANNERS.map((_, i) => (
            <View key={i} style={[styles.dot, i === bannerIndex && styles.dotActive]} />
          ))}
        </View>

        {/* Exclusive Offer */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Exclusive Offer</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={exclusiveOffers}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.id}
        />

        {/* Best Selling */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Best Selling</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={bestSelling}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.id}
        />

        {/* Groceries section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Groceries</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Category chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {['Pulses', 'Rice', 'Oil', 'Snacks'].map((cat, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.categoryChip, { backgroundColor: i === 0 ? '#FFF4E6' : '#F0F8FF' }]}
              onPress={() => router.push('/category/pulses' as any)}
            >
              <Text style={styles.categoryChipText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          {groceries.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.groceryRow}
              onPress={() => router.push(`/product/${product.id}` as any)}
            >
              <Image source={{ uri: product.image }} style={styles.groceryImage} resizeMode="contain" />
              <View style={styles.groceryInfo}>
                <Text style={styles.groceryName}>{product.name}</Text>
                <Text style={styles.groceryUnit}>{product.unit}, Priceg</Text>
                <View style={styles.groceryFooter}>
                  <Text style={styles.groceryPrice}>${product.price.toFixed(2)}</Text>
                  <TouchableOpacity style={styles.groceryAddBtn}>
                    <Ionicons name="add" size={22} color={Colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 16,
  },
  carrot: {
    fontSize: 32,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginLeft: 4,
  },
  studentInfo: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
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
  searchText: {
    color: Colors.gray,
    fontSize: 15,
    marginLeft: 8,
  },
  bannerList: {
    marginHorizontal: 24,
    borderRadius: 16,
  },
  bannerCard: {
    width: width - 48,
    height: 115,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.black,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  bannerImage: {
    width: 120,
    height: 110,
    borderRadius: 8,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 20,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  dotActive: {
    backgroundColor: Colors.primary,
    width: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  productList: {
    paddingHorizontal: 24,
    paddingBottom: 8,
    marginBottom: 24,
  },
  categoryScroll: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
  },
  groceryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    marginBottom: 14,
  },
  groceryImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  groceryInfo: {
    flex: 1,
  },
  groceryName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 4,
  },
  groceryUnit: {
    fontSize: 13,
    color: Colors.gray,
    marginBottom: 12,
  },
  groceryFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  groceryPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
  },
  groceryAddBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
