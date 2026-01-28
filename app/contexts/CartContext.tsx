'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface ShippingAddress {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface PaymentInfo {
  cardNumber: string
  cardHolder: string
  expiryDate: string
  cvv: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  shippingAddress: ShippingAddress
  paymentInfo: PaymentInfo
  orderDate: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
}

interface CartContextType {
  cart: CartItem[]
  orders: Order[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
  checkout: (shippingAddress: ShippingAddress, paymentInfo: PaymentInfo) => Promise<string>
  getProductById: (id: string) => Product | undefined
  isProductInCart: (productId: string) => boolean
  getProductQuantity: (productId: string) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Sample products data
const sampleProducts: Product[] = [
  { id: '1', name: 'Face Tissues', description: 'Soft and gentle facial tissues', price: 299, category: 'facial', image: '/images/face-tissues.jpg', stock: 100 },
  { id: '2', name: 'Toilet Rolls', description: 'Premium quality toilet rolls', price: 399, category: 'home', image: '/images/toilet-rolls.jpg', stock: 80 },
  { id: '3', name: 'Kitchen Towel', description: 'Highly absorbent kitchen towels', price: 249, category: 'home', image: '/images/kitchen-towel.jpg', stock: 120 },
  { id: '4', name: 'Bamboo Face Tissue', description: 'Eco-friendly bamboo tissues', price: 349, category: 'facial', image: '/images/bamboo-tissue.jpg', stock: 60 },
  { id: '5', name: 'Napkins', description: 'Quality paper napkins', price: 199, category: 'dining', image: '/images/napkins.jpg', stock: 150 },
  { id: '6', name: 'Aluminium Foil', description: 'Food grade aluminium foil', price: 149, category: 'kitchen', image: '/images/aluminium-foil.jpg', stock: 200 },
  { id: '7', name: 'Cling Film', description: 'Food preservation film', price: 179, category: 'kitchen', image: '/images/cling-film.jpg', stock: 180 },
  { id: '8', name: 'Bamboo Napkins', description: 'Eco-friendly dining napkins', price: 299, category: 'dining', image: '/images/bamboo-napkins.jpg', stock: 90 },
  { id: '9', name: 'Jumbo Rolls', description: 'Industrial size tissue rolls', price: 1299, category: 'commercial', image: '/images/jumbo-rolls.jpg', stock: 40 },
  { id: '10', name: 'Private Labelling', description: 'Custom branded products', price: 999, category: 'commercial', image: '/images/private-label.jpg', stock: 999 },
]

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('niyara-cart')
      return savedCart ? JSON.parse(savedCart) : []
    }
    return []
  })
  
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const savedOrders = localStorage.getItem('niyara-orders')
      return savedOrders ? JSON.parse(savedOrders) : []
    }
    return []
  })

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('niyara-cart', JSON.stringify(cart))
  }, [cart])

  // Save orders to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('niyara-orders', JSON.stringify(orders))
  }, [orders])

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id)
      
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prevCart, { product, quantity }]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const getProductById = (id: string) => {
    return sampleProducts.find(product => product.id === id)
  }

  const isProductInCart = (productId: string) => {
    return cart.some(item => item.product.id === productId)
  }

  const getProductQuantity = (productId: string) => {
    const item = cart.find(item => item.product.id === productId)
    return item ? item.quantity : 0
  }

  const checkout = async (shippingAddress: ShippingAddress, paymentInfo: PaymentInfo): Promise<string> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    const newOrder: Order = {
      id: orderId,
      items: [...cart],
      total: getCartTotal(),
      shippingAddress,
      paymentInfo,
      orderDate: new Date().toISOString(),
      status: 'processing'
    }
    
    setOrders(prevOrders => [newOrder, ...prevOrders])
    clearCart()
    
    return orderId
  }

  const value: CartContextType = {
    cart,
    orders,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    checkout,
    getProductById,
    isProductInCart,
    getProductQuantity
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}