'use client'

import { useState } from 'react'
import { Package, Calendar, DollarSign, Truck, CheckCircle, Clock, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '../contexts/CartContext'

export default function OrdersPage() {
  const { orders } = useCart()
  const [filter, setFilter] = useState<'all' | 'processing' | 'shipped' | 'delivered'>('all')

  const filteredOrders = orders.filter(order => 
    filter === 'all' || order.status === filter
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return <Clock className="h-5 w-5 text-yellow-500" />
      case 'shipped': return <Truck className="h-5 w-5 text-blue-500" />
      case 'delivered': return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'cancelled': return <XCircle className="h-5 w-5 text-red-500" />
      default: return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'shipped': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  if (orders.length === 0) {
    return (
      <div className="pt-16 pb-24 min-h-[70vh]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              No Orders Yet
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          My Orders
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Track and manage all your orders in one place
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All Orders ({orders.length})
          </button>
          <button
            onClick={() => setFilter('processing')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'processing'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Processing
          </button>
          <button
            onClick={() => setFilter('shipped')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'shipped'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Shipped
          </button>
          <button
            onClick={() => setFilter('delivered')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'delivered'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Delivered
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(order.status)}
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Order #{order.id.split('-')[1]}
                      </h2>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        ₹{order.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <Link
                      href={`/orders/${order.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.items.slice(0, 2).map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 flex items-center justify-center">
                          <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Quantity: {item.quantity} × ₹{item.product.price}
                          </p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <div className="md:col-span-2 pt-4">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          + {order.items.length - 2} more item{order.items.length - 2 !== 1 ? 's' : ''}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Actions */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                  <div className="flex flex-wrap gap-4">
                    {order.status === 'processing' && (
                      <button className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors text-sm font-medium">
                        Cancel Order
                      </button>
                    )}
                    {order.status === 'shipped' && (
                      <button className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors text-sm font-medium">
                        Track Order
                      </button>
                    )}
                    {order.status === 'delivered' && (
                      <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors text-sm font-medium">
                        Buy Again
                      </button>
                    )}
                    <Link
                      href={`/orders/${order.id}`}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                    >
                      Invoice
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}