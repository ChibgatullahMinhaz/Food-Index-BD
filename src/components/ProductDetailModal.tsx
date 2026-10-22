import React, { useState } from 'react';
import { Product } from '../types';
import { calculateWeightPrice } from './ProductCard';
import { X, Star, ShoppingCart, Zap, Check, ShieldCheck, MapPin, Truck, Plus, Minus } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedWeight: string, pricePerUnit: number, quantity: number) => void;
  onQuickBuy: (product: Product, selectedWeight: string, pricePerUnit: number, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onQuickBuy,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState<string>(
    product.weightOptions[0] || "500g"
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  const currentPrice = calculateWeightPrice(product.price, selectedWeight);
  const currentSalePrice = product.salePrice
    ? calculateWeightPrice(product.salePrice, selectedWeight)
    : null;

  const unitPrice = currentSalePrice || currentPrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    onAddToCart(product, selectedWeight, unitPrice, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleQuickBuy = () => {
    onQuickBuy(product, selectedWeight, unitPrice, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row border border-emerald-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 text-slate-400 hover:text-slate-800 bg-white/80 backdrop-blur-xs rounded-full shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Images Gallery */}
        <div className="md:w-1/2 p-6 bg-slate-50 flex flex-col justify-between border-r border-slate-100">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-xs border border-slate-200">
            <img
              src={product.imageUrls[activeImageIndex] || product.imageUrls[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {product.salePrice && (
              <span className="absolute top-3 left-3 bg-rose-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-full uppercase shadow-sm">
                Special Offer
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.imageUrls.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {product.imageUrls.map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === idx ? 'border-[#0F5132] ring-2 ring-[#0F5132]/30 scale-105' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Quality Guarantee Badge */}
          <div className="mt-4 p-3 bg-emerald-50 rounded-xl flex items-center gap-2 text-xs text-emerald-900 border border-emerald-200">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>Tested for 100% organic purity with zero artificial additives or sugar syrup.</span>
          </div>
        </div>

        {/* Product Info & Purchase Form */}
        <div className="md:w-1/2 p-6 overflow-y-auto space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="bg-emerald-100 text-[#0F5132] font-bold px-2 py-0.5 rounded-full uppercase text-[10px]">
                Organic Verified
              </span>
              {product.origin && (
                <span className="flex items-center gap-1 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {product.origin}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 leading-tight">
              {product.title}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700">4.9 / 5.0</span>
              <span className="text-xs text-slate-400">(154 verified customers)</span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <span className="text-2xl font-black text-[#0F5132] font-mono">
                ৳{totalPrice}
              </span>
              {currentSalePrice && (
                <span className="text-sm text-slate-400 line-through font-mono">
                  ৳{currentPrice * quantity}
                </span>
              )}
              <span className="text-xs text-slate-500 ml-auto">
                Selected: <strong className="text-slate-800">{selectedWeight}</strong> x {quantity}
              </span>
            </div>

            {/* Description */}
            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Health Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <div className="mt-3 space-y-1.5">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Health Benefits & Features:
                </span>
                <ul className="text-xs text-slate-600 space-y-1">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Weight Variant Selector */}
            <div className="mt-4 space-y-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Choose Weight / Size Variant:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.weightOptions.map((weight) => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                      selectedWeight === weight
                        ? 'bg-[#0F5132] text-white ring-2 ring-[#0F5132]/30 shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-emerald-50'
                    }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-4 flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold text-sm font-mono w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Action CTA Buttons */}
          <div className="pt-4 space-y-2 border-t border-slate-100">
            <button
              onClick={handleQuickBuy}
              className="w-full py-3 px-4 bg-[#0F5132] hover:bg-emerald-800 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Buy Now (৳{totalPrice})</span>
            </button>

            <button
              onClick={handleAddToCart}
              className={`w-full py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-[#0F5132] hover:bg-emerald-100 border border-emerald-300'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
