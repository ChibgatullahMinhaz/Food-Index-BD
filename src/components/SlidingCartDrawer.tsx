import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

interface SlidingCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
}

export const SlidingCartDrawer: React.FC<SlidingCartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [deliveryArea, setDeliveryArea] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0);
  const shippingFee = cartItems.length > 0 ? (deliveryArea === 'inside_dhaka' ? 60 : 120) : 0;
  const grandTotal = subtotal + shippingFee;

  // Free shipping threshold inside Dhaka = 1500 BDT
  const freeShippingThreshold = 1500;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-emerald-100 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#0F5132] text-white flex items-center justify-between border-b border-emerald-800">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-serif font-bold text-lg">Your Organic Cart</h2>
              <span className="bg-amber-400 text-emerald-950 font-black text-xs px-2 py-0.5 rounded-full ml-1">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-emerald-200 hover:text-white rounded-full hover:bg-emerald-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator Bar */}
          {cartItems.length > 0 && (
            <div className="bg-emerald-50 p-3 border-b border-emerald-100 text-xs">
              <div className="flex justify-between font-medium text-emerald-900 mb-1">
                <span>
                  {subtotal >= freeShippingThreshold ? (
                    <strong className="text-emerald-700">🎉 You qualify for FREE Dhaka Shipping!</strong>
                  ) : (
                    <>Add ৳{freeShippingThreshold - subtotal} more for FREE Dhaka Shipping!</>
                  )}
                </span>
                <span className="font-bold text-emerald-800">{progressPercent}%</span>
              </div>
              <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#0F5132] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-slate-700 text-lg">Your Cart is Empty</h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  Discover our pure Sundarban raw honey, organic ghee, nuts, and imported dates!
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2.5 bg-[#0F5132] text-white font-bold text-xs rounded-full shadow-md hover:bg-emerald-800 transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.imageUrls[0]}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0 bg-white"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                          title="Remove Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="inline-block bg-emerald-100 text-[#0F5132] text-[10px] font-bold px-2 py-0.5 rounded-md mt-0.5">
                        {item.selectedWeight}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Buttons */}
                      <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                          className="text-slate-600 hover:text-slate-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-xs font-mono w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="text-slate-600 hover:text-slate-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total Item Price */}
                      <span className="font-black text-sm text-[#0F5132] font-mono">
                        ৳{item.pricePerUnit * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3">
              
              {/* Delivery Area Option Toggle */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                  Delivery Region Fee Estimate:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDeliveryArea('inside_dhaka')}
                    className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                      deliveryArea === 'inside_dhaka'
                        ? 'bg-[#0F5132] text-white border-[#0F5132]'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    Inside Dhaka (৳60)
                  </button>
                  <button
                    onClick={() => setDeliveryArea('outside_dhaka')}
                    className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                      deliveryArea === 'outside_dhaka'
                        ? 'bg-[#0F5132] text-white border-[#0F5132]'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    Outside Dhaka (৳120)
                  </button>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900 font-mono">৳{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {subtotal >= freeShippingThreshold && deliveryArea === 'inside_dhaka'
                      ? 'FREE (৳0)'
                      : `৳${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-[#0F5132] border-t border-slate-200 pt-2">
                  <span>Grand Total</span>
                  <span className="font-mono text-lg">
                    ৳{subtotal >= freeShippingThreshold && deliveryArea === 'inside_dhaka'
                      ? subtotal
                      : grandTotal}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#0F5132] to-emerald-800 hover:from-emerald-800 hover:to-[#0F5132] text-white font-bold text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 group"
              >
                <span>Proceed to One-Page Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-medium pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cash on Delivery Guaranteed Nationwide</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
