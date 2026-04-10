import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';
import MasonryGrid from '../components/MasonryGrid';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { products, wishlist } = useStore();

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-rose-100 dark:bg-rose-500/20 p-3 rounded-full text-rose-500">
          <Heart size={24} className="fill-current" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Your Wishlist
        </h1>
      </div>

      {savedProducts.length > 0 ? (
        <MasonryGrid>
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </MasonryGrid>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <Heart size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Save your favorite viral finds here to easily find them later and keep track of what you want to buy.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-rose-500 hover:bg-rose-600 transition-colors"
          >
            Discover Products
          </Link>
        </div>
      )}
    </div>
  );
}
