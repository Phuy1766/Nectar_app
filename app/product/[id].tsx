import { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
  ScrollView, Dimensions,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { PRODUCTS } from '@/constants/data';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[1];
  const [quantity, setQuantity] = useState(1);
  const [isFav, setIsFav] = useState(false);
  const [detailOpen, setDetailOpen] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.black} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="share-outline" size={22} color={Colors.black} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="contain" />
          {/* Image dots */}
          <View style={styles.imageDots}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={[styles.imageDot, i === 0 && styles.imageDotActive]} />
            ))}
          </View>
        </View>

        <View style={styles.body}>
          {/* Title + Fav */}
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productUnit}>{product.unit}, Price</Text>
            </View>
            <TouchableOpacity onPress={() => setIsFav(!isFav)} style={styles.favBtn}>
              <Ionicons
                name={isFav ? 'heart' : 'heart-outline'}
                size={26}
                color={isFav ? Colors.error : Colors.gray}
              />
            </TouchableOpacity>
          </View>

          {/* Quantity + Price */}
          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Ionicons name="remove" size={20} color={Colors.gray} />
            </TouchableOpacity>
            <View style={styles.qtyBox}>
              <Text style={styles.qtyText}>{quantity}</Text>
            </View>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity((q) => q + 1)}
            >
              <Ionicons name="add" size={20} color={Colors.primary} />
            </TouchableOpacity>
            <Text style={styles.totalPrice}>${(product.price * quantity).toFixed(2)}</Text>
          </View>

          <View style={styles.separator} />

          {/* Product Detail accordion */}
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => setDetailOpen(!detailOpen)}
          >
            <Text style={styles.accordionTitle}>Product Detail</Text>
            <Ionicons name={detailOpen ? 'chevron-up' : 'chevron-down'} size={20} color={Colors.black} />
          </TouchableOpacity>
          {detailOpen && (
            <Text style={styles.accordionBody}>{product.description}</Text>
          )}

          <View style={styles.separator} />

          {/* Nutritions row */}
          <TouchableOpacity style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nutritions</Text>
            <View style={styles.infoRight}>
              <View style={styles.nutritionBadge}>
                <Text style={styles.nutritionBadgeText}>100gr</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.black} />
            </View>
          </TouchableOpacity>

          <View style={styles.separator} />

          {/* Review row */}
          <TouchableOpacity style={styles.infoRow}>
            <Text style={styles.infoLabel}>Review</Text>
            <View style={styles.infoRight}>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Ionicons key={s} name="star" size={16} color={Colors.star} />
                ))}
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.black} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add to basket */}
      {addedToCart ? (
        <View style={styles.addedBar}>
          <View style={styles.addedLeft}>
            <Ionicons name="checkmark" size={20} color={Colors.white} />
            <Text style={styles.addedText}>Add to Cart</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.openCart}>Open Cart &gt;</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.basketButton}
          onPress={() => setAddedToCart(true)}
        >
          <Text style={styles.basketText}>Add To Basket</Text>
        </TouchableOpacity>
      )}
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconBtn: {
    padding: 4,
  },
  imageContainer: {
    backgroundColor: Colors.lightGray,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingVertical: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: width - 48,
    height: 220,
  },
  imageDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 6,
  },
  imageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  imageDotActive: {
    backgroundColor: Colors.primary,
    width: 20,
  },
  body: {
    paddingHorizontal: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 4,
  },
  productUnit: {
    fontSize: 15,
    color: Colors.gray,
  },
  favBtn: {
    padding: 4,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 16,
  },
  qtyBtn: {
    padding: 4,
  },
  qtyBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.black,
    marginLeft: 'auto',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
  },
  accordionBody: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 22,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
  },
  infoRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nutritionBadge: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  nutritionBadgeText: {
    fontSize: 12,
    color: Colors.gray,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  addedBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primaryLight,
    marginHorizontal: 24,
    marginBottom: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
  },
  addedLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  addedText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  openCart: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  basketButton: {
    backgroundColor: Colors.primary,
    marginHorizontal: 24,
    marginBottom: 24,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  basketText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
