import { CheckCircle, Truck, Package, Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface PaymentSuccessProps {
  orderId: string
}

export default function PaymentSuccess({ orderId }: PaymentSuccessProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
      <div className="text-center">
        <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Thank you for your order. Your payment has been processed successfully 
          and your order is being prepared for shipment.
        </p>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-8 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Order Confirmed
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Order ID: <span className="font-mono font-bold">{orderId}</span>
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We've sent a confirmation email with all the details.
          </p>
          <Link
            href={`/orders/${orderId}`}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            View Order Details
            <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
          </Link>
        </div>

        {/* Next Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center p-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Order Confirmed</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Order received and being processed
            </p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-4">
              <Package className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Preparing</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Your items are being prepared
            </p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <Truck className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Shipping</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Expected delivery in 2-5 days
            </p>
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
          </Link>
        </div>

        {/* Contact Support */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-300">
            Need help? <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}