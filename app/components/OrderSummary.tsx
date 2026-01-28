'use client'

import { Package, Truck, Shield } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

interface OrderSummaryProps {
  cartTotal: number
  shipping: number
  tax: number
  grandTotal: number
}

export default function OrderSummary({ cartTotal, shipping, tax, grandTotal }: OrderSummaryProps) {
  const { cart } = useCart()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Order Summary
      </h2>
      
      {/* Items List */}
      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div key={item.product.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 flex items-center justify-center">
                <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  {item.product.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>
            <p className="font-medium text-gray-900 dark:text-white">
              ₹{(item.product.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
          <span className="font-medium text-gray-900 dark:text-white">
            ₹{cartTotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Shipping</span>
          <span className={`font-medium ${shipping === 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
            {shipping === 0 ? 'FREE' : `₹${shipping}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Tax (GST 18%)</span>
          <span className="font-medium text-gray-900 dark:text-white">
            ₹{tax.toFixed(2)}
          </span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex justify-between">
            <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ₹{grandTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      {cartTotal < 999 && (
        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            Add ₹{(999 - cartTotal).toLocaleString()} more to get FREE shipping!
          </p>
        </div>
      )}

      {/* Features */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Free Shipping</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">On orders above ₹999</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Secure Payment</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">256-bit SSL encryption</p>
          </div>
        </div>
      </div>
    </div>
  )
}