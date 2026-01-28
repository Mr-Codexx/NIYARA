'use client'

import { useState } from 'react'
import { ShoppingBag, Truck, Shield, CreditCard, Plus, Minus, Star, Package, Check } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '../contexts/CartContext'
import toast from 'react-hot-toast'
import { Product } from '../contexts/CartContext'

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

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'facial', label: 'Facial Care' },
  { id: 'home', label: 'Home Essentials' },
  { id: 'dining', label: 'Dining' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'commercial', label: 'Commercial' }
]

export default function ShopPage() {
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    getCartCount, 
    isProductInCart, 
    getProductQuantity 
  } = useCart()
  
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'name'>('name')

  const filteredProducts = sampleProducts.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  )

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    toast.success(`${product.name} added to cart!`)
  }

  const handleIncreaseQuantity = (productId: string) => {
    const currentQuantity = getProductQuantity(productId)
    updateQuantity(productId, currentQuantity + 1)
    toast.success('Quantity increased!')
  }

  const handleDecreaseQuantity = (productId: string) => {
    const currentQuantity = getProductQuantity(productId)
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1)
      toast.success('Quantity decreased!')
    } else {
      const product = sampleProducts.find(p => p.id === productId)
      removeFromCart(productId)
      if (product) {
        toast.success(`${product.name} removed from cart!`)
      }
    }
  }

  const handleRemoveFromCart = (productId: string) => {
    const product = sampleProducts.find(p => p.id === productId)
    removeFromCart(productId)
    if (product) {
      toast.success(`${product.name} removed from cart!`)
    }
  }

  const cartCount = getCartCount()

  // Calculate cart summary
  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  const shipping = cartTotal > 999 ? 0 : 99
  const tax = cartTotal * 0.18
  const grandTotal = cartTotal + shipping + tax

  return (
    <div className="pt-16 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Shop Niyara Products
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Premium hygiene products delivered to your doorstep
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-3 mx-auto">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Free Shipping</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">On orders above ₹999</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-3 mx-auto">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Secure Payment</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">100% secure transactions</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-3 mx-auto">
              <CreditCard className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Easy Returns</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">30-day return policy</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mb-3 mx-auto">
              <Star className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Quality Assured</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Premium products guaranteed</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories & Cart Summary */}
          <div className="lg:col-span-1 space-y-8">
            {/* Categories Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Sort By
                </h3>
                <div className="space-y-2">
                  {[
                    { id: 'name', label: 'Name (A-Z)' },
                    { id: 'price-low', label: 'Price (Low to High)' },
                    { id: 'price-high', label: 'Price (High to Low)' }
                  ].map((sort) => (
                    <button
                      key={sort.id}
                      onClick={() => setSortBy(sort.id as any)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        sortBy === sort.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {sort.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Your Cart
                </h3>
                <span className="h-6 w-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              </div>
              
              {cartCount > 0 ? (
                <>
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            ₹{item.product.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDecreaseQuantity(item.product.id)}
                            className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncreaseQuantity(item.product.id)}
                            className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary */}
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
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-900 dark:text-white">Total</span>
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          ₹{grandTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Link
                      href="/cart"
                      className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
                    >
                      View Cart
                    </Link>
                    <Link
                      href="/checkout"
                      className="block w-full text-center border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium py-3 rounded-lg transition-colors"
                    >
                      Checkout
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Your cart is empty</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Add items to see them here
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Products Count & Filter Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 dark:text-gray-300">
                Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
                {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.label}`}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-sm bg-transparent border-0 focus:ring-0 text-gray-900 dark:text-white"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <Package className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Try selecting a different category
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => {
                  const isInCart = isProductInCart(product.id)
                  const quantity = getProductQuantity(product.id)
                  
                  return (
                    <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                      {/* Product Image */}
                      <div className="h-48 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 flex items-center justify-center relative overflow-hidden">
                        <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Package className="h-12 w-12 text-white" />
                        </div>
                        
                        {/* Stock Indicator */}
                        <div className="absolute top-4 right-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            product.stock > 20 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                          }`}>
                            {product.stock > 20 ? 'In Stock' : 'Low Stock'}
                          </span>
                        </div>
                        
                        {/* Already in Cart Badge */}
                        {isInCart && (
                          <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium">
                              <Check className="h-3 w-3" />
                              In Cart
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Product Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {product.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              ₹{product.price.toLocaleString()}
                            </div>
                            {product.category === 'facial' && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Pack of 50
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="mb-4">
                          <span className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs font-medium">
                            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                          </span>
                        </div>

                        {/* Quantity Controls or Add to Cart Button */}
                        {isInCart ? (
                          <div className="space-y-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => handleDecreaseQuantity(product.id)}
                                  className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="text-lg font-bold w-8 text-center">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() => handleIncreaseQuantity(product.id)}
                                  className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-gray-900 dark:text-white">
                                  ₹{(product.price * quantity).toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Total
                                </div>
                              </div>
                            </div>
                            
                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemoveFromCart(product.id)}
                              className="w-full text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium py-2 text-sm flex items-center justify-center gap-2"
                            >
                              Remove from Cart
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors group"
                          >
                            <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Bulk Products Notice */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Need Bulk Quantities?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We offer special pricing for bulk orders and private labelling. 
                    Perfect for businesses, hotels, restaurants, and institutions.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 text-sm font-medium">
                      Jumbo Rolls Available
                    </span>
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 text-sm font-medium">
                      Private Labelling
                    </span>
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 text-sm font-medium">
                      Bulk Discounts
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}