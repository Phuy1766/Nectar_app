import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="product/[id]" options={{ presentation: 'card' }} />
          <Stack.Screen name="category/[name]" options={{ presentation: 'card' }} />
          <Stack.Screen name="search" options={{ presentation: 'card' }} />
          <Stack.Screen
            name="checkout"
            options={{ presentation: 'transparentModal', animation: 'slide_from_bottom' }}
          />
          <Stack.Screen name="order-accepted" options={{ presentation: 'card' }} />
          <Stack.Screen name="orders" options={{ presentation: 'card' }} />
        </Stack>
      </CartProvider>
    </AuthProvider>
  );
}
