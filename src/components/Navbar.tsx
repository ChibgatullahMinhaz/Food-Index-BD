import React, { useState } from 'react';
import { ShoppingBag, Search, Phone, ShieldCheck, UserCheck, LayoutDashboard, Store, Sparkles, X, Menu } from 'lucide-react';
import { Category, Role } from '../types';

interface NavbarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  role: Role;
  onToggleRole: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  role,
  onToggleRole,
  searchQuery,
  onSearchChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-emerald-100 shadow-xs">
      {/* Top Banner Bar */}
      <div className="bg-[#0F5132] text-white text-xs font-medium py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center">
            <span className="bg-amber-400 text-emerald-950 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
              Flash Delivery
            </span>
            <span>⚡ Express Cash On Delivery Across Bangladesh! Inside Dhaka ৳60 | Outside Dhaka ৳120</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-normal">
            <a href="tel:01700000000" className="flex items-center gap-1 hover:text-amber-300 transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>Hotline: 01700-000000</span>
            </a>
            <div className="hidden md:flex items-center gap-1 text-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Organic & Chemical Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-emerald-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onSelectCategory('all'); }}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F5132] to-emerald-700 flex items-center justify-center text-amber-400 shadow-md group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-[#0F5132] font-serif leading-none">
                  Food Index <span className="text-amber-500">BD</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                  Pure Organic & Natural Foods
                </span>
              </div>
            </a>
          </div>

          {/* Search Input Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search raw honey, ghee, nuts, dates (khejur)..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-50 border border-emerald-200 rounded-full py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:bg-white transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-2.5" />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Action Tools & Role Switcher */}
          <div className="flex items-center gap-3">
            
            {/* Role Switcher Badge (Customer vs Admin Mode) */}
            <button
              onClick={onToggleRole}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all shadow-xs ${
                role === 'admin'
                  ? 'bg-amber-500 text-emerald-950 border-amber-600 hover:bg-amber-400'
                  : 'bg-emerald-50 text-[#0F5132] border-emerald-200 hover:bg-emerald-100'
              }`}
              title="Click to toggle between Customer Storefront and Admin Management Portal"
            >
              {role === 'admin' ? (
                <>
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Admin Mode</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Storefront</span>
                  <span className="text-[10px] bg-[#0F5132] text-white px-1.5 py-0.5 rounded-full ml-0.5 font-mono">
                    Switch to Admin
                  </span>
                </>
              )}
            </button>

            {/* Sliding Cart Trigger Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center justify-center p-2.5 rounded-full bg-[#0F5132] text-white hover:bg-emerald-800 transition-colors shadow-md group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-emerald-950 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search honey, ghee, nuts, dates..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-50 border border-emerald-200 rounded-full py-2 pl-9 pr-4 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F5132]"
            />
            <Search className="w-3.5 h-3.5 text-emerald-600 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Category Navigation Bar */}
        <nav className={`mt-3 pt-2 border-t border-slate-100 ${mobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => { onSelectCategory('all'); setMobileMenuOpen(false); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#0F5132] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-emerald-50 hover:text-[#0F5132]'
              }`}
            >
              All Organic Foods
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { onSelectCategory(cat.slug); setMobileMenuOpen(false); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-[#0F5132] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-[#0F5132]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </nav>

      </div>
    </header>
  );
};
