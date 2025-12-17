'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { FiShoppingCart, FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi'
import { Product } from '@/context/CartContext'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart()
  const [imageError, setImageError] = useState(false)
  const [cartItem, setCartItem] = useState<any>(null)

  // Check if this product is in cart
  useEffect(() => {
    const item = cart.find((item) => item.id === product.id)
    setCartItem(item || null)
  }, [cart, product.id])

  const handleAddToCart = () => {
    addToCart(product)
  }

  const handleIncreaseQuantity = () => {
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1)
    } else {
      addToCart(product)
    }
  }

  const handleDecreaseQuantity = () => {
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(product.id, cartItem.quantity - 1)
    } else if (cartItem) {
      removeFromCart(product.id)
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

        <div className="flex items-center justify-end gap-3">
          {cartItem ? (
            // Show quantity controls and Go to Cart button if item is in cart
            <>
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
              <Link
                href="/cart"
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-2 font-semibold"
              >
                <FiShoppingCart />
                Go to Cart
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </>
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
