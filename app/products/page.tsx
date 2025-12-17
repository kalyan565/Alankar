'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'
import { FiX } from 'react-icons/fi'
import Link from 'next/link'

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const searchParam = searchParams.get('search')
  const [searchQuery, setSearchQuery] = useState(searchParam || '')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam)

  useEffect(() => {
    setSelectedCategory(categoryParam)
    if (searchParam) {
      setSearchQuery(searchParam)
    }
  }, [categoryParam, searchParam])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          {selectedCategory ? `${selectedCategory} Products` : 'Our Products'}
        </h1>
        {selectedCategory && (
          <Link
            href="/products"
            className="flex items-center gap-2 text-black hover:text-red-600 font-medium"
          >
            <FiX className="w-5 h-5" />
            Clear Filter
          </Link>
        )}
      </div>

      <ProductGrid searchQuery={searchQuery} category={selectedCategory || undefined} />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}

