# Nova — E-Commerce Template

A brand new, clean e-commerce website template built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- Home page with **all product categories** displayed
- Category pages with product grid
- Product detail pages with cart
- Shopping cart with local storage
- Mobile-responsive navigation
- Gradient category cards (no external images needed)
- Empty product list — add your own

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Customize everything

Edit **`src/lib/store.ts`**:

```ts
export const store = {
  name: "Your Store",
  tagline: "Your tagline here",
  description: "Your description",
};

export const categories = [ /* your categories */ ];
export const products = [ /* your products */ ];
```

## Pages

| Route | Description |
|---|---|
| `/` | Home — shows all categories |
| `/categories/[slug]` | Category product listing |
| `/products/[id]` | Product detail |
| `/cart` | Shopping cart |

## Project structure

```
src/
├── app/                    # Pages
├── components/
│   ├── layout/             # Navbar, Footer
│   └── shop/               # CategoryTile, ProductCard
├── context/                # Cart state
├── lib/store.ts            # ← Edit this file
└── types/store.ts          # TypeScript types
```
