'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { FiShoppingCart, FiMenu, FiSearch, FiPackage } from 'react-icons/fi'
import { useState } from 'react'
import Logo from './Logo'

export default function Header() {
  const { getTotalItems } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />

          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
            <Link href="/" className="text-gray-700 hover:text-red-600 transition font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-red-600 transition font-medium">
              Products
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 transition font-medium">
              Contact
            </Link>
            <Link href="/orders" className="text-gray-700 hover:text-red-600 transition font-medium flex items-center gap-1">
              <FiPackage className="w-4 h-4" />
              Orders
            </Link>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="ml-4">
              <div className="relative group">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-red-600">
                  <FiSearch className="w-4 h-4 text-gray-400 group-focus-within:text-red-600 transition-colors duration-300" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg bg-white shadow-sm text-sm w-64 transition-all duration-300 focus:outline-none focus:border-transparent focus:shadow-md focus:shadow-red-100 focus:bg-gray-50 hover:border-gray-300"
                />
                {/* Animated underline effect */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 transform scale-x-0 group-focus-within:scale-x-100 origin-center rounded-full"></div>
              </div>
            </form>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-black transition"
            >
              <FiShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link
              href="/"
              className="block py-2 text-gray-700 hover:text-red-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block py-2 text-gray-700 hover:text-red-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-gray-700 hover:text-red-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
                <Link
                  href="/orders"
                  className="block py-2 text-gray-700 hover:text-red-600 transition flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiPackage className="w-4 h-4" />
                  Orders
                </Link>

                {/* Mobile Search Bar */}
            <form onSubmit={handleSearch} className="pt-2">
              <div className="relative group">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-red-600">
                  <FiSearch className="w-4 h-4 text-gray-400 group-focus-within:text-red-600 transition-colors duration-300" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg bg-white shadow-sm text-sm transition-all duration-300 focus:outline-none focus:border-transparent focus:shadow-md focus:shadow-red-100 focus:bg-gray-50 hover:border-gray-300"
                />
                {/* Animated underline effect */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 transform scale-x-0 group-focus-within:scale-x-100 origin-center rounded-full"></div>
              </div>
            </form>
          </nav>
        )}
      </div>
    </header>
  )
}

