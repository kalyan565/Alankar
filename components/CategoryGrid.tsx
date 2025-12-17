'use client'

import CategoryCard from './CategoryCard'
import { products } from '@/data/products'

const categoryInfo: { [key: string]: { description: string; icon: string } } = {
  'Hair Color': {
    description: 'Premium hair coloring products with multiple shades and natural ingredients',
    icon: '🎨',
  },
  'Trimmer': {
    description: 'Professional hair trimmers for salon and personal use',
    icon: '✂️',
  },
  'Hair Care': {
    description: 'Complete hair care solutions including oils, shampoos, and treatments',
    icon: '💆',
  },
  'Styling Tools': {
    description: 'Professional styling tools including dryers, straighteners, and clippers',
    icon: '🔧',
  },
  'Accessories': {
    description: 'Essential hair styling accessories and tools',
    icon: '✨',
  },
  'Oils': {
    description: 'Premium hair oils for conditioning, growth, and nourishment',
    icon: '💧',
  },
  'Blades': {
    description: 'High-quality razor blades for smooth and precise shaving',
    icon: '🔪',
  },
}

export default function CategoryGrid() {
  // Get unique categories and count products
  const categories = Array.from(new Set(products.map(p => p.category)))
    .map(category => {
      const count = products.filter(p => p.category === category).length
      return {
        name: category,
        count,
        ...categoryInfo[category],
      }
    })
    .filter(cat => cat.name) // Remove any undefined categories

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryCard
          key={category.name}
          name={category.name}
          description={category.description || `Browse our ${category.name} collection`}
          image={category.icon}
          count={category.count}
          href={`/products?category=${encodeURIComponent(category.name)}`}
        />
      ))}
    </div>
  )
}

