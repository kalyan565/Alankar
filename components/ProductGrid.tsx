'use client'

import ProductCard from './ProductCard'
import { products } from '@/data/products'

interface ProductGridProps {
  searchQuery?: string
  category?: string
}

export default function ProductGrid({ searchQuery = '', category }: ProductGridProps) {
  let filteredProducts = products

  // Filter by category if provided
  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    )
  }

  // Filter by search query if provided
  if (searchQuery) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }
  
  // Sort products: featured first, then by id
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return a.id - b.id
  })

  if (sortedProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No products found matching your search.</p>
      </div>
    )
  }

  return (
    <div id="products" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

