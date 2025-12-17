'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart()
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({})

  const getFallbackImage = (category: string) => {
    if (category === 'Hair Color') {
      return 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop&q=80'
    }
    if (category === 'Trimmer') {
      return 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500&h=500&fit=crop&q=80'
    }
    return 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=500&h=500&fit=crop&q=80'
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/products"
        className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition mb-6 font-medium"
      >
        <FiArrowLeft className="w-5 h-5" />
        Back to Products
      </Link>
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            {cart.map((item, index) => (
              <div key={`${item.id}-${item.selectedColorVariant || 'default'}-${index}`} className="flex items-center gap-4 py-6 border-b last:border-b-0">
                <img
                  src={imageErrors[`${item.id}-${index}`] ? getFallbackImage(item.category) : item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                  onError={() => setImageErrors(prev => ({ ...prev, [`${item.id}-${index}`]: true }))}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColorVariant)}
                    className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
                  >
                    <FiMinus />
                  </button>
                  <span className="w-12 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColorVariant)}
                    className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
                  >
                    <FiPlus />
                  </button>
                </div>
                <div className="text-right">
                  <button
                    onClick={() => removeFromCart(item.id, item.selectedColorVariant)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 rounded transition"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Items ({getTotalItems()})</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="block w-full bg-black text-white text-center py-3 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

