export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  sellerId: string;
  sellerName: string;
  createdAt: string;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
}

export interface User {
  id: string;
  name: string;
  email: string;
  campus: string;
  avatar: string;
  joinedDate: string;
  role: 'student' | 'teacher' | 'staff';
  rating: number;
  reviewCount: number;
  phone: string;
}

export interface WishlistItem {
  productId: string;
  addedDate: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  productId: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface ChatThread {
  id: string;
  productId: string;
  product: Product;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  buyerName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface Review {
  id: string;
  sellerId: string;
  buyerId: string;
  productId: string;
  rating: number;
  comment: string;
  date: string;
}

export const CATEGORIES = [
  'Snacks & Food',
  'Stationery',
  'Books & Notes',
  'Clothing & Shoes',
  'Electronics',
  'Sports Equipment',
  'Hostel Items',
  'Study Materials',
  'Other'
];

export const dummyUser: User = {
  id: '1',
  name: 'Arjun Sharma',
  email: 'arjun.sharma@university.edu',
  campus: 'IIT Delhi',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  joinedDate: '2024-01-15',
  role: 'student',
  rating: 4.7,
  reviewCount: 23,
  phone: '+91-9876543210'
};

export const dummyProducts: Product[] = [
  {
    id: '1',
    title: 'Kurkure Family Pack (5 packs)',
    price: 150,
    category: 'Snacks & Food',
    description: 'Fresh Kurkure family pack with 5 different flavors. Perfect for late night study sessions!',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop',
    sellerId: '2',
    sellerName: 'Priya Patel',
    createdAt: '2024-02-01',
    condition: 'new'
  },
  {
    id: '2',
    title: 'Physics Reference Book - HC Verma',
    price: 450,
    category: 'Books & Notes',
    description: 'Concepts of Physics Part 1 & 2 by HC Verma. Excellent condition with minimal markings.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop',
    sellerId: '3',
    sellerName: 'Rahul Kumar',
    createdAt: '2024-02-03',
    condition: 'good'
  },
  {
    id: '3',
    title: 'Nike Air Force 1 (Size 9)',
    price: 2500,
    category: 'Clothing & Shoes',
    description: 'Authentic Nike Air Force 1 in white. Size 9 UK. Gently used, perfect for campus wear.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
    sellerId: '4',
    sellerName: 'Amit Singh',
    createdAt: '2024-02-05',
    condition: 'good'
  },
  {
    id: '4',
    title: 'Engineering Handwritten Notes Bundle',
    price: 300,
    category: 'Study Materials',
    description: 'Complete semester notes for Computer Science Engineering. Covers DSA, OS, DBMS, and Networks.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=300&fit=crop',
    sellerId: '5',
    sellerName: 'Deepika Rao',
    createdAt: '2024-02-07',
    condition: 'like-new'
  },
  {
    id: '5',
    title: 'Samsung Galaxy Buds Pro',
    price: 3500,
    category: 'Electronics',
    description: 'Barely used Samsung Galaxy Buds Pro with active noise cancellation. Includes original case and charging cable.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop',
    sellerId: '6',
    sellerName: 'Vikash Gupta',
    createdAt: '2024-02-10',
    condition: 'like-new'
  },
  {
    id: '6',
    title: 'Study Table with Storage',
    price: 1500,
    category: 'Hostel Items',
    description: 'Compact study table perfect for hostel rooms. Includes storage compartments and cable management.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
    sellerId: '7',
    sellerName: 'Meera Joshi',
    createdAt: '2024-02-12',
    condition: 'good'
  },
  {
    id: '7',
    title: 'Parker Pen Set (Blue & Black)',
    price: 200,
    category: 'Stationery',
    description: 'Premium Parker pen set with blue and black refills. Perfect for exams and assignments.',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=300&h=300&fit=crop',
    sellerId: '8',
    sellerName: 'Rohit Sharma',
    createdAt: '2024-02-14',
    condition: 'like-new'
  },
  {
    id: '8',
    title: 'Cricket Kit (Bat, Ball, Pads)',
    price: 3200,
    category: 'Sports Equipment',
    description: 'Complete cricket kit with Kashmir willow bat, leather ball, and protective gear. Great for campus tournaments.',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=300&h=300&fit=crop',
    sellerId: '9',
    sellerName: 'Karan Malhotra',
    createdAt: '2024-02-16',
    condition: 'good'
  }
];

export const dummyWishlistItems: WishlistItem[] = [
  { productId: '2', addedDate: '2024-02-15' },
  { productId: '4', addedDate: '2024-02-16' },
  { productId: '7', addedDate: '2024-02-17' }
];

export const dummyChatThreads: ChatThread[] = [
  {
    id: 'c1',
    productId: '2',
    product: dummyProducts[1],
    sellerId: '3',
    sellerName: 'Rahul Kumar',
    buyerId: '1',
    buyerName: 'Arjun Sharma',
    lastMessage: 'Is the book still available?',
    lastMessageTime: '2024-02-18T10:30:00Z',
    unreadCount: 1
  },
  {
    id: 'c2',
    productId: '5',
    product: dummyProducts[4],
    sellerId: '6',
    sellerName: 'Vikash Gupta',
    buyerId: '1',
    buyerName: 'Arjun Sharma',
    lastMessage: 'Can we meet at Central Library?',
    lastMessageTime: '2024-02-17T15:45:00Z',
    unreadCount: 0
  }
];

export const dummyMessages: Message[] = [
  {
    id: 'm1',
    senderId: '1',
    receiverId: '3',
    productId: '2',
    message: 'Hi! Is the HC Verma book still available?',
    timestamp: '2024-02-18T10:30:00Z',
    isRead: false
  },
  {
    id: 'm2',
    senderId: '3',
    receiverId: '1',
    productId: '2',
    message: 'Yes, it\'s available. Are you interested?',
    timestamp: '2024-02-18T10:35:00Z',
    isRead: true
  }
];

export const dummyReviews: Review[] = [
  {
    id: 'r1',
    sellerId: '3',
    buyerId: '1',
    productId: '2',
    rating: 5,
    comment: 'Great seller! Book was in excellent condition as described.',
    date: '2024-02-10'
  },
  {
    id: 'r2',
    sellerId: '6',
    buyerId: '1',
    productId: '5',
    rating: 4,
    comment: 'Quick response and fair pricing. Recommended!',
    date: '2024-02-08'
  }
];

export const dummyUserListings: Product[] = [
  {
    id: '9',
    title: 'Maggi Noodles Bulk Pack (12 packets)',
    price: 144,
    category: 'Snacks & Food',
    description: 'Fresh Maggi noodles bulk pack. Perfect for hostel life! Expires in 6 months.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop',
    sellerId: '1',
    sellerName: 'Arjun Sharma',
    createdAt: '2024-02-01',
    condition: 'new'
  },
  {
    id: '10',
    title: 'Logitech Wireless Mouse',
    price: 800,
    category: 'Electronics',
    description: 'Logitech M705 wireless mouse with 3-year battery life. Perfect for laptop users.',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop',
    sellerId: '1',
    sellerName: 'Arjun Sharma',
    createdAt: '2024-01-28',
    condition: 'good'
  }
];