# Alankar Cosmetics - Professional Salon Items E-Commerce Website

A modern, professional e-commerce website for selling salon items and beauty supplies in Andhra Pradesh, India.

## Features

- 🛍️ **Product Catalog**: Browse through a wide range of professional salon items
- 🔍 **Search Functionality**: Search products by name, description, or category
- 🛒 **Shopping Cart**: Add items to cart with quantity management
- 🎨 **Color Variants**: Select different color options for hair color products
- 💳 **Checkout System**: Complete checkout process with order form
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🎨 **Modern UI**: Beautiful, professional design with Tailwind CSS
- 💾 **Local Storage**: Cart persists across page refreshes

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Icons** - Icon library

## Products

### Hair Colors
- Grass Herbs Hair Color
- Fruit Veniger Hair Color
- Color Beauty Wine Color
- Mint Hair Color
- Lavender Hair Color

### Trimmers
- Kemei 3909, Kemei 657
- Gemei 6005, Gemei 654, Gemei 8046
- Whal Trimmer Super Tapper

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/alankar-cosmetics.git
cd alankar-cosmetics
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Deployment

This project is deployed on Vercel. Every push to the `main` branch automatically triggers a new deployment.

## Project Structure

```
shop/
├── app/              # Next.js app directory
│   ├── cart/        # Shopping cart page
│   ├── checkout/    # Checkout page
│   ├── products/    # Products page with search
│   ├── layout.tsx   # Root layout
│   └── page.tsx     # Home page
├── components/       # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Logo.tsx
│   ├── ProductCard.tsx
│   └── ProductGrid.tsx
├── context/         # React context
│   └── CartContext.tsx
├── data/            # Data files
│   └── products.ts
└── public/          # Static assets
    └── images/      # Product images
```

## License

MIT

## Contact

For inquiries, please contact Alankar Cosmetics.
