import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Product, Category } from '../types';
import { Plus, Trash2, Edit, Sparkles, Loader2, Link as LinkIcon, BarChart3, TrendingUp, DollarSign } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const CATEGORIES: Category[] = ['Home Gadgets', 'Beauty', 'Tech', 'Kitchen', 'Lifestyle'];

export default function Admin() {
  const { products, addProduct, deleteProduct } = useStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [rawIdea, setRawIdea] = useState('');
  
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    description: '',
    price: 0,
    imageUrl: '',
    affiliateLink: '',
    category: 'Home Gadgets',
    isTrending: false,
  });

  const totalClicks = products.reduce((sum, p) => sum + p.clicks, 0);
  const totalSaves = products.reduce((sum, p) => sum + p.saves, 0);

  const handleGenerateAI = async () => {
    if (!rawIdea) {
      alert("Please enter a product idea or link first.");
      return;
    }
    
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `
        Act as an expert affiliate marketer and copywriter.
        I have this product idea/link: "${rawIdea}"
        
        Generate a highly engaging, SEO-optimized title (max 60 chars) and a compelling, benefit-driven description (max 200 chars) for a Pinterest-style product discovery app.
        
        Return ONLY a JSON object with this exact structure, no markdown formatting, no backticks:
        {
          "title": "The SEO Title Here",
          "description": "The compelling description here."
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || '';
      // Clean up potential markdown from response
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const result = JSON.parse(cleanedText);

      setFormData(prev => ({
        ...prev,
        title: result.title,
        description: result.description
      }));
    } catch (error) {
      console.error("AI Generation failed:", error);
      alert("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl || !formData.affiliateLink) {
      alert("Please fill in all required fields.");
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      title: formData.title!,
      description: formData.description || '',
      price: Number(formData.price) || 0,
      imageUrl: formData.imageUrl!,
      affiliateLink: formData.affiliateLink!,
      category: formData.category as Category || 'Lifestyle',
      isTrending: formData.isTrending || false,
      clicks: 0,
      saves: 0,
      createdAt: new Date().toISOString(),
    };

    addProduct(newProduct);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      price: 0,
      imageUrl: '',
      affiliateLink: '',
      category: 'Home Gadgets',
      isTrending: false,
    });
    setRawIdea('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage products, track affiliate clicks, and generate AI content.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl text-blue-600 dark:text-blue-400">
              <BarChart3 size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{products.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl text-green-600 dark:text-green-400">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Clicks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalClicks}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-rose-100 dark:bg-rose-900/30 p-3 rounded-xl text-rose-600 dark:text-rose-400">
              <Heart size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Saves</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalSaves}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Product Form */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Plus size={20} /> Add New Product
              </h2>
            </div>
            
            <div className="p-6">
              {/* AI Assistant Section */}
              <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                <label className="block text-sm font-medium text-indigo-900 dark:text-indigo-300 mb-2 flex items-center gap-2">
                  <Sparkles size={16} /> AI Copywriter
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={rawIdea}
                    onChange={(e) => setRawIdea(e.target.value)}
                    placeholder="Enter product idea or Amazon link..."
                    className="flex-1 rounded-lg border-indigo-200 dark:border-indigo-800 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
                  />
                  <button
                    onClick={handleGenerateAI}
                    disabled={isGenerating}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isGenerating ? <Loader2 size={16} className="animate-spin" /> : 'Generate'}
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:ring-rose-500 focus:border-rose-500 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:ring-rose-500 focus:border-rose-500 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                      className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:ring-rose-500 focus:border-rose-500 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
                      className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:ring-rose-500 focus:border-rose-500 dark:text-white"
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    placeholder="https://..."
                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:ring-rose-500 focus:border-rose-500 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Affiliate Link *</label>
                  <div className="flex relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      required
                      value={formData.affiliateLink}
                      onChange={(e) => setFormData({...formData, affiliateLink: e.target.value})}
                      placeholder="https://amazon.com/..."
                      className="w-full pl-10 rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:ring-rose-500 focus:border-rose-500 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isTrending"
                    checked={formData.isTrending}
                    onChange={(e) => setFormData({...formData, isTrending: e.target.checked})}
                    className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isTrending" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Mark as Trending 🔥
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-2.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors mt-4"
                >
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Manage Products</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">{products.length} total</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Stats</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={product.imageUrl} alt={product.title} className="w-10 h-10 rounded object-cover" />
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white line-clamp-1 max-w-[200px]">{product.title}</div>
                            <div className="text-xs text-gray-500">{product.category} {product.isTrending && '🔥'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 text-xs">
                          <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400"><ExternalLink size={12}/> {product.clicks} clicks</span>
                          <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400"><Heart size={12}/> {product.saves} saves</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400 p-2"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No products found. Add one to get started!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
