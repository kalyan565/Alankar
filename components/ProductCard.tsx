'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { FiShoppingCart } from 'react-icons/fi'
import { Product } from '@/context/CartContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colorVariants && product.colorVariants.length > 0 
      ? product.colorVariants[0].name 
      : undefined
  )
  const [imageError, setImageError] = useState(false)

  const handleAddToCart = () => {
    addToCart(product, selectedColor)
  }

  // Fallback image based on category
  const getFallbackImage = () => {
    if (product.category === 'Hair Color') {
      return 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop&q=80'
    }
    if (product.category === 'Trimmer') {
      return 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500&h=500&fit=crop&q=80'
    }
    return 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=500&h=500&fit=crop&q=80'
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-64 bg-gray-200">
        <img
          src={imageError ? getFallbackImage() : product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
        {product.featured && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
            Featured
          </div>
        )}
        <div className="absolute top-2 right-2 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {product.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        {/* Color Variants Selector */}
        {product.colorVariants && product.colorVariants.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-700 mb-2">Select Color:</p>
            <div className="flex flex-wrap gap-2">
              {product.colorVariants.map((variant, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(variant.name)}
                  className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === variant.name
                      ? 'border-primary-600 scale-110 ring-2 ring-primary-300'
                      : 'border-gray-300 hover:border-primary-400'
                  }`}
                  style={{ backgroundColor: variant.hex }}
                  title={variant.name}
                >
                  {selectedColor === variant.name && (
                    <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
            {selectedColor && (
              <p className="text-xs text-gray-600 mt-1">Selected: {selectedColor}</p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">₹{product.price.toFixed(0)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center gap-2"
          >
            <FiShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
