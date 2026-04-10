import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';
import MasonryGrid from '../components/MasonryGrid';
import { useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Category } from '../types';

const CATEGORIES: Category[] = ['All', 'Home Gadgets', 'Beauty', 'Tech', 'Kitchen', 'Lifestyle'];

export default function Home() {
  const { products, searchQuery } = useStore();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  
  const filterTrending = searchParams.get('filter') === 'trending';

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (filterTrending && !p.isTrending) return false;
      if (activeCategory !== 'All' && p.category !== activeCategory) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
      }
      return true;
    });
  }, [products, filterTrending, activeCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {filterTrending ? 'Trending Now \uD83D\uDD25' : 'Discover Viral Finds \u2728'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          Curated selection of the internet's most viral and useful products. 
          Updated daily with the best finds from TikTok, Instagram, and Pinterest.
        </p>
      </div>

      {/* Categories Filter */}
      {!filterTrending && (
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 scrollbar-hide">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <MasonryGrid>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </MasonryGrid>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
