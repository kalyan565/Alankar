'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { FiShoppingCart, FiPlus, FiMinus } from 'react-icons/fi'
import { Product } from '@/context/CartContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart()
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colorVariants && product.colorVariants.length > 0 
      ? product.colorVariants[0].name 
      : undefined
  )
  const [imageError, setImageError] = useState(false)
  const [cartItem, setCartItem] = useState<any>(null)

  // Check if this product (with selected color) is in cart
  useEffect(() => {
    const item = cart.find((item) => {
      if (selectedColor) {
        return item.id === product.id && item.selectedColorVariant === selectedColor
      }
      return item.id === product.id && !item.selectedColorVariant
    })
    setCartItem(item || null)
  }, [cart, product.id, selectedColor])

  const handleAddToCart = () => {
    addToCart(product, selectedColor)
  }

  const handleIncreaseQuantity = () => {
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1, selectedColor)
    } else {
      addToCart(product, selectedColor)
    }
  }

  const handleDecreaseQuantity = () => {
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(product.id, cartItem.quantity - 1, selectedColor)
    } else if (cartItem) {
      removeFromCart(product.id, selectedColor)
    }
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
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        {/* Color Variants Selector */}
        {product.colorVariants && product.colorVariants.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-700 mb-2">Select Color:</p>
            <div className="flex flex-wrap gap-2">
              {product.colorVariants.map((variant, index) => {
                const variantInCart = cart.find(
                  (item) => item.id === product.id && item.selectedColorVariant === variant.name
                )
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(variant.name)}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === variant.name
                        ? 'border-black scale-110 ring-2 ring-gray-300'
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                    style={{ backgroundColor: variant.hex }}
                    title={variant.name}
                  >
                    {selectedColor === variant.name && (
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                        ✓
                      </span>
                    )}
                    {variantInCart && selectedColor !== variant.name && (
                      <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {variantInCart.quantity}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            {selectedColor && (
              <p className="text-xs text-gray-600 mt-1">Selected: {selectedColor}</p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-black">₹{product.price.toFixed(0)}</span>
          
          {cartItem ? (
            // Show quantity controls if item is in cart
            <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2">
              <button
                onClick={handleDecreaseQuantity}
                className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition text-black"
                aria-label="Decrease quantity"
              >
                <FiMinus className="w-4 h-4" />
              </button>
              <span className="font-bold text-black min-w-[2rem] text-center">
                {cartItem.quantity}
              </span>
              <button
                onClick={handleIncreaseQuantity}
                className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition text-black"
                aria-label="Increase quantity"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            // Show Add to Cart button if item is not in cart
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-2"
            >
              <FiShoppingCart />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
