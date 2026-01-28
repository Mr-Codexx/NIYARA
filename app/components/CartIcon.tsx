'use client'

import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '../contexts/CartContext'

export default function CartIcon() {
  const { getCartCount } = useCart()
  const cartCount = getCartCount()

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
          {cartCount > 99 ? '99+' : cartCount}
        </span>
      )}
    </Link>
  )
}