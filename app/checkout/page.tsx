'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useOrders } from '@/context/OrderContext'
import Link from 'next/link'
import { FiCheckCircle, FiPackage } from 'react-icons/fi'

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart()
  const { addOrder } = useOrders()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    shopName: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [orderDetails, setOrderDetails] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const order = addOrder({
      customerName: formData.name,
      phone: formData.phone,
      shopName: formData.shopName,
      items: [...cart],
      subtotal: 0,
      shipping: 0,
      total: 0,
      status: 'pending',
    })
    
    // Send order details to WhatsApp and Email
    try {
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      })
      
      const result = await response.json()
      
      // Open WhatsApp link if available
      if (result.whatsappUrl) {
        // Open WhatsApp in a new window/tab
        window.open(result.whatsappUrl, '_blank')
      }
    } catch (error) {
      console.error('Error sending order notification:', error)
      // Continue even if notification fails
    }
    
    setOrderDetails(order)
    clearCart()
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (isSubmitted && orderDetails) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <FiCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-2">Thank you for your order. We&apos;ll contact you shortly.</p>
            <p className="text-lg font-semibold text-gray-800">Order Number: <span className="text-red-600">{orderDetails.orderNumber}</span></p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Customer Information</h3>
                <p className="text-gray-600">Name: <span className="font-medium">{orderDetails.customerName}</span></p>
                <p className="text-gray-600">Phone: <span className="font-medium">{orderDetails.phone}</span></p>
                <p className="text-gray-600">Shop: <span className="font-medium">{orderDetails.shopName}</span></p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Order Information</h3>
                <p className="text-gray-600">Date: <span className="font-medium">{new Date(orderDetails.date).toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span></p>
                <p className="text-gray-600">Status: <span className="font-medium text-red-600 capitalize">{orderDetails.status}</span></p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-700 mb-3">Order Items</h3>
              <div className="space-y-2">
                {orderDetails.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm py-2 border-b last:border-b-0">
                    <span className="text-gray-600">{item.name} x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              href="/orders"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              <FiPackage />
              View All Orders
            </Link>
            <Link
              href="/"
              className="inline-block bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Information</h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-transparent focus:shadow-md focus:shadow-red-100 focus:bg-gray-50 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-transparent focus:shadow-md focus:shadow-red-100 focus:bg-gray-50 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shop Name</label>
                  <input
                    type="text"
                    name="shopName"
                    required
                    value={formData.shopName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-transparent focus:shadow-md focus:shadow-red-100 focus:bg-gray-50 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full max-w-md bg-black text-white py-4 rounded-lg font-semibold hover:bg-red-600 transition text-lg"
            >
              Place Order
            </button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>
            <div className="space-y-3 mb-6">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.selectedColorVariant || 'default'}-${index}`} className="flex justify-between text-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-600">{item.name} x{item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

