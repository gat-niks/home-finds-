import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';
import { initialProducts } from '../data/mockData';

interface AppState {
  products: Product[];
  wishlist: string[]; // Array of product IDs
  theme: 'light' | 'dark';
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleWishlist: (productId: string) => void;
  toggleTheme: () => void;
  recordClick: (productId: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      products: initialProducts,
      wishlist: [],
      theme: 'light',
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
      updateProduct: (id, updates) => set((state) => ({
        products: state.products.map((p) => p.id === id ? { ...p, ...updates } : p)
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        wishlist: state.wishlist.filter((wId) => wId !== id)
      })),
      toggleWishlist: (productId) => set((state) => {
        const isSaved = state.wishlist.includes(productId);
        // Also update the save count on the product
        const updatedProducts = state.products.map(p => {
          if (p.id === productId) {
            return { ...p, saves: isSaved ? Math.max(0, p.saves - 1) : p.saves + 1 };
          }
          return p;
        });

        return {
          wishlist: isSaved 
            ? state.wishlist.filter(id => id !== productId)
            : [...state.wishlist, productId],
          products: updatedProducts
        };
      }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      recordClick: (productId) => set((state) => ({
        products: state.products.map(p => p.id === productId ? { ...p, clicks: p.clicks + 1 } : p)
      }))
    }),
    {
      name: 'homefinds-storage',
    }
  )
);
