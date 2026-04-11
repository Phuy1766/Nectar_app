import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  USER: '@nectar:user',
  TOKEN: '@nectar:token',
  CART: '@nectar:cart',
  ORDERS: '@nectar:orders',
} as const;

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  loginAt: number;
}

export interface CartItem {
  id: string;
  name: string;
  unit: string;
  price: number;
  image: string;
  qty: number;
}

export interface OrderItem {
  id: string;
  createdAt: number;
  items: CartItem[];
  total: number;
  deliveryMethod?: string;
  paymentMethod?: string;
}

/* ---------------- USER / AUTH ---------------- */

export async function saveUser(user: StoredUser, token: string): Promise<void> {
  try {
    await AsyncStorage.multiSet([
      [STORAGE_KEYS.USER, JSON.stringify(user)],
      [STORAGE_KEYS.TOKEN, token],
    ]);
  } catch (err) {
    console.error('saveUser error:', err);
    throw err;
  }
}

export async function getUser(): Promise<StoredUser | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch (err) {
    console.error('getUser error:', err);
    return null;
  }
}

export async function getToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
  } catch (err) {
    console.error('getToken error:', err);
    return null;
  }
}

export async function clearAuth(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER,
      STORAGE_KEYS.TOKEN,
      STORAGE_KEYS.CART,
      STORAGE_KEYS.ORDERS,
    ]);
  } catch (err) {
    console.error('clearAuth error:', err);
    throw err;
  }
}

/* ---------------- CART ---------------- */

export async function saveCart(items: CartItem[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
  } catch (err) {
    console.error('saveCart error:', err);
    throw err;
  }
}

export async function getCart(): Promise<CartItem[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.CART);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch (err) {
    console.error('getCart error:', err);
    return [];
  }
}

export async function clearCart(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.CART);
  } catch (err) {
    console.error('clearCart error:', err);
  }
}

/* ---------------- ORDERS ---------------- */

export async function getOrders(): Promise<OrderItem[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.ORDERS);
    return raw ? (JSON.parse(raw) as OrderItem[]) : [];
  } catch (err) {
    console.error('getOrders error:', err);
    return [];
  }
}

export async function addOrder(order: OrderItem): Promise<void> {
  try {
    const existing = await getOrders();
    const next = [order, ...existing];
    await AsyncStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(next));
  } catch (err) {
    console.error('addOrder error:', err);
    throw err;
  }
}
