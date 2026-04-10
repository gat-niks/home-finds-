export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  affiliateLink: string;
  category: string;
  isTrending: boolean;
  clicks: number;
  saves: number;
  createdAt: string;
}

export type Category = 'All' | 'Home Gadgets' | 'Beauty' | 'Tech' | 'Kitchen' | 'Lifestyle';
