import { Target, TrendingUp, Users, Search, Share2, DollarSign } from 'lucide-react';

export default function Strategy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Growth Strategy to 100k Users
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          The blueprint for scaling HomeFinds through organic social and SEO.
        </p>
      </div>

      <div className="space-y-12">
        {/* Phase 1 */}
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Share2 size={120} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 w-10 h-10 rounded-full flex items-center justify-center text-lg">1</span>
            TikTok & Instagram Reels (Viral Engine)
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Content Strategy</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                  <span><strong>"TikTok Made Me Buy It" format:</strong> Fast-paced, problem-solution videos showing the product in action.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                  <span><strong>Faceless aesthetic videos:</strong> ASMR unboxing, satisfying home organization, and room makeovers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                  <span><strong>Call to Action:</strong> "Link in bio to get yours" directing traffic to the specific product page on HomeFinds.</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Goal</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Post 2-3 times daily. Aim for 1 viral video (1M+ views) per month, which typically converts to 10k-20k site visitors.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-rose-600 dark:text-rose-400">
                <TrendingUp size={16} /> Expected Traffic: 40k/month
              </div>
            </div>
          </div>
        </section>

        {/* Phase 2 */}
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Target size={120} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 w-10 h-10 rounded-full flex items-center justify-center text-lg">2</span>
            Pinterest (Evergreen Traffic)
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Content Strategy</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span><strong>Idea Pins:</strong> Repurpose TikTok/Reels content into Idea Pins for massive reach.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span><strong>Aesthetic Collages:</strong> Create "Room Inspo" or "Morning Routine" collages featuring multiple products.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span><strong>Automated Pinning:</strong> Use tools to pin 10-15 times a day linking directly to HomeFinds categories.</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Goal</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Build a Pinterest account with 5M+ monthly views. Pinterest traffic is highly intent-driven and converts well for e-commerce.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                <Users size={16} /> Expected Traffic: 35k/month
              </div>
            </div>
          </div>
        </section>

        {/* Phase 3 */}
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Search size={120} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 w-10 h-10 rounded-full flex items-center justify-center text-lg">3</span>
            Programmatic SEO (Long-tail)
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Content Strategy</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  <span><strong>AI-Generated Pages:</strong> Use the Gemini AI integration to generate thousands of unique product descriptions and SEO titles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  <span><strong>Gift Guides:</strong> Create dynamic pages like "Best Tech Gifts for Him Under $50".</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  <span><strong>Rich Snippets:</strong> Ensure product schema markup is used so prices and ratings show in Google search.</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Goal</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Rank for long-tail keywords with low competition but high purchase intent.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                <Search size={16} /> Expected Traffic: 25k/month
              </div>
            </div>
          </div>
        </section>

        {/* Monetization */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-950 rounded-3xl p-8 text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <DollarSign className="text-emerald-400" />
            Monetization Stack
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
              <h3 className="font-semibold text-emerald-400 mb-2">Amazon Associates</h3>
              <p className="text-sm text-gray-300">Primary income. 1-10% commission on all purchases made within 24 hours of clicking.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
              <h3 className="font-semibold text-emerald-400 mb-2">Display Ads</h3>
              <p className="text-sm text-gray-300">Mediavine or AdThrive once traffic hits 50k sessions/mo. High RPMs for lifestyle traffic.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
              <h3 className="font-semibold text-emerald-400 mb-2">Sponsored Placements</h3>
              <p className="text-sm text-gray-300">Charge brands $100-$500 to be featured in the "Trending Now" section.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
              <h3 className="font-semibold text-emerald-400 mb-2">Newsletter</h3>
              <p className="text-sm text-gray-300">Collect emails for "Weekly Viral Finds". Monetize via sponsorships and direct affiliate links.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
