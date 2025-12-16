# Alankar Cosmetics - Professional Salon Items E-Commerce Website

A modern, professional e-commerce website for selling salon items and beauty supplies.

## Features

- 🛍️ **Product Catalog**: Browse through a wide range of professional salon items
- 🛒 **Shopping Cart**: Add items to cart with quantity management
- 💳 **Checkout System**: Complete checkout process with order form
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🎨 **Modern UI**: Beautiful, professional design with Tailwind CSS
- 💾 **Local Storage**: Cart persists across page refreshes

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Icons** - Icon library

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
shop/
├── app/              # Next.js app directory
│   ├── cart/        # Shopping cart page
│   ├── checkout/    # Checkout page
│   ├── layout.tsx   # Root layout
│   └── page.tsx     # Home page
├── components/       # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ProductCard.tsx
│   └── ProductGrid.tsx
├── context/         # React context
│   └── CartContext.tsx
├── data/            # Data files
│   └── products.ts
└── public/          # Static assets
```

## Features in Detail

### Shopping Cart
- Add/remove products
- Update quantities
- Persistent cart (localStorage)
- Real-time total calculation

### Checkout
- Customer information form
- Payment information form
- Order summary
- Order confirmation

### Product Categories
- Tools
- Appliances
- Accessories
- Products

## Customization

You can easily customize:
- Products in `data/products.ts`
- Colors in `tailwind.config.js`
- Styling in component files
- Add more pages and features

## License

MIT

