'use client';

import React, { useState, useEffect } from 'react';
import { Category, Product, CartItem, Order, Role } from './types';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategorySection } from './components/CategorySection';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SlidingCartDrawer } from './components/SlidingCartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderInvoiceModal } from './components/OrderInvoiceModal';
import { AdminDashboard } from './components/AdminDashboard';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Sparkles, SlidersHorizontal, Package, HeartHandshake } from 'lucide-react';

export default function App() {
  const [role, setRole] = useState<Role>('customer');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyFeatured, setOnlyFeatured] = useState<boolean>(false);

  // Cart State (Persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [hasLoadedCart, setHasLoadedCart] = useState(false);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);

  // Save cart to localStorage
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('food_index_cart');
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load cart:', e);
    } finally {
      setHasLoadedCart(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedCart) return;
    try {
      window.localStorage.setItem('food_index_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cartItems, hasLoadedCart]);

  // Fetch Initial Store Data
  const fetchData = async () => {
    setLoading(true);
    try {
      // Categories
      const catRes = await fetch('/api/categories');
      const catData = await catRes.json();
      if (catData.success) {
        setCategories(catData.data || []);
      }

      // Products
      let url = '/api/products';
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      if (onlyFeatured) {
        params.append('featured', 'true');
      }
      if (searchQuery) {
        params.append('search', searchQuery);
      }
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const prodRes = await fetch(url);
      const prodData = await prodRes.json();
      if (prodData.success) {
        setProducts(prodData.data || []);
      }
    } catch (err) {
      console.error('Error fetching storefront data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory, searchQuery, onlyFeatured]);

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    selectedWeight: string,
    pricePerUnit: number,
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedWeight === selectedWeight
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedWeight, pricePerUnit, quantity }];
      }
    });
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleQuickBuy = (
    product: Product,
    selectedWeight: string,
    pricePerUnit: number,
    quantity: number = 1
  ) => {
    handleAddToCart(product, selectedWeight, pricePerUnit, quantity);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: Order) => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    setInvoiceOrder(order);
  };

  const cartTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased flex flex-col justify-between">
      
      {/* Primary Header Navbar */}
      <Navbar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(slug) => setSelectedCategory(slug)}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        role={role}
        onToggleRole={() => setRole(role === 'customer' ? 'admin' : 'customer')}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
      />

      {/* RENDER MODE 1: ADMIN MANAGEMENT DASHBOARD */}
      {role === 'admin' ? (
        <main className="flex-1">
          <AdminDashboard
            categories={categories}
            onRefreshData={fetchData}
            onOpenInvoice={(ord) => setInvoiceOrder(ord)}
          />
        </main>
      ) : (
        /* RENDER MODE 2: CUSTOMER STOREFRONT */
        <main className="flex-1 space-y-8 pb-16">
          
          {/* Hero Promotional Banner */}
          <HeroBanner
            onShopNowClick={() => {
              const element = document.getElementById('store-grid');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Interactive Categories Tiles */}
          <CategorySection
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(slug) => setSelectedCategory(slug)}
          />

          {/* Storefront Products Grid Container */}
          <section id="store-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold font-serif text-[#0F5132] flex items-center gap-2">
                  <span>Our Organic Pantry Selection</span>
                  {selectedCategory !== 'all' && (
                    <span className="text-sm font-normal text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full capitalize font-sans">
                      Category: {selectedCategory}
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Showing {products.length} unadulterated food products
                </p>
              </div>

              {/* Quick Filter Toggles */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOnlyFeatured(!onlyFeatured)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    onlyFeatured
                      ? 'bg-amber-400 text-emerald-950 border-amber-500 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  🌟 Featured Only
                </button>

                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="px-3 py-1.5 bg-slate-200 text-slate-700 text-xs font-bold rounded-full hover:bg-slate-300"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            </div>

            {/* Product Grid Items */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-12">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-slate-200 p-4 space-y-4">
                    <div className="bg-slate-200 h-40 rounded-xl w-full" />
                    <div className="bg-slate-200 h-4 rounded w-3/4" />
                    <div className="bg-slate-200 h-4 rounded w-1/2" />
                    <div className="bg-slate-200 h-10 rounded-xl w-full" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center my-8 space-y-3">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Package className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-lg text-slate-800">No Products Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We couldn't find any products matching your search term or category filter.
                </p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setOnlyFeatured(false); }}
                  className="px-6 py-2.5 bg-[#0F5132] text-white font-bold text-xs rounded-full shadow-md hover:bg-emerald-800"
                >
                  View All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickBuy={handleQuickBuy}
                    onOpenQuickView={(prod) => setQuickViewProduct(prod)}
                  />
                ))}
              </div>
            )}

          </section>

          {/* Floating WhatsApp Quick Order Button */}
          <WhatsAppFloatingButton />

        </main>
      )}

      {/* SHARED MODALS */}
      {/* 1. Product Quick View Detail Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(prod, weight, price, qty) => {
          handleAddToCart(prod, weight, price, qty);
          setQuickViewProduct(null);
        }}
        onQuickBuy={(prod, weight, price, qty) => {
          handleQuickBuy(prod, weight, price, qty);
          setQuickViewProduct(null);
        }}
      />

      {/* 2. Persistent Sliding Drawer Cart Overlay */}
      <SlidingCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* 3. One-Page BD High-Converting Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* 4. Printable Billing Invoice Modal */}
      <OrderInvoiceModal
        order={invoiceOrder}
        onClose={() => setInvoiceOrder(null)}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 text-xs py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-400 text-emerald-950 font-bold rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-xl text-white">Food Index BD</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Bangladesh's premier conversion-focused organic e-commerce destination for pure raw honey, Bilona ghee, roasted nuts, and imported dates.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Popular Categories</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => setSelectedCategory('honey')} className="hover:text-amber-400">Sundarban Raw Honey</button></li>
              <li><button onClick={() => setSelectedCategory('ghee')} className="hover:text-amber-400">Organic Pure Cow Ghee</button></li>
              <li><button onClick={() => setSelectedCategory('nuts')} className="hover:text-amber-400">Premium Roasted Cashews</button></li>
              <li><button onClick={() => setSelectedCategory('dates')} className="hover:text-amber-400">Madinah Mariami & Ajwa Dates</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Customer Service</h4>
            <ul className="space-y-2 text-slate-400">
              <li><span>Cash on Delivery Terms</span></li>
              <li><span>Dhaka 24-48h Shipping Policy</span></li>
              <li><span>100% Quality Return Guarantee</span></li>
              <li><a href="tel:01700000000" className="hover:text-amber-400">Hotline: 01700-000000</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Guaranteed Organic Purity</h4>
            <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700 space-y-2">
              <p className="text-slate-300 text-[11px]">
                Every batch is lab-tested and bottled in hygienic airtight glass and food-grade jars.
              </p>
              <span className="inline-block bg-emerald-900 text-emerald-300 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase">
                100% Organic Certified
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} Food Index BD. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
            <span>Delivering pure organic wellness across Bangladesh</span>
          </p>
        </div>
      </footer>

    </div>
  );
}
