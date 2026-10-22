import React, { useState } from 'react';
import { Product } from '../types';
import { Star, ShoppingCart, Zap, Check, Eye, MapPin } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, selectedWeight: string, pricePerUnit: number) => void;
  onQuickBuy: (product: Product, selectedWeight: string, pricePerUnit: number) => void;
  onOpenQuickView: (product: Product) => void;
}

// Utility function to compute dynamic price based on weight selection
export function calculateWeightPrice(basePrice: number, weightOption: string): number {
  const normalized = weightOption.toLowerCase().trim();
  
  if (normalized.includes('250g')) {
    return Math.round(basePrice * 0.58);
  } else if (normalized.includes('500g')) {
    return basePrice;
  } else if (normalized.includes('1kg') || normalized.includes('1 liter') || normalized.includes('1l')) {
    return Math.round(basePrice * 1.88);
  } else if (normalized.includes('2kg') || normalized.includes('2 liter') || normalized.includes('2l')) {
    return Math.round(basePrice * 3.65);
  } else if (normalized.includes('5kg') || normalized.includes('5 liter') || normalized.includes('5l')) {
    return Math.round(basePrice * 8.5);
  }
  
  return basePrice;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickBuy,
  onOpenQuickView,
}) => {
  // Default selected weight option (first available or 500g/1kg)
  const defaultWeight = product.weightOptions && product.weightOptions.length > 0
    ? product.weightOptions[0]
    : "500g";

  const [selectedWeight, setSelectedWeight] = useState<string>(defaultWeight);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Dynamic calculated price for the active selected weight option
  const currentPrice = calculateWeightPrice(product.price, selectedWeight);
  
  // Calculate discount if salePrice exists
  const currentSalePrice = product.salePrice 
    ? calculateWeightPrice(product.salePrice, selectedWeight) 
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedWeight, currentSalePrice || currentPrice);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickBuy(product, selectedWeight, currentSalePrice || currentPrice);
  };

  return (
    <div 
      onClick={() => onOpenQuickView(product)}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between overflow-hidden cursor-pointer relative"
    >
      <div>
        {/* Product Image Container */}
        <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
          <img
            src={product.imageUrls[0] || "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80"}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
            {product.salePrice && (
              <span className="bg-rose-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
                Sale ৳{product.price - product.salePrice} Off
              </span>
            )}
            {product.isFeatured && (
              <span className="bg-amber-400 text-emerald-950 font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
                Featured 🌟
              </span>
            )}
          </div>

          {/* Quick View Button on Hover */}
          <button
            onClick={(e) => { e.stopPropagation(); onOpenQuickView(product); }}
            className="absolute bottom-2.5 right-2.5 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
            title="Quick View Details"
          >
            <Eye className="w-4 h-4 text-[#0F5132]" />
          </button>
        </div>

        {/* Product Info Section */}
        <div className="p-4 space-y-3">
          
          {/* Rating Stars & Origin */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.9</span>
              <span className="text-slate-400 font-normal text-[11px]">(120+ reviews)</span>
            </div>

            {product.origin && (
              <div className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium truncate max-w-[130px]">
                <MapPin className="w-3 h-3 shrink-0 text-emerald-600" />
                <span className="truncate">{product.origin}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-slate-900 text-sm sm:text-base group-hover:text-[#0F5132] transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
            {product.title}
          </h3>

          {/* Dynamic Weight/Volume Option Selector */}
          <div className="space-y-1" onClick={(e) => e.stopPropagation()}>
            <label className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">
              Select Quantity Variant:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {product.weightOptions.map((weight) => {
                const isSelected = selectedWeight === weight;
                return (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#0F5132] text-white shadow-xs ring-1 ring-[#0F5132]'
                        : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-[#0F5132]'
                    }`}
                  >
                    {weight}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Calculation Display */}
          <div className="pt-2 flex items-baseline gap-2 border-t border-slate-100">
            <span className="text-xl font-black text-[#0F5132] font-mono">
              ৳{currentSalePrice || currentPrice}
            </span>
            {currentSalePrice && (
              <span className="text-xs text-slate-400 line-through font-mono">
                ৳{currentPrice}
              </span>
            )}
            <span className="text-[11px] text-slate-500 font-medium ml-auto">
              For ({selectedWeight})
            </span>
          </div>

        </div>
      </div>

      {/* Action Buttons: Add to Cart & Quick Order */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleAddToCart}
          className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs ${
            addedAnimation
              ? 'bg-emerald-600 text-white'
              : 'bg-emerald-50 text-[#0F5132] hover:bg-emerald-100 border border-emerald-200'
          }`}
        >
          {addedAnimation ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>

        <button
          onClick={handleQuickBuy}
          className="py-2 px-3 rounded-xl font-bold text-xs bg-[#0F5132] hover:bg-emerald-800 text-white flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Quick Buy</span>
        </button>
      </div>
    </div>
  );
};
