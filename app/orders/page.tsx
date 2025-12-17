'use client'

import { useOrders } from '@/context/OrderContext'
import Link from 'next/link'
import { FiPackage, FiArrowLeft, FiCalendar, FiPhone, FiUser } from 'react-icons/fi'

export default function OrdersPage() {
  const { orders } = useOrders()

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <FiPackage className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-800">No Orders Yet</h1>
          <p className="text-gray-600 mb-8">You haven&apos;t placed any orders yet.</p>
          <Link
            href="/products"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">My Orders</h1>
          <p className="text-gray-600 mt-2">View all your order history</p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition"
        >
          <FiArrowLeft />
          Back to Home
        </Link>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center gap-3 mb-2">
                  <FiPackage className="w-5 h-5 text-red-600" />
                  <h2 className="text-xl font-bold text-gray-800">Order #{order.orderNumber}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4" />
                    <span>{new Date(order.date).toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiUser className="w-4 h-4" />
                    <span>{order.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPhone className="w-4 h-4" />
                    <span>{order.phone}</span>
                  </div>
                </div>
                {order.shopName && (
                  <p className="text-sm text-gray-600 mt-1">Shop: {order.shopName}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800 blur-sm select-none">₹{order.total.toFixed(0)}</p>
                <p className="text-sm text-gray-600">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-700 mb-3">Order Items</h3>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm py-2">
                    <span className="text-gray-600">{item.name} x{item.quantity}</span>
                    <span className="font-semibold blur-sm select-none">₹{(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold blur-sm select-none">₹{order.subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold blur-sm select-none">₹{order.shipping.toFixed(0)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

