import { Heart, ExternalLink, Share2, Flame } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { wishlist, toggleWishlist, recordClick } = useStore();
  const isSaved = wishlist.includes(product.id);

  const handleBuyClick = () => {
    recordClick(product.id);
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isTrending && (
            <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-900/90 text-rose-500 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <Flame size={12} className="fill-rose-500" />
              Trending
            </div>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => toggleWishlist(product.id)}
            className="p-2.5 bg-white/90 backdrop-blur-sm dark:bg-gray-900/90 rounded-full text-gray-700 dark:text-gray-200 hover:text-rose-500 dark:hover:text-rose-400 shadow-sm transition-colors"
          >
            <Heart size={18} className={cn(isSaved && "fill-rose-500 text-rose-500")} />
          </button>
          <button
            onClick={handleShare}
            className="p-2.5 bg-white/90 backdrop-blur-sm dark:bg-gray-900/90 rounded-full text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 shadow-sm transition-colors"
          >
            <Share2 size={18} />
          </button>
        </div>

        {/* Quick Buy Button Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
          <button
            onClick={handleBuyClick}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg"
          >
            Get it Now <ExternalLink size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight">
            {product.title}
          </h3>
          <span className="font-bold text-lg text-gray-900 dark:text-white whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
          <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md font-medium">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Heart size={12} className={cn(isSaved && "fill-rose-500 text-rose-500")} />
            <span>{product.saves} saves</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
