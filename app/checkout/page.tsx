'use client'

import { useState } from 'react'
import { ArrowLeft, Lock, Shield, Truck, Package } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '../contexts/CartContext'
import CheckoutForm from '../components/CheckoutForm'
import OrderSummary from '../components/OrderSummary'
import PaymentSuccess from '../components/PaymentSuccess'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const { cart, getCartTotal, checkout, clearCart } = useCart()
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details')
  const [orderId, setOrderId] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)

  const cartTotal = getCartTotal()
  const shipping = cartTotal > 999 ? 0 : 99
  const tax = cartTotal * 0.18
  const grandTotal = cartTotal + shipping + tax

  const handlePaymentSubmit = async (paymentData: any) => {
    setIsProcessing(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock payment success (90% success rate)
      const isPaymentSuccessful = Math.random() > 0.1
      
      if (isPaymentSuccessful) {
        const generatedOrderId = await checkout(
          {
            fullName: 'Pavan P.',
            email: 'Pavan@gmail.com',
            phone: '9876543210',
            address: '123 Main St',
            city: 'Bangalore',
            state: 'Karnataka',
            postalCode: '560001',
            country: 'India'
          },
          paymentData
        )
        
        setOrderId(generatedOrderId)
        setStep('success')
        toast.success('Payment successful! Order placed.')
      } else {
        throw new Error('Payment failed. Please try again.')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Payment failed')
    } finally {
      setIsProcessing(false)
    }
  }

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="pt-16 pb-24 min-h-[70vh]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Please add items to your cart before checkout.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step === 'details' || step === 'payment' || step === 'success' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}>
                1
              </div>
              <div className={`w-24 h-1 ${step === 'payment' || step === 'success' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step === 'payment' || step === 'success' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}>
                2
              </div>
              <div className={`w-24 h-1 ${step === 'success' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step === 'success' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}>
                3
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4 max-w-2xl mx-auto">
            <span className={`text-sm font-medium ${step === 'details' ? 'text-blue-600' : 'text-gray-500'}`}>
              Details
            </span>
            <span className={`text-sm font-medium ${step === 'payment' ? 'text-blue-600' : 'text-gray-500'}`}>
              Payment
            </span>
            <span className={`text-sm font-medium ${step === 'success' ? 'text-blue-600' : 'text-gray-500'}`}>
              Confirmation
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Checkout Form */}
          <div className="lg:col-span-2">
            {step === 'details' ? (
              <CheckoutForm onNext={() => setStep('payment')} />
            ) : step === 'payment' ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <Lock className="h-6 w-6 text-green-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Secure Payment
                  </h2>
                </div>
                
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-green-600 mr-2" />
                    <p className="text-green-800 dark:text-green-300">
                      Your payment is secure and encrypted
                    </p>
                  </div>
                </div>

                {/* Payment Form */}
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const paymentData = {
                    cardNumber: formData.get('cardNumber') as string,
                    cardHolder: formData.get('cardHolder') as string,
                    expiryDate: formData.get('expiryDate') as string,
                    cvv: formData.get('cvv') as string
                  }
                  handlePaymentSubmit(paymentData)
                }}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Card Holder Name
                      </label>
                      <input
                        type="text"
                        name="cardHolder"
                        placeholder="Pavan P."
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          placeholder="123"
                          maxLength={3}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                      <button
                        type="button"
                        onClick={() => setStep('details')}
                        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium text-white transition-colors ${
                          isProcessing
                            ? 'bg-blue-700 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {isProcessing ? (
                          <>
                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing Payment...
                          </>
                        ) : (
                          <>
                            Pay ₹{grandTotal.toFixed(2)}
                            <Lock className="h-5 w-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>

                {/* Payment Methods */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                    We Accept
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="h-10 w-16 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                      <span className="font-bold text-blue-600">VISA</span>
                    </div>
                    <div className="h-10 w-16 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                      <span className="font-bold text-red-600">Master</span>
                    </div>
                    <div className="h-10 w-16 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                      <span className="font-bold text-blue-800">Rupay</span>
                    </div>
                    <div className="h-10 w-16 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                      <span className="font-bold text-purple-600">UPI</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <PaymentSuccess orderId={orderId} />
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              cartTotal={cartTotal}
              shipping={shipping}
              tax={tax}
              grandTotal={grandTotal}
            />
          </div>
        </div>

        {/* Security Assurance */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-3 mx-auto">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Secure Payment</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">256-bit SSL encryption</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-3 mx-auto">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Fast Delivery</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">2-5 business days</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-3 mx-auto">
              <Package className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Easy Returns</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">30-day return policy</p>
          </div>
        </div>
      </div>
    </div>
  )
}