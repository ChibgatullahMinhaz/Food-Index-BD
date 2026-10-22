# Food Index BD

Food Index BD is a Next.js storefront for organic groceries, with an admin dashboard,
cart, checkout, and API routes for catalog and order management. It uses the Next.js
App Router (`app/`) for both the website and API endpoints.

## Run Locally

**Prerequisites:** Node.js 20.9 or newer and pnpm

1. Install dependencies:
   `pnpm install`
2. (Optional) Set `GEMINI_API_KEY` in `.env.local` if using Gemini API features.
3. Start the development server:
   `pnpm dev`

Production builds can be created with `pnpm build` and served with `pnpm start`.
