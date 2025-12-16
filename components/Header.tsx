'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { FiShoppingCart, FiMenu } from 'react-icons/fi'
import { useState } from 'react'
import Logo from './Logo'

export default function Header() {
  const { getTotalItems } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary-600 transition font-medium">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition font-medium">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-primary-600 transition"
            >
              <FiShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
              className="block py-2 text-gray-700 hover:text-primary-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block py-2 text-gray-700 hover:text-primary-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="block py-2 text-gray-700 hover:text-primary-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-gray-700 hover:text-primary-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

