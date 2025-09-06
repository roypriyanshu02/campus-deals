import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database Types
export interface Product {
    id: string;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    seller_id: string;
    seller_name: string;
    created_at: string;
    condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
}

export interface User {
    id: string;
    name: string;
    email: string;
    campus: string;
    avatar: string;
    joined_date: string;
    role: 'student' | 'teacher' | 'staff';
    rating: number;
    review_count: number;
    phone: string;
}

export interface WishlistItem {
    id: string;
    user_id: string;
    product_id: string;
    added_date: string;
}

export interface Message {
    id: string;
    sender_id: string;
    receiver_id: string;
    product_id: string;
    message: string;
    timestamp: string;
    is_read: boolean;
}

export interface ChatThread {
    id: string;
    product_id: string;
    seller_id: string;
    buyer_id: string;
    last_message: string;
    last_message_time: string;
    created_at: string;
}

export interface Review {
    id: string;
    reviewer_id: string;
    reviewee_id: string;
    product_id: string;
    rating: number;
    comment: string;
    created_at: string;
}

// Categories
export const CATEGORIES = [
    'Textbooks',
    'Electronics',
    'Clothing',
    'Furniture',
    'Sports & Recreation',
    'Art & Crafts',
    'Music & Instruments',
    'Transportation',
    'Other'
];
