# Food Index BD

## Next.js & Prisma Architecture — MVP Blueprint

Food Index BD is envisioned as a premium online grocery store focused on organic
and authentic food products for customers in Bangladesh. This document describes
a proposed architecture and MVP feature set.

## Contents

1. [Vision and visual identity](#1-vision-and-visual-identity)
2. [Proposed technology stack](#2-proposed-technology-stack)
3. [MVP features](#3-mvp-features)
4. [Proposed Prisma data model](#4-proposed-prisma-data-model)
5. [Service and route-handler patterns](#5-service-and-route-handler-patterns)
6. [Implementation roadmap](#6-implementation-roadmap)

## 1. Vision and visual identity

The platform aims to provide a polished, conversion-focused shopping experience
for premium raw honey, nuts, ghee, dates, and other organic staples.

### Visual theme

| Role | Color | Intended use |
| --- | --- | --- |
| Primary | Emerald green `#0F5132` | Brand identity and primary actions |
| Soft accent | Mint green `#D1E7DD` | Alerts, banners, and subtle badges |
| Background | White `#FFFFFF` and off-white `#F8F9FA` | Clean surfaces and readable layouts |
| Highlight | Honey amber `#FFC107` | Ratings, selected variants, and conversion highlights |

## 2. Proposed technology stack

The proposed architecture uses Next.js as a full-stack framework, with PostgreSQL
for relational data and Prisma as the ORM. Route handlers manage HTTP concerns,
while service modules contain reusable business logic.

| Layer | Technology | Responsibility |
| --- | --- | --- |
| Client UI | Next.js App Router and React | Storefront, interactive components, and client-side state |
| Styling | Tailwind CSS | Responsive layouts and the green-and-white theme |
| HTTP/API | Next.js Route Handlers | Parse requests, validate input, call services, and return JSON |
| Business logic | TypeScript service modules | Product, pricing, delivery, and order operations |
| Persistence | PostgreSQL and Prisma ORM | Relational data, migrations, and database access |
| Authentication | Better Auth | User sessions and account workflows using PostgreSQL |

## 3. MVP features

### 3.1 Customer storefront

- **Homepage and category browsing:** Feature seasonal products and provide
  quick access to Honey, Nuts, Ghee, and Dates.
- **Product variants:** Let customers choose options such as 250 g, 500 g, or
  1 kg, with the displayed price updated when the selection changes.
- **Persistent cart drawer:** Open a side drawer when a product is added, where
  customers can review quantities or continue to checkout without a page reload.
- **Single-page checkout:** Collect the essential details: customer name,
  mobile number, delivery address, and delivery area.
- **Localized delivery pricing:** Update the delivery fee based on the selected
  area. Example rates: ৳60 inside Dhaka and ৳120 outside Dhaka.
- **Payment methods:** Prioritize Cash on Delivery (COD) for the MVP and leave
  integration points for bKash, Nagad, and SSLCommerz.

### 3.2 Admin dashboard

- **Store metrics:** Show order totals, daily transaction values, inventory
  alerts, and product-category summaries.
- **Product management:** Support product CRUD, image management, weight
  variants, regular and promotional prices, and stock updates.
- **Order fulfillment:** Track orders through Pending, Confirmed, Shipped, and
  Delivered states, and provide a printable invoice.

## 4. Proposed Prisma data model

The schema below combines Better Auth-compatible identity models with the core
e-commerce entities. Adapt field names and relations to the selected auth
adapter and the application's final requirements.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// Better Auth identity models
model User {
  id            String    @id @default(uuid())
  name          String
  email         String    @unique
  emailVerified Boolean   @default(false)
  image         String?
  role          String    @default("customer")
  phone         String?   @unique
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  sessions      Session[]
  accounts      Account[]
  orders        Order[]

  @@map("user")
}

model Session {
  id        String   @id @default(uuid())
  expiresAt DateTime
  token     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  ipAddress String?
  userAgent String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("session")
}

model Account {
  id                    String    @id @default(uuid())
  accountId             String
  providerId            String
  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  @@map("account")
}

model Verification {
  id         String    @id @default(uuid())
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime? @default(now())
  updatedAt  DateTime? @updatedAt

  @@map("verification")
}

// Core e-commerce models
model Category {
  id        String    @id @default(uuid())
  name      String    @unique
  slug      String    @unique
  products  Product[]
  createdAt DateTime  @default(now())
}

model Product {
  id            String      @id @default(uuid())
  title         String
  slug          String      @unique
  description   String?
  price         Decimal     @db.Decimal(10, 2)
  salePrice     Decimal?    @db.Decimal(10, 2)
  imageUrls     String[]
  weightOptions String[]
  stockQuantity Int         @default(0)
  isFeatured    Boolean     @default(false)
  categoryId    String
  category      Category    @relation(fields: [categoryId], references: [id])
  orderItems    OrderItem[]
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}

model Order {
  id              String      @id @default(uuid())
  userId          String?
  user            User?       @relation(fields: [userId], references: [id], onDelete: SetNull)
  customerName    String
  customerPhone   String
  deliveryAddress String
  deliveryArea    String
  totalAmount     Decimal     @db.Decimal(10, 2)
  shippingCost    Decimal     @db.Decimal(10, 2)
  paymentMethod   String      @default("COD")
  orderStatus     String      @default("PENDING")
  items           OrderItem[]
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

model OrderItem {
  id             String   @id @default(uuid())
  orderId        String
  order          Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId      String
  product        Product  @relation(fields: [productId], references: [id])
  quantity       Int
  selectedWeight String?
  pricePerUnit   Decimal  @db.Decimal(10, 2)
}
```

## 5. Service and route-handler patterns

Route handlers should stay focused on HTTP concerns. Services should own
reusable business operations and database access.

### 5.1 Standard JSON response helper

```ts
// lib/responseUtils.ts
import { NextResponse } from "next/server";

export function sendResponse<T>(
  success: boolean,
  message: string,
  data?: T,
  statusCode = 200,
) {
  return NextResponse.json(
    {
      success,
      message,
      data: data ?? null,
    },
    { status: statusCode },
  );
}
```

### 5.2 Product service example

```ts
// services/productService.ts
import { prisma } from "@/lib/prisma";

type ProductFilters = {
  categorySlug?: string;
  isFeatured?: boolean;
};

type CreateProductInput = {
  title: string;
  slug: string;
  description?: string;
  price: number;
  weightOptions: string[];
  stockQuantity: number;
  categoryId: string;
  imageUrls: string[];
};

export class ProductService {
  static async getAllProducts(filters?: ProductFilters) {
    const whereCondition: {
      category?: { slug: string };
      isFeatured?: boolean;
    } = {};

    if (filters?.categorySlug) {
      whereCondition.category = { slug: filters.categorySlug };
    }

    if (filters?.isFeatured !== undefined) {
      whereCondition.isFeatured = filters.isFeatured;
    }

    return prisma.product.findMany({
      where: whereCondition,
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  }

  static async createProduct(productData: CreateProductInput) {
    return prisma.product.create({
      data: productData,
    });
  }
}
```

### 5.3 Product route-handler example

```ts
// app/api/products/route.ts
import { NextRequest } from "next/server";
import { ProductService } from "@/services/productService";
import { sendResponse } from "@/lib/responseUtils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category") || undefined;
    const isFeatured =
      searchParams.get("featured") === "true" ? true : undefined;

    const products = await ProductService.getAllProducts({
      categorySlug,
      isFeatured,
    });

    return sendResponse(true, "Products retrieved successfully", products);
  } catch (error) {
    console.error("API routing error in Products controller:", error);
    const message =
      error instanceof Error
        ? error.message
        : "An unexpected system exception occurred";

    return sendResponse(false, message, null, 500);
  }
}
```

## 6. Implementation roadmap

1. **Database and seed data:** Configure PostgreSQL, add the Prisma schema,
   create migrations and indexes, and seed the Honey, Nuts, Ghee, and Dates
   categories.
2. **Authentication and admin access:** Configure Better Auth and its database
   adapter, then protect admin endpoints such as `/api/admin/*`.
3. **Services and APIs:** Implement product and order services, variant
   pricing, cart operations, localized delivery fees, and order submission.
4. **Storefront and checkout:** Build the emerald-and-white UI, persistent cart
   drawer, and streamlined single-page checkout experience.
