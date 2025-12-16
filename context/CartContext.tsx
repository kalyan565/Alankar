'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface ColorVariant {
  name: string
  hex: string
  image?: string
}

export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: string
  colorVariants?: ColorVariant[]
  selectedColor?: string
  featured?: boolean // For products that should appear at top
}

export interface CartItem extends Product {
  quantity: number
  selectedColorVariant?: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, selectedColor?: string) => void
  removeFromCart: (productId: number, selectedColor?: string) => void
  updateQuantity: (productId: number, quantity: number, selectedColor?: string) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product, selectedColor?: string) => {
    setCart((prevCart) => {
      // For products with color variants, check if same color already exists
      const itemKey = selectedColor 
        ? `${product.id}-${selectedColor}`
        : product.id.toString()
      
      const existingItem = prevCart.find((item) => {
        if (selectedColor) {
          return item.id === product.id && item.selectedColorVariant === selectedColor
        }
        return item.id === product.id && !item.selectedColorVariant
      })
      
      if (existingItem) {
        return prevCart.map((item) =>
          (selectedColor && item.id === product.id && item.selectedColorVariant === selectedColor) ||
          (!selectedColor && item.id === product.id && !item.selectedColorVariant)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1, selectedColorVariant: selectedColor }]
    })
  }

  const removeFromCart = (productId: number, selectedColor?: string) => {
    setCart((prevCart) => 
      prevCart.filter((item) => {
        if (selectedColor) {
          return !(item.id === productId && item.selectedColorVariant === selectedColor)
        }
        return !(item.id === productId && !item.selectedColorVariant)
      })
    )
  }

  const updateQuantity = (productId: number, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor)
      return
    }
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (selectedColor) {
          return (item.id === productId && item.selectedColorVariant === selectedColor)
            ? { ...item, quantity }
            : item
        }
        return (item.id === productId && !item.selectedColorVariant)
          ? { ...item, quantity }
          : item
      })
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

