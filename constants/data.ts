export interface Product {
  id: string;
  name: string;
  unit: string;
  price: number;
  image: string;
  category: string;
  brand?: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  bgColor: string;
  borderColor: string;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    unit: '12kg',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
    category: 'fruits',
    brand: 'Individual Collection',
    description: 'Fresh organic bananas, perfect for breakfast or smoothies. Rich in potassium and vitamins.',
  },
  {
    id: '2',
    name: 'Red Apple',
    unit: '1kg',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
    category: 'fruits',
    brand: 'Individual Collection',
    description: 'Apples Are Nutritious. Apples May Be Good For Weight Loss. Apples May Be Good For Your Heart.',
  },
  {
    id: '3',
    name: 'Bell Pepper Red',
    unit: '1kg',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400',
    category: 'vegetables',
    brand: 'Individual Collection',
    description: 'Fresh red bell peppers, great for salads and cooking.',
  },
  {
    id: '4',
    name: 'Ginger',
    unit: '250gm',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400',
    category: 'vegetables',
    brand: 'Kazi Farmas',
    description: 'Fresh ginger root, perfect for cooking and teas.',
  },
  {
    id: '5',
    name: 'Beef Bone',
    unit: '1kg',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400',
    category: 'meat',
    brand: 'Individual Collection',
    description: 'Fresh beef bone, great for soups and stews.',
  },
  {
    id: '6',
    name: 'Broiler Chicken',
    unit: '1kg',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400',
    category: 'meat',
    brand: 'Individual Collection',
    description: 'Fresh broiler chicken, great for grilling and frying.',
  },
  {
    id: '7',
    name: 'Diet Coke',
    unit: '355ml',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400',
    category: 'beverages',
    brand: 'Cocola',
    description: 'Refreshing diet cola with zero sugar.',
  },
  {
    id: '8',
    name: 'Sprite Can',
    unit: '325ml',
    price: 1.50,
    image: 'https://images.unsplash.com/photo-1624552184280-9e9b7063f1a3?w=400',
    category: 'beverages',
    brand: 'Cocola',
    description: 'Crisp lemon-lime soda.',
  },
  {
    id: '9',
    name: 'Apple & Grape Juice',
    unit: '2L',
    price: 15.50,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
    category: 'beverages',
    brand: 'Ifad',
    description: 'Natural apple and grape blend juice.',
  },
  {
    id: '10',
    name: 'Orange Juice',
    unit: '2L',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400',
    category: 'beverages',
    brand: 'Ifad',
    description: 'Fresh squeezed orange juice, no added sugar.',
  },
  {
    id: '11',
    name: 'Coca Cola Can',
    unit: '325ml',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400',
    category: 'beverages',
    brand: 'Cocola',
    description: 'Classic Coca-Cola in a refreshing can.',
  },
  {
    id: '12',
    name: 'Pepsi Can',
    unit: '330ml',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400',
    category: 'beverages',
    brand: 'Cocola',
    description: 'Classic Pepsi cola in a refreshing can.',
  },
  {
    id: '13',
    name: 'Egg Chicken Red',
    unit: '4pcs',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400',
    category: 'eggs',
    brand: 'Individual Collection',
    description: 'Fresh red chicken eggs, farm-raised and organic.',
  },
  {
    id: '14',
    name: 'Egg Chicken White',
    unit: '180g',
    price: 1.50,
    image: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=400',
    category: 'eggs',
    brand: 'Individual Collection',
    description: 'Fresh white chicken eggs, perfect for baking and cooking.',
  },
  {
    id: '15',
    name: 'Egg Pasta',
    unit: '30gm',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400',
    category: 'noodles',
    brand: 'Cocola',
    description: 'Premium egg pasta, perfect for Italian dishes.',
  },
  {
    id: '16',
    name: 'Egg Noodles',
    unit: '2L',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400',
    category: 'noodles',
    brand: 'Cocola',
    description: 'Authentic Asian egg noodles, quick and easy to cook.',
  },
  {
    id: '17',
    name: 'Mayonnaise Eggless',
    unit: '325ml',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1587131782738-de30ea91a542?w=400',
    category: 'condiments',
    brand: 'Kazi Farmas',
    description: 'Creamy eggless mayonnaise, great for sandwiches and salads.',
  },
  {
    id: '18',
    name: 'Egg Noodles Pack',
    unit: '500g',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400',
    category: 'noodles',
    brand: 'Ifad',
    description: 'Family pack egg noodles, great value.',
  },
];

export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Fresh Fruits\n& Vegetable',
    image: 'https://images.unsplash.com/photo-1490885578174-acda8905c2c6?w=300',
    bgColor: '#F4F9F0',
    borderColor: '#B3E5C5',
  },
  {
    id: '2',
    name: 'Cooking Oil\n& Ghee',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300',
    bgColor: '#FFF8F0',
    borderColor: '#F8C89B',
  },
  {
    id: '3',
    name: 'Meat & Fish',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300',
    bgColor: '#FFF0F0',
    borderColor: '#F8B4B4',
  },
  {
    id: '4',
    name: 'Bakery\n& Snacks',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300',
    bgColor: '#F8F0FF',
    borderColor: '#D4B4F8',
  },
  {
    id: '5',
    name: 'Dairy & Eggs',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300',
    bgColor: '#FFFFF0',
    borderColor: '#F8F0A0',
  },
  {
    id: '6',
    name: 'Beverages',
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=300',
    bgColor: '#F0F8FF',
    borderColor: '#B4D4F8',
  },
  {
    id: '7',
    name: 'Pulses',
    image: 'https://images.unsplash.com/photo-1515543904379-3d757abe528f?w=300',
    bgColor: '#FFF4E6',
    borderColor: '#F8D4A0',
  },
  {
    id: '8',
    name: 'Rice',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=300',
    bgColor: '#F0FFF4',
    borderColor: '#A0F8B4',
  },
];

export const BANNERS = [
  {
    id: '1',
    title: 'Fresh Vegetables',
    subtitle: 'Get Up To 40% OFF',
    bgColor: '#F4F9F0',
    image: 'https://images.unsplash.com/photo-1490885578174-acda8905c2c6?w=400',
  },
  {
    id: '2',
    title: 'Fresh Fruits',
    subtitle: 'Buy 2 Get 1 Free',
    bgColor: '#FFF8F0',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
  },
  {
    id: '3',
    title: 'Organic Meat',
    subtitle: 'Save Up To 30%',
    bgColor: '#FFF0F0',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400',
  },
];

export const FILTER_CATEGORIES = ['Eggs', 'Noodles & Pasta', 'Chips & Crisps', 'Fast Food'];
export const FILTER_BRANDS = ['Individual Collection', 'Cocola', 'Ifad', 'Kazi Farmas'];

export const ZONES = ['Banasree', 'Gulshan', 'Dhanmondi', 'Uttara', 'Mirpur', 'Mohammadpur'];
export const AREAS = ['Block A', 'Block B', 'Block C', 'Block D', 'Block E'];
