import { supabase } from './supabase';
import type { Product, User, WishlistItem, Message, ChatThread, Review } from './supabase';

// Product Services
export const productService = {
    async getAll(): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    async getById(id: string): Promise<Product | null> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    async getByCategory(category: string): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('category', category)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    async getBySeller(sellerId: string): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('seller_id', sellerId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    async create(product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
        const { data, error } = await supabase
            .from('products')
            .insert(product)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async update(id: string, updates: Partial<Product>): Promise<Product> {
        const { data, error } = await supabase
            .from('products')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    async search(query: string): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }
};

// User Services
export const userService = {
    async getById(id: string): Promise<User | null> {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    async getCurrentUser(): Promise<User | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        return await this.getById(user.id);
    },

    async create(user: Omit<User, 'joined_date' | 'rating' | 'review_count'>): Promise<User> {
        const { data, error } = await supabase
            .from('users')
            .insert(user)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async update(id: string, updates: Partial<User>): Promise<User> {
        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};

// Wishlist Services
export const wishlistService = {
    async getUserWishlist(userId: string): Promise<WishlistItem[]> {
        const { data, error } = await supabase
            .from('wishlist')
            .select('*')
            .eq('user_id', userId)
            .order('added_date', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    async addToWishlist(userId: string, productId: string): Promise<WishlistItem> {
        const { data, error } = await supabase
            .from('wishlist')
            .insert({ user_id: userId, product_id: productId })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async removeFromWishlist(userId: string, productId: string): Promise<void> {
        const { error } = await supabase
            .from('wishlist')
            .delete()
            .eq('user_id', userId)
            .eq('product_id', productId);

        if (error) throw error;
    },

    async isInWishlist(userId: string, productId: string): Promise<boolean> {
        const { data, error } = await supabase
            .from('wishlist')
            .select('id')
            .eq('user_id', userId)
            .eq('product_id', productId)
            .single();

        return !error && data !== null;
    }
};

// Message Services
export const messageService = {
    async getThreadMessages(productId: string, sellerId: string, buyerId: string): Promise<Message[]> {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('product_id', productId)
            .or(`and(sender_id.eq.${sellerId},receiver_id.eq.${buyerId}),and(sender_id.eq.${buyerId},receiver_id.eq.${sellerId})`)
            .order('timestamp', { ascending: true });

        if (error) throw error;
        return data || [];
    },

    async sendMessage(message: Omit<Message, 'id' | 'timestamp' | 'is_read'>): Promise<Message> {
        const { data, error } = await supabase
            .from('messages')
            .insert(message)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async markAsRead(messageId: string): Promise<void> {
        const { error } = await supabase
            .from('messages')
            .update({ is_read: true })
            .eq('id', messageId);

        if (error) throw error;
    }
};

// Chat Thread Services
export const chatThreadService = {
    async getUserThreads(userId: string): Promise<ChatThread[]> {
        const { data, error } = await supabase
            .from('chat_threads')
            .select('*')
            .or(`seller_id.eq.${userId},buyer_id.eq.${userId}`)
            .order('last_message_time', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    async createOrUpdateThread(thread: Omit<ChatThread, 'id' | 'created_at'>): Promise<ChatThread> {
        const { data, error } = await supabase
            .from('chat_threads')
            .upsert(thread, { onConflict: 'product_id,seller_id,buyer_id' })
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};

// Review Services
export const reviewService = {
    async getSellerReviews(sellerId: string): Promise<Review[]> {
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .eq('reviewee_id', sellerId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    async createReview(review: Omit<Review, 'id' | 'created_at'>): Promise<Review> {
        const { data, error } = await supabase
            .from('reviews')
            .insert(review)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};

// Auth Services
export const authService = {
    async signUp(email: string, password: string, userData: Partial<User>) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) throw error;

        if (data.user) {
            // Create user profile
            await userService.create({
                id: data.user.id,
                name: userData.name || '',
                email: email,
                campus: userData.campus || '',
                avatar: userData.avatar || '',
                role: userData.role || 'student',
                phone: userData.phone || ''
            });
        }

        return data;
    },

    async signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        return data;
    },

    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    async getCurrentSession() {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        return data.session;
    }
};
