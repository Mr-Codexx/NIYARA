'use client'

import { useState } from 'react'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Package, Truck, Shield } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '../contexts/CartContext'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleIncrease = (productId: string, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity + 1)
  }

  const handleDecrease = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1)
    }
  }

  const handleRemove = (productId: string, productName: string) => {
    removeFromCart(productId)
    toast.success(`${productName} removed from cart`)
  }

  const handleClearCart = () => {
    clearCart()
    toast.success('Cart cleared successfully')
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate loading state
    setTimeout(() => {
      setIsCheckingOut(false)
    }, 1000)
  }

  if (cart.length === 0) {
    return (
      <div className="pt-16 pb-24 min-h-[70vh]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const cartTotal = getCartTotal()
  const shipping = cartTotal > 999 ? 0 : 99
  const tax = cartTotal * 0.18 // 18% GST
  const grandTotal = cartTotal + shipping + tax

  return (
    <div className="pt-16 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Shopping Cart
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                      {/* Product Image */}
                      <div className="h-24 w-24 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 flex items-center justify-center">
                        <Package className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {item.product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            ₹{item.product.price.toLocaleString()}
                          </span>
                          <button
                            onClick={() => handleRemove(item.product.id, item.product.name)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleDecrease(item.product.id, item.quantity)}
                          className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrease(item.product.id, item.quantity)}
                          className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Clear Cart Button */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium flex items-center"
                  >
                    <Trash2 className="h-5 w-5 mr-2" />
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-3 mx-auto">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Free Shipping</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">On orders above ₹999</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-3 mx-auto">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Secure Payment</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">100% secure transactions</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-3 mx-auto">
                  <Package className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Easy Returns</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">30-day return policy</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
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

              {cartTotal < 999 && (
                <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    Add ₹{(999 - cartTotal).toLocaleString()} more to get FREE shipping!
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <Link
                  href="/checkout"
                  onClick={handleCheckout}
                  className={`w-full flex items-center justify-center gap-2 ${
                    isCheckingOut ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
                  } text-white font-medium py-3 rounded-lg transition-colors`}
                >
                  {isCheckingOut ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Proceed to Checkout
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </Link>
                
                <Link
                  href="/products"
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  Accepted Payment Methods
                </h3>
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Visa</div>
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">MasterCard</div>
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Rupay</div>
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">UPI</div>
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Net Banking</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}