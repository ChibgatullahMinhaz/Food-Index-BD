food-index-bd/
├── public/                 # Static assets (images, favicons, fonts)
├── src/                    # Main application source code
│   ├── app/                # Next.js App Router (Routing, Layouts, Pages)
│   │   ├── (auth)/         # Route Group: Authentication flow (omitted from URL)
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/    # Route Group: Protected internal application pages
│   │   │   ├── layout.tsx  # Dashboard-specific shell navigation
│   │   │   └── page.tsx    # localhost:3000/dashboard
│   │   ├── api/            # Route Handlers for standard HTTP endpoints (Webhooks, etc.)
│   │   │   └── webhook/
│   │   ├── globals.css     # Global Tailwind / CSS styles
│   │   ├── layout.tsx      # Global Root Layout
│   │   └── page.tsx        # Homepage / Landing page
│   │
│   ├── actions/            # Server Actions ("use server") for database mutations
│   ├── components/         # Global reusable UI components
│   │   ├── ui/             # Primitive design system components (e.g., Shadcn UI)
│   │   └── shared/         # Multi-page global components (Navbar, Footer)
│   │
│   ├── db/                 # Database connection layer (Prisma, Drizzle, Mongoose)
│   │   ├── index.ts        # Client initialization instance
│   │   └── schema.ts       # Database tables, models, or types definition
│   │
│   ├── hooks/              # Custom React hooks (client state/logic)
│   ├── lib/                # Third-party wrappers and utility functions (Zod schemas, utils)
│   ├── services/           # External API fetching or core business logic layers
│   └── types/              # Global TypeScript interfaces and type declarations
│
├── .env.local              # Local environment variables (Git ignored)
├── next.config.ts          # Next.js specific application configuration
├── package.json            # Scripts, project dependencies, and metadata
└── tsconfig.json