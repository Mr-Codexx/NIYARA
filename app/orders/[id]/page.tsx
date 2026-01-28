'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CheckCircle, Truck, Package, Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '../../contexts/CartContext'
import { Order } from '../../contexts/CartContext'

export default function OrderConfirmationPage() {
  const params = useParams()
  const { orders } = useCart()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const orderId = params.id as string
    const foundOrder = orders.find(o => o.id === orderId)
    setOrder(foundOrder || null)
    setLoading(false)
  }, [params.id, orders])

  if (loading) {
    return (
      <div className="pt-16 pb-24 min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="pt-16 pb-24 min-h-[70vh]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Order Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              The order you're looking for doesn't exist.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Order Confirmed!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Thank you for your purchase. Your order has been received.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Order Info */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Order Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Order ID</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Order Date</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {new Date(order.orderDate).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                        order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Shipping Address
                  </h2>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {order.shippingAddress.fullName}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {order.shippingAddress.address}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {order.shippingAddress.country}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      📞 {order.shippingAddress.phone}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      ✉️ {order.shippingAddress.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Order Items
                </h2>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 flex items-center justify-center">
                          <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          ₹{item.product.price.toLocaleString()} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ₹{order.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {order.total > 999 ? 'FREE' : '₹99'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Tax (GST 18%)</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ₹{(order.total * 0.18).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ₹{(order.total + (order.total > 999 ? 0 : 99) + (order.total * 0.18)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <Truck className="h-8 w-8 text-blue-600 dark:text-blue-400 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  What's Next?
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>You'll receive an order confirmation email shortly</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>We'll notify you when your order ships</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Expected delivery: 2-5 business days</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
            >
              <Home className="h-5 w-5 mr-2" />
              Continue Shopping
            </Link>
            <Link
              href="/orders"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 px-8 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              View All Orders
              <ArrowLeft className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}