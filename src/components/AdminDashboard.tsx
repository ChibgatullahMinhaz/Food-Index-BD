import React, { useState, useEffect } from 'react';
import { Product, Order, AdminStats, Category, OrderStatus } from '../types';
import { 
  BarChart3, Package, ShoppingCart, AlertTriangle, Plus, Search, 
  Filter, Edit, Trash2, Eye, CheckCircle2, Clock, Truck, CheckCheck, 
  XCircle, DollarSign, ArrowUpRight, RefreshCw, X, Layers
} from 'lucide-react';

interface AdminDashboardProps {
  categories: Category[];
  onRefreshData: () => void;
  onOpenInvoice: (order: Order) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  categories,
  onRefreshData,
  onOpenInvoice,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [productSearch, setProductSearch] = useState('');
  const [selectedProductCategory, setSelectedProductCategory] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<string>('ALL');

  // Product CRUD Modal State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Product Form Data
  const [formTitle, setFormTitle] = useState('');
  const [formCategoryId, setFormCategoryId] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPrice, setFormPrice] = useState<number>(500);
  const [formSalePrice, setFormSalePrice] = useState<number | ''>('');
  const [formWeightOptions, setFormWeightOptions] = useState<string>('250g, 500g, 1kg');
  const [formStock, setFormStock] = useState<number>(30);
  const [formImageUrls, setFormImageUrls] = useState<string>('');
  const [formIsFeatured, setFormIsFeatured] = useState<boolean>(false);
  const [formOrigin, setFormOrigin] = useState<string>('Bangladesh');

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Stats
      const statsRes = await fetch('/api/admin/stats');
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.data);

      // 2. Fetch Products
      const prodRes = await fetch('/api/products');
      const prodData = await prodRes.json();
      if (prodData.success) setProducts(prodData.data || []);

      // 3. Fetch Orders
      const orderRes = await fetch('/api/admin/orders');
      const orderData = await orderRes.json();
      if (orderData.success) setOrders(orderData.data || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const openAddProductModal = () => {
    setEditingProduct(null);
    setFormTitle('');
    setFormCategoryId(categories[0]?.id || '');
    setFormDescription('');
    setFormPrice(500);
    setFormSalePrice('');
    setFormWeightOptions('250g, 500g, 1kg');
    setFormStock(30);
    setFormImageUrls('https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80');
    setFormIsFeatured(false);
    setFormOrigin('Bangladesh');
    setProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setFormTitle(product.title);
    setFormCategoryId(product.categoryId);
    setFormDescription(product.description || '');
    setFormPrice(product.price);
    setFormSalePrice(product.salePrice || '');
    setFormWeightOptions(product.weightOptions ? product.weightOptions.join(', ') : '500g, 1kg');
    setFormStock(product.stockQuantity);
    setFormImageUrls(product.imageUrls ? product.imageUrls.join('\n') : '');
    setFormIsFeatured(product.isFeatured);
    setFormOrigin(product.origin || 'Bangladesh');
    setProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formCategoryId) return;

    const imageUrlsArray = formImageUrls
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const weightOptionsArray = formWeightOptions
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      title: formTitle.trim(),
      categoryId: formCategoryId,
      description: formDescription.trim(),
      price: Number(formPrice),
      salePrice: formSalePrice !== '' ? Number(formSalePrice) : null,
      weightOptions: weightOptionsArray.length > 0 ? weightOptionsArray : ['500g', '1kg'],
      stockQuantity: Number(formStock),
      imageUrls: imageUrlsArray.length > 0 ? imageUrlsArray : ['https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80'],
      isFeatured: formIsFeatured,
      origin: formOrigin.trim() || 'Bangladesh'
    };

    try {
      if (editingProduct) {
        await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      setProductModalOpen(false);
      fetchAdminData();
      onRefreshData();
    } catch (err) {
      console.error('Save product error:', err);
    }
  };

  const handleDeleteProduct = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete product "${title}"?`)) return;
    try {
      await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      fetchAdminData();
      onRefreshData();
    } catch (err) {
      console.error('Delete product error:', err);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchAdminData();
      onRefreshData();
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesCategory = !selectedProductCategory || p.categoryId === selectedProductCategory;
    const matchesSearch = !productSearch || p.title.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    const matchesStatus = selectedOrderStatus === 'ALL' || o.orderStatus === selectedOrderStatus;
    const matchesSearch = !orderSearch || 
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerPhone.includes(orderSearch);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Admin Top Header Banner */}
        <div className="bg-[#0F5132] text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-emerald-950 font-bold text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Control Portal
              </span>
              <span className="text-xs text-emerald-200">Food Index BD Management System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold mt-1">
              Store Administrator Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchAdminData}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Stats</span>
            </button>

            <button
              onClick={openAddProductModal}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex gap-2 border-b border-slate-200 pb-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'overview'
                ? 'bg-[#0F5132] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics & Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'products'
                ? 'bg-[#0F5132] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Engine ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'orders'
                ? 'bg-[#0F5132] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Order Pipeline ({orders.length})</span>
            {stats && stats.pendingOrdersCount > 0 && (
              <span className="bg-amber-400 text-emerald-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {stats.pendingOrdersCount}
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: ANALYTICS OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">Total Revenue</span>
                  <h3 className="text-2xl font-black font-mono text-[#0F5132] mt-1">
                    ৳{stats ? stats.totalRevenue : 0}
                  </h3>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">From confirmed & delivered orders</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0F5132] flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">Total Orders</span>
                  <h3 className="text-2xl font-black font-mono text-slate-900 mt-1">
                    {stats ? stats.totalOrders : 0}
                  </h3>
                  <span className="text-[10px] text-slate-500 font-semibold mt-1 block">Lifetime placed</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">Pending Orders</span>
                  <h3 className="text-2xl font-black font-mono text-amber-600 mt-1">
                    {stats ? stats.pendingOrdersCount : 0}
                  </h3>
                  <span className="text-[10px] text-amber-700 font-semibold mt-1 block">Requires confirmation call</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">Low Stock Alerts</span>
                  <h3 className="text-2xl font-black font-mono text-rose-600 mt-1">
                    {stats ? stats.lowStockProductsCount : 0}
                  </h3>
                  <span className="text-[10px] text-rose-600 font-semibold mt-1 block">Products below 10 units</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Category Breakdown & Recent Orders Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Category Breakdown */}
              <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-serif font-bold text-slate-900 text-base border-b pb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#0F5132]" />
                  <span>Category Distribution</span>
                </h3>

                <div className="space-y-3">
                  {stats?.categoryBreakdown.map((cat, i) => (
                    <div key={i} className="flex justify-between items-center text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="font-bold text-slate-800">{cat.categoryName}</span>
                      <span className="bg-emerald-100 text-[#0F5132] font-mono font-bold px-2.5 py-1 rounded-md">
                        {cat.count} Items
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Orders List */}
              <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="font-serif font-bold text-slate-900 text-base flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#0F5132]" />
                    <span>Recent Customer Orders</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-[#0F5132] hover:underline flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {stats?.recentOrders.map((ord) => (
                    <div
                      key={ord.id}
                      onClick={() => onOpenInvoice(ord)}
                      className="p-3 bg-slate-50 hover:bg-emerald-50/50 rounded-2xl border border-slate-200 transition-all cursor-pointer flex justify-between items-center text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#0F5132]">{ord.id}</span>
                          <span className="font-bold text-slate-900">{ord.customerName}</span>
                          <span className="text-slate-400 font-mono">({ord.customerPhone})</span>
                        </div>
                        <span className="text-[11px] text-slate-500 block mt-0.5">
                          {ord.items.length} items | Area: {ord.deliveryArea === 'inside_dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="font-mono font-bold text-slate-900 block text-sm">
                          ৳{ord.totalAmount}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                          {ord.orderStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: PRODUCT ENGINE MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            
            {/* Search & Category Filter Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto flex-1 max-w-md">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search product title..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-full py-2 pl-9 pr-4 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F5132]"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                </div>

                <select
                  value={selectedProductCategory}
                  onChange={(e) => setSelectedProductCategory(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-full py-2 px-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F5132]"
                >
                  <option value="">All Categories</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={openAddProductModal}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#0F5132] hover:bg-emerald-800 text-white font-bold text-xs rounded-full shadow-md flex items-center justify-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] bg-slate-50">
                    <th className="py-3 px-3">Product</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Base Price</th>
                    <th className="py-3 px-3">Weight Variants</th>
                    <th className="py-3 px-3">Stock</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.imageUrls[0]}
                            alt=""
                            className="w-10 h-10 object-cover rounded-xl border border-slate-200"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block max-w-xs truncate">
                              {p.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">{p.slug}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="bg-emerald-50 text-[#0F5132] px-2 py-1 rounded-md font-semibold">
                          {categories.find(c => c.id === p.categoryId)?.name || p.categoryId}
                        </span>
                      </td>

                      <td className="py-3 px-3 font-mono font-bold text-slate-900">
                        ৳{p.salePrice || p.price}
                        {p.salePrice && (
                          <span className="text-slate-400 line-through text-[10px] ml-1">
                            ৳{p.price}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1">
                          {p.weightOptions?.map((w, i) => (
                            <span key={i} className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                              {w}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.stockQuantity < 10
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {p.stockQuantity} units
                        </span>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditProductModal(p)}
                            className="p-1.5 text-slate-600 hover:text-[#0F5132] hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.title)}
                            className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: ORDER FULFILLMENT PIPELINE */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            
            {/* Status Tabs & Search Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1">
                {['ALL', 'PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedOrderStatus(status)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                      selectedOrderStatus === status
                        ? 'bg-[#0F5132] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search Phone, Name, Order ID..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-full py-2 pl-9 pr-4 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F5132]"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] bg-slate-50">
                    <th className="py-3 px-3">Order ID</th>
                    <th className="py-3 px-3">Customer & Phone</th>
                    <th className="py-3 px-3">Region & Address</th>
                    <th className="py-3 px-3">Amount & Payment</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Fulfillment Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3">
                        <button
                          onClick={() => onOpenInvoice(ord)}
                          className="font-mono font-bold text-[#0F5132] hover:underline flex items-center gap-1"
                        >
                          <span>{ord.id}</span>
                          <Eye className="w-3 h-3" />
                        </button>
                        <span className="text-[10px] text-slate-400 block">
                          {new Date(ord.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900 block">{ord.customerName}</span>
                        <a href={`tel:${ord.customerPhone}`} className="text-[#0F5132] font-mono hover:underline text-[11px]">
                          {ord.customerPhone}
                        </a>
                      </td>

                      <td className="py-3 px-3 max-w-xs">
                        <span className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded text-[10px] block w-max">
                          {ord.deliveryArea === 'inside_dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'}
                        </span>
                        <span className="text-slate-600 line-clamp-1 mt-0.5">{ord.deliveryAddress}</span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-mono font-black text-slate-900 block">
                          ৳{ord.totalAmount}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {ord.paymentMethod} {ord.paymentTransactionId ? `(${ord.paymentTransactionId})` : ''}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          ord.orderStatus === 'PENDING' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                          ord.orderStatus === 'CONFIRMED' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                          ord.orderStatus === 'SHIPPED' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                          ord.orderStatus === 'DELIVERED' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                          'bg-rose-100 text-rose-900'
                        }`}>
                          {ord.orderStatus}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {ord.orderStatus === 'PENDING' && (
                            <button
                              onClick={() => handleUpdateOrderStatus(ord.id, 'CONFIRMED')}
                              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[10px] shadow-xs"
                            >
                              Confirm
                            </button>
                          )}

                          {ord.orderStatus === 'CONFIRMED' && (
                            <button
                              onClick={() => handleUpdateOrderStatus(ord.id, 'SHIPPED')}
                              className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-[10px] shadow-xs"
                            >
                              Ship Parcel
                            </button>
                          )}

                          {ord.orderStatus === 'SHIPPED' && (
                            <button
                              onClick={() => handleUpdateOrderStatus(ord.id, 'DELIVERED')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[10px] shadow-xs"
                            >
                              Mark Delivered
                            </button>
                          )}

                          <button
                            onClick={() => onOpenInvoice(ord)}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold"
                            title="View / Print Invoice"
                          >
                            Invoice
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* PRODUCT ADD / EDIT MODAL */}
        {productModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 overflow-y-auto max-h-[90vh] space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-serif font-bold text-lg text-[#0F5132]">
                  {editingProduct ? 'Edit Product Parameters' : 'Add New Organic Product'}
                </h3>
                <button
                  onClick={() => setProductModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Sundarban Natural Flower Honey"
                    className="w-full bg-slate-50 border rounded-xl p-2.5 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Category</label>
                    <select
                      value={formCategoryId}
                      onChange={(e) => setFormCategoryId(e.target.value)}
                      className="w-full bg-slate-50 border rounded-xl p-2.5 font-medium"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Origin Location</label>
                    <input
                      type="text"
                      value={formOrigin}
                      onChange={(e) => setFormOrigin(e.target.value)}
                      placeholder="e.g. Sundarban, Satkhira"
                      className="w-full bg-slate-50 border rounded-xl p-2.5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Regular Price (৳)</label>
                    <input
                      type="number"
                      required
                      value={formPrice}
                      onChange={(e) => setFormPrice(Number(e.target.value))}
                      className="w-full bg-slate-50 border rounded-xl p-2 font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Sale Promo Price (৳)</label>
                    <input
                      type="number"
                      value={formSalePrice}
                      onChange={(e) => setFormSalePrice(e.target.value ? Number(e.target.value) : '')}
                      placeholder="Optional"
                      className="w-full bg-slate-50 border rounded-xl p-2 font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Stock Units</label>
                    <input
                      type="number"
                      required
                      value={formStock}
                      onChange={(e) => setFormStock(Number(e.target.value))}
                      className="w-full bg-slate-50 border rounded-xl p-2 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Weight/Volume Variants (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={formWeightOptions}
                    onChange={(e) => setFormWeightOptions(e.target.value)}
                    placeholder="e.g. 250g, 500g, 1kg"
                    className="w-full bg-slate-50 border rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Image URLs (One per line)
                  </label>
                  <textarea
                    rows={2}
                    value={formImageUrls}
                    onChange={(e) => setFormImageUrls(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-50 border rounded-xl p-2.5 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full bg-slate-50 border rounded-xl p-2.5"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                    className="text-[#0F5132] focus:ring-[#0F5132] w-4 h-4"
                  />
                  <label htmlFor="isFeatured" className="font-bold text-slate-800">
                    Show as Featured Product on Storefront Homepage
                  </label>
                </div>

                <div className="pt-3 border-t flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setProductModalOpen(false)}
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-full font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#0F5132] text-white rounded-full font-bold shadow-md hover:bg-emerald-800"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
