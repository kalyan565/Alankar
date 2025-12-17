'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CartItem } from './CartContext'

export interface Order {
  id: string
  orderNumber: string
  date: string
  customerName: string
  phone: string
  shopName: string
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  status: 'pending' | 'confirmed' | 'completed'
}

interface OrderContextType {
  orders: Order[]
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'date'>) => Order
  getOrder: (orderId: string) => Order | undefined
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])

  const generateOrderNumber = () => {
    return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  }

  const addOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `order-${Date.now()}`,
      orderNumber: generateOrderNumber(),
      date: new Date().toISOString(),
    }
    setOrders((prev) => [newOrder, ...prev])
    return newOrder
  }

  const getOrder = (orderId: string): Order | undefined => {
    return orders.find((order) => order.id === orderId)
  }

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider')
  }
  return context
}

