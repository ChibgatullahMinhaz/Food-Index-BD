import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroBannerProps {
  onShopNowClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNowClick }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0F5132] via-[#0b3c25] to-emerald-950 text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Subtle Organic Patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFC107_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Copy & Conversion Offer */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-emerald-700/60 rounded-full px-3.5 py-1 text-xs text-amber-300 font-semibold shadow-inner">
              <Award className="w-4 h-4 text-amber-400" />
              <span>100% Guaranteed Pure & Organic Food in Bangladesh</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif leading-tight tracking-tight text-white">
              Authentic Raw Honey, <br />
              <span className="text-amber-400 underline decoration-amber-500/40 decoration-wavy">
                Pure Cow Ghee & Handpicked Nuts
              </span>
            </h1>

            <p className="text-slate-200 text-sm sm:text-base max-w-2xl leading-relaxed">
              Harvested directly from Sundarban forests, Pabna dairy farms, and Saudi date palm groves. 
              Unfiltered, chemical-free, and delivered fresh to your door with Cash on Delivery nationwide.
            </p>

            {/* Quick Benefits Bullet List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs text-emerald-100 font-medium">
              <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Zero Added Sugars</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Lab-Tested Purity</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>24-48h Dhaka Shipping</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-4">
              <button
                onClick={onShopNowClick}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-bold text-sm rounded-full shadow-lg hover:from-amber-300 hover:to-amber-400 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Order Pure Food Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="tel:01700000000"
                className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-sm rounded-full border border-white/20 transition-all text-center"
              >
                Call Hotline: 01700-000000
              </a>
            </div>

          </div>

          {/* Hero Visual Card / Offer Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative max-w-md w-full bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-6 rounded-2xl shadow-2xl space-y-4">
              
              <div className="relative rounded-xl overflow-hidden aspect-4/3 group">
                <img
                  src="https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80"
                  alt="Raw Sundarban Honey"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <span className="bg-amber-400 text-emerald-950 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider w-max mb-1">
                    Best Seller 🌟
                  </span>
                  <h3 className="font-serif font-bold text-lg text-white">Sundarban Natural Flower Honey</h3>
                  <p className="text-amber-300 text-xs font-semibold">Multiple Weight Variants Available (250g - 2kg)</p>
                </div>
              </div>

              {/* Special Offer Alert Box */}
              <div className="bg-[#D1E7DD] text-emerald-900 p-3 rounded-xl flex items-center justify-between text-xs font-medium border border-emerald-300">
                <div>
                  <span className="font-bold block text-emerald-950">🎉 Special Combo Discount</span>
                  <span>Buy Honey + Ghee to save ৳100 on shipping!</span>
                </div>
                <span className="bg-[#0F5132] text-white px-2.5 py-1 rounded-lg font-bold text-xs">
                  Save ৳100
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Four Pillars Trust Ribbon */}
        <div className="mt-12 pt-8 border-t border-emerald-800/80 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <ShieldCheck className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <h4 className="font-bold text-xs text-white">100% Pure Organic</h4>
              <p className="text-[11px] text-slate-300">No chemical processing</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <Truck className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <h4 className="font-bold text-xs text-white">Cash On Delivery</h4>
              <p className="text-[11px] text-slate-300">Pay after checking product</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <RotateCcw className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <h4 className="font-bold text-xs text-white">Easy Return</h4>
              <p className="text-[11px] text-slate-300">Instant exchange or refund</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <Award className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <h4 className="font-bold text-xs text-white">Trusted BD Brand</h4>
              <p className="text-[11px] text-slate-300">10,000+ happy customers</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
