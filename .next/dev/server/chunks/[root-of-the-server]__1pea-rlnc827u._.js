module.exports = [
(()=>{"use strict";return[
"[project]/src/lib/apiResponse.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getErrorMessage",
    ()=>getErrorMessage,
    "sendError",
    ()=>sendError,
    "sendSuccess",
    ()=>sendSuccess
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$2_$40$babel$2b$core$40$7$2e$2_284d76897b10121b66a76cb705adecd5$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.4.2_@babel+core@7.2_284d76897b10121b66a76cb705adecd5/node_modules/next/server.js [app-route] (ecmascript)");
;
function sendSuccess(message, data, status = 200) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$2_$40$babel$2b$core$40$7$2e$2_284d76897b10121b66a76cb705adecd5$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true,
        message,
        data
    }, {
        status
    });
}
function sendError(message, status = 500) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$2_$40$babel$2b$core$40$7$2e$2_284d76897b10121b66a76cb705adecd5$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: false,
        message,
        data: null
    }, {
        status
    });
}
function getErrorMessage(error, fallback) {
    return error instanceof Error ? error.message : fallback;
}
}),
"[project]/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db,
    "initialCategories",
    ()=>initialCategories,
    "initialOrders",
    ()=>initialOrders,
    "initialProducts",
    ()=>initialProducts
]);
const initialCategories = [
    {
        id: "cat-honey",
        name: "Pure Honey",
        slug: "honey",
        description: "100% natural, unpasteurized raw honey directly harvested from flowers & forests.",
        image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "cat-nuts",
        name: "Organic Nuts & Seeds",
        slug: "nuts",
        description: "Handpicked premium cashews, almonds, walnuts, dates & super seeds.",
        image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "cat-ghee",
        name: "Pure Country Ghee",
        slug: "ghee",
        description: "Traditional aroma-rich pure cow milk ghee made with traditional churned butter.",
        image: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "cat-dates",
        name: "Premium Dates (Khejur)",
        slug: "dates",
        description: "Imported fresh Medjool, Ajwa, Mariami, and Sukkaru premium dates.",
        image: "https://images.unsplash.com/photo-1584888062955-4673bc281ee0?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "cat-staples",
        name: "Organic Staples & Oils",
        slug: "staples",
        description: "Cold-pressed mustard oil, virgin olive oil, chia seeds, and organic spices.",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80"
    }
];
const initialProducts = [
    {
        id: "prod-1",
        title: "Sundarban Natural Flower Honey (সুন্দরবনের প্রাকৃতিক মধু)",
        slug: "sundarban-flower-honey",
        description: "100% authentic raw honey collected directly by Mowali honey harvesters deep inside the Sundarban mangrove forest. Unfiltered, rich in natural enzymes, pollen, and antioxidants.",
        price: 650,
        salePrice: 580,
        imageUrls: [
            "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=800&q=80"
        ],
        weightOptions: [
            "250g",
            "500g",
            "1kg",
            "2kg"
        ],
        stockQuantity: 45,
        isFeatured: true,
        categoryId: "cat-honey",
        origin: "Sundarban Forest, Satkhira, Bangladesh",
        benefits: [
            "Boosts immunity naturally",
            "Soothes cough and sore throat",
            "Rich in natural antioxidants & enzymes",
            "No added sugar or artificial preservatives"
        ]
    },
    {
        id: "prod-2",
        title: "Mustard Flower Raw Honey (সরষে ফুলের প্রাকৃতিক খাঁটি মধু)",
        slug: "mustard-flower-honey",
        description: "Golden organic honey gathered during mustard blossom season in North Bengal. Known for its quick natural crystallization and smooth buttery texture.",
        price: 450,
        salePrice: 390,
        imageUrls: [
            "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80"
        ],
        weightOptions: [
            "500g",
            "1kg",
            "2kg"
        ],
        stockQuantity: 60,
        isFeatured: true,
        categoryId: "cat-honey",
        origin: "Pabna & Natore, Bangladesh",
        benefits: [
            "Great replacement for refined white sugar",
            "Aids in healthy digestion",
            "Provides sustained daily vitality"
        ]
    },
    {
        id: "prod-3",
        title: "Organic Premium Cow Milk Ghee (গাভীর খাঁটি ঘি)",
        slug: "organic-cow-milk-ghee",
        description: "Prepared using traditional Bilona method from grass-fed cow's pure milk butter. Unmatched authentic granular texture, heavenly aroma, and deep rich flavor.",
        price: 850,
        salePrice: 780,
        imageUrls: [
            "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
        ],
        weightOptions: [
            "250g",
            "500g",
            "1kg"
        ],
        stockQuantity: 28,
        isFeatured: true,
        categoryId: "cat-ghee",
        origin: "Pabna Dairy Belt, Bangladesh",
        benefits: [
            "High smoke point ideal for authentic cooking",
            "Contains healthy fat-soluble vitamins (A, D, E, K)",
            "Enhances memory and gut health"
        ]
    },
    {
        id: "prod-4",
        title: "Premium Roasted & Salted Cashews (প্রিমিয়াম কাজুবাদাম)",
        slug: "premium-roasted-cashews",
        description: "Large, crisp, whole W240 grade cashews roasted carefully with minimal Himalayan pink salt. Sealed in airtight nitrogen-flushed jars for maximum freshness.",
        price: 520,
        salePrice: 480,
        imageUrls: [
            "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1536591375315-1b836814d2b9?auto=format&fit=crop&w=800&q=80"
        ],
        weightOptions: [
            "250g",
            "500g",
            "1kg"
        ],
        stockQuantity: 32,
        isFeatured: true,
        categoryId: "cat-nuts",
        origin: "Imported & Freshly Roasted in Dhaka",
        benefits: [
            "Rich in healthy monounsaturated fats",
            "High plant-based protein content",
            "Supports heart health and energy levels"
        ]
    },
    {
        id: "prod-5",
        title: "Saudi Arabian Mariami VIP Dates (মারিয়ামী প্রিমিয়াম খেজুর)",
        slug: "saudi-mariami-vip-dates",
        description: "Juicy, chewy, and rich caramel-flavored VIP quality Mariami dates directly imported from Madinah Munawwarah. Packed with essential minerals and dietary fiber.",
        price: 480,
        salePrice: 420,
        imageUrls: [
            "https://images.unsplash.com/photo-1584888062955-4673bc281ee0?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1508061252966-dfd30f601859?auto=format&fit=crop&w=800&q=80"
        ],
        weightOptions: [
            "500g",
            "1kg",
            "2kg",
            "5kg"
        ],
        stockQuantity: 50,
        isFeatured: true,
        categoryId: "cat-dates",
        origin: "Madinah, Saudi Arabia",
        benefits: [
            "Instant natural energy booster",
            "High dietary fiber aiding gut health",
            "Rich source of iron, potassium & magnesium"
        ]
    },
    {
        id: "prod-6",
        title: "Royal Ajwa Madinah Dates (আজওয়া মদিনা খেজুর)",
        slug: "royal-ajwa-madinah-dates",
        description: "Sacred, dark, fine-textured Ajwa dates from Madinah. Famous for exceptional health benefits, soft sweetness, and antioxidant power.",
        price: 850,
        salePrice: 790,
        imageUrls: [
            "https://images.unsplash.com/photo-1508061252966-dfd30f601859?auto=format&fit=crop&w=800&q=80"
        ],
        weightOptions: [
            "250g",
            "500g",
            "1kg"
        ],
        stockQuantity: 18,
        isFeatured: false,
        categoryId: "cat-dates",
        origin: "Madinah Munawwarah",
        benefits: [
            "Supports heart health & blood pressure control",
            "Potent natural antioxidant properties"
        ]
    },
    {
        id: "prod-7",
        title: "Mixed Super Nut & Dried Fruit Mix (মিক্সড ড্রাই ফ্রুটস ও বাদাম)",
        slug: "mixed-super-nut-fruit-mix",
        description: "Power combination of Almonds, Cashews, Walnuts, Pistachios, Golden Raisins, Dried Cranberries, and Pumpkin Seeds. The ultimate daily wellness snack.",
        price: 680,
        salePrice: 620,
        imageUrls: [
            "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
        ],
        weightOptions: [
            "250g",
            "500g",
            "1kg"
        ],
        stockQuantity: 40,
        isFeatured: true,
        categoryId: "cat-nuts",
        origin: "Multi-origin premium blend",
        benefits: [
            "Complete omega-3 and essential nutrient profile",
            "Perfect mid-day brain power snack"
        ]
    },
    {
        id: "prod-8",
        title: "Cold Pressed Wooden Ghani Mustard Oil (ঘানি ভাঙা সরিষার তেল)",
        slug: "cold-pressed-mustard-oil",
        description: "100% pure mustard oil extracted using traditional wooden ghani at low temperature to preserve natural pungency, aroma, and omega 3 fatty acids.",
        price: 240,
        salePrice: 220,
        imageUrls: [
            "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80"
        ],
        weightOptions: [
            "1 Liter",
            "2 Liter",
            "5 Liter"
        ],
        stockQuantity: 75,
        isFeatured: false,
        categoryId: "cat-staples",
        origin: "Sirajganj, Bangladesh",
        benefits: [
            "Traditional intense aroma and authentic flavor",
            "Zero chemical refining or bleaching"
        ]
    },
    {
        id: "prod-9",
        title: "Organic Black Seed Honey (কালিজিরা ফুলের মধু)",
        slug: "black-seed-honey",
        description: "Rare single-origin honey harvested during black seed (Kalinji) flowering season. Revered for centuries in natural wellness traditions.",
        price: 720,
        salePrice: 660,
        imageUrls: [
            "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=800&q=80"
        ],
        weightOptions: [
            "250g",
            "500g",
            "1kg"
        ],
        stockQuantity: 20,
        isFeatured: true,
        categoryId: "cat-honey",
        origin: "Tangail, Bangladesh",
        benefits: [
            "Combines black seed benefits with raw honey energy",
            "Powerful respiratory and immune booster"
        ]
    },
    {
        id: "prod-10",
        title: "Organic Black Chia Seeds (অর্গানিক চিয়া সিড)",
        slug: "organic-black-chia-seeds",
        description: "Raw, unrefined organic chia seeds packed with fiber, protein, and omega-3 fatty acids. Ideal for morning detox water or smoothies.",
        price: 320,
        salePrice: 280,
        imageUrls: [
            "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80"
        ],
        weightOptions: [
            "250g",
            "500g",
            "1kg"
        ],
        stockQuantity: 50,
        isFeatured: false,
        categoryId: "cat-staples",
        origin: "Imported Organic Certified",
        benefits: [
            "High dietary fiber for weight management",
            "Supports stable blood sugar levels"
        ]
    }
];
const initialOrders = [
    {
        id: "ORD-8921",
        customerName: "Tanvir Ahmed",
        customerPhone: "01712345678",
        deliveryAddress: "House 42, Road 11, Block D, Banani, Dhaka",
        deliveryArea: "inside_dhaka",
        totalAmount: 1220,
        shippingCost: 60,
        paymentMethod: "COD",
        orderStatus: "PENDING",
        orderNotes: "Please call before delivery.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        items: [
            {
                productId: "prod-1",
                productTitle: "Sundarban Natural Flower Honey (সুন্দরবনের প্রাকৃতিক মধু)",
                productImage: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80",
                quantity: 1,
                selectedWeight: "500g",
                pricePerUnit: 580
            },
            {
                productId: "prod-5",
                productTitle: "Saudi Arabian Mariami VIP Dates (মারিয়ামী প্রিমিয়াম খেজুর)",
                productImage: "https://images.unsplash.com/photo-1584888062955-4673bc281ee0?auto=format&fit=crop&w=800&q=80",
                quantity: 1,
                selectedWeight: "500g",
                pricePerUnit: 580
            }
        ]
    },
    {
        id: "ORD-8920",
        customerName: "Nusrat Jahan",
        customerPhone: "01898765432",
        deliveryAddress: "Kazi Villa, Station Road, Chittagong",
        deliveryArea: "outside_dhaka",
        totalAmount: 1680,
        shippingCost: 120,
        paymentMethod: "BKASH",
        paymentTransactionId: "TRX88219491",
        orderStatus: "CONFIRMED",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        items: [
            {
                productId: "prod-3",
                productTitle: "Organic Premium Cow Milk Ghee (গাভীর খাঁটি ঘি)",
                productImage: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=800&q=80",
                quantity: 2,
                selectedWeight: "250g",
                pricePerUnit: 780
            }
        ]
    },
    {
        id: "ORD-8918",
        customerName: "Mahbubur Rahman",
        customerPhone: "01911223344",
        deliveryAddress: "Sector 7, Road 3, Uttara, Dhaka",
        deliveryArea: "inside_dhaka",
        totalAmount: 1280,
        shippingCost: 60,
        paymentMethod: "COD",
        orderStatus: "SHIPPED",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        items: [
            {
                productId: "prod-7",
                productTitle: "Mixed Super Nut & Dried Fruit Mix (মিক্সড ড্রাই ফ্রুটস ও বাদাম)",
                productImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
                quantity: 2,
                selectedWeight: "500g",
                pricePerUnit: 610
            }
        ]
    },
    {
        id: "ORD-8915",
        customerName: "Shamima Akhter",
        customerPhone: "01655443322",
        deliveryAddress: "Subidbazar, Sylhet Sadar, Sylhet",
        deliveryArea: "outside_dhaka",
        totalAmount: 910,
        shippingCost: 120,
        paymentMethod: "NAGAD",
        paymentTransactionId: "NGD99218274",
        orderStatus: "DELIVERED",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        items: [
            {
                productId: "prod-2",
                productTitle: "Mustard Flower Raw Honey (সরষে ফুলের প্রাকৃতিক খাঁটি মধু)",
                productImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
                quantity: 2,
                selectedWeight: "500g",
                pricePerUnit: 395
            }
        ]
    }
];
// In-memory persistent database store
class LocalDatabase {
    categories = [
        ...initialCategories
    ];
    products = [
        ...initialProducts
    ];
    orders = [
        ...initialOrders
    ];
    // Categories
    getCategories() {
        return this.categories;
    }
    getCategoryBySlug(slug) {
        return this.categories.find((c)=>c.slug === slug);
    }
    // Products
    getProducts(filters) {
        let list = [
            ...this.products
        ];
        if (filters?.categorySlug) {
            const cat = this.getCategoryBySlug(filters.categorySlug);
            if (cat) {
                list = list.filter((p)=>p.categoryId === cat.id);
            } else {
                list = list.filter((p)=>p.categoryId === filters.categorySlug);
            }
        }
        if (filters?.isFeatured !== undefined) {
            list = list.filter((p)=>p.isFeatured === filters.isFeatured);
        }
        if (filters?.search) {
            const q = filters.search.toLowerCase();
            list = list.filter((p)=>p.title.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
        }
        return list;
    }
    getProductById(id) {
        const prod = this.products.find((p)=>p.id === id);
        if (prod) {
            const cat = this.categories.find((c)=>c.id === prod.categoryId);
            return {
                ...prod,
                category: cat
            };
        }
        return undefined;
    }
    getProductBySlug(slug) {
        const prod = this.products.find((p)=>p.slug === slug);
        if (prod) {
            const cat = this.categories.find((c)=>c.id === prod.categoryId);
            return {
                ...prod,
                category: cat
            };
        }
        return undefined;
    }
    createProduct(data) {
        const newProd = {
            ...data,
            id: `prod-${Date.now()}`,
            slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.products.unshift(newProd);
        return newProd;
    }
    updateProduct(id, updates) {
        const index = this.products.findIndex((p)=>p.id === id);
        if (index === -1) return undefined;
        this.products[index] = {
            ...this.products[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        return this.products[index];
    }
    deleteProduct(id) {
        const initialLength = this.products.length;
        this.products = this.products.filter((p)=>p.id !== id);
        return this.products.length < initialLength;
    }
    // Orders
    getOrders(filters) {
        let list = [
            ...this.orders
        ];
        if (filters?.status && filters.status !== 'ALL') {
            list = list.filter((o)=>o.orderStatus === filters.status);
        }
        if (filters?.search) {
            const q = filters.search.toLowerCase();
            list = list.filter((o)=>o.id.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q) || o.customerPhone.includes(q));
        }
        return list.sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    getOrderById(id) {
        return this.orders.find((o)=>o.id === id);
    }
    createOrder(orderData) {
        const newOrder = {
            ...orderData,
            id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
            orderStatus: "PENDING",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        // Deduct stock
        orderData.items.forEach((item)=>{
            const prod = this.getProductById(item.productId);
            if (prod) {
                const newStock = Math.max(0, prod.stockQuantity - item.quantity);
                this.updateProduct(prod.id, {
                    stockQuantity: newStock
                });
            }
        });
        this.orders.unshift(newOrder);
        return newOrder;
    }
    updateOrderStatus(id, newStatus) {
        const order = this.orders.find((o)=>o.id === id);
        if (!order) return undefined;
        order.orderStatus = newStatus;
        order.updatedAt = new Date().toISOString();
        return order;
    }
    getAdminStats() {
        const totalRevenue = this.orders.filter((o)=>o.orderStatus !== 'CANCELLED').reduce((sum, o)=>sum + o.totalAmount, 0);
        const totalOrders = this.orders.length;
        const pendingOrdersCount = this.orders.filter((o)=>o.orderStatus === 'PENDING').length;
        const deliveredOrdersCount = this.orders.filter((o)=>o.orderStatus === 'DELIVERED').length;
        const lowStockProductsCount = this.products.filter((p)=>p.stockQuantity < 10).length;
        const totalProductsCount = this.products.length;
        const categoryBreakdown = this.categories.map((cat)=>({
                categoryName: cat.name,
                count: this.products.filter((p)=>p.categoryId === cat.id).length
            }));
        return {
            totalRevenue,
            totalOrders,
            pendingOrdersCount,
            deliveredOrdersCount,
            lowStockProductsCount,
            totalProductsCount,
            categoryBreakdown,
            recentOrders: this.orders.slice(0, 5)
        };
    }
}
const db = new LocalDatabase();
}),
"[project]/src/services/productService.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductService",
    ()=>ProductService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
class ProductService {
    static async getAllProducts(filters) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].getProducts(filters);
    }
    static async getProductById(id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].getProductById(id);
    }
    static async getProductBySlug(slug) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].getProductBySlug(slug);
    }
    static async createProduct(productData) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].createProduct({
            title: productData.title,
            slug: productData.slug || '',
            description: productData.description || '',
            price: Number(productData.price),
            salePrice: productData.salePrice ? Number(productData.salePrice) : null,
            weightOptions: productData.weightOptions || [
                "500g",
                "1kg"
            ],
            stockQuantity: Number(productData.stockQuantity || 0),
            categoryId: productData.categoryId,
            imageUrls: productData.imageUrls && productData.imageUrls.length > 0 ? productData.imageUrls : [
                "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80"
            ],
            isFeatured: !!productData.isFeatured,
            origin: productData.origin || "Bangladesh",
            benefits: productData.benefits || []
        });
    }
    static async updateProduct(id, updates) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].updateProduct(id, updates);
    }
    static async deleteProduct(id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].deleteProduct(id);
    }
}
}),
]})(),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/app/api/products/route.ts [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var e = new Error("Could not parse module '[project]/app/api/products/route.ts', file not found");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1pea-rlnc827u._.js.map