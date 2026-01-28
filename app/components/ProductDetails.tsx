'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Truck, Shield, Package, Check, Share2, Heart, Minus, Plus } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import toast from 'react-hot-toast'
import type { Product } from '../lib/products'

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart, updateQuantity, isProductInCart, getProductQuantity } = useCart()

  const isInCart = isProductInCart(product.id)
  const cartQuantity = getProductQuantity(product.id)

  const handleAddToCart = () => {
    if (isInCart) {
      updateQuantity(product.id, cartQuantity + quantity)
      toast.success(`Added ${quantity} more ${product.name}(s) to cart!`)
    } else {
      addToCart({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.images[0],
        stock: product.stock
      }, quantity)
      toast.success(`${product.name} added to cart!`)
    }
    setQuantity(1)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    // Navigate to cart page
    window.location.href = '/cart'
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</a>
          </li>
          <li className="flex items-center">
            <span className="mx-2">/</span>
            <a href="/products" className="hover:text-blue-600 dark:hover:text-blue-400">Products</a>
          </li>
          <li className="flex items-center">
            <span className="mx-2">/</span>
            <span className="capitalize">{product.category}</span>
          </li>
          <li className="flex items-center">
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white font-medium">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-6">
          {/* Main Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900">

            {/* ✅ PRODUCT IMAGE (BACKGROUND) */}
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-contain z-0"
              priority
            />

            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <div className="h-64 w-64 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20"></div>
            </div>

            <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
              {discount > 0 && (
                <span className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-bold shadow">
                  {discount}% OFF
                </span>
              )}

              <span
                className={`px-4 py-2 rounded-full text-sm font-medium shadow ${product.stock > 20
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                  }`}
              >
                {product.stock > 20 ? 'In Stock' : `Only ${product.stock} left`}
              </span>
            </div>

            <button className="absolute bottom-4 right-4 z-20 h-12 w-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur flex items-center justify-center shadow-lg hover:scale-105 transition">
              <Heart className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>


          {/* Thumbnail Images */}
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                    ? 'border-blue-500 dark:border-blue-400'
                    : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
              >
                <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                  <Package className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between mb-4">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium capitalize">
              {product.category}
            </span>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                      }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Product Name */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {product.name}
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {product.longDescription}
          </p>

          {/* Price */}
          <div className="mb-8">
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-2xl text-gray-400 dark:text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full font-medium">
                    Save ₹{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Inclusive of all taxes
            </p>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Key Features
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity & Actions */}
          <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                  className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
              >
                {isInCart ? 'Update Cart' : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2 bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 text-white font-medium py-3 px-8 rounded-lg transition-colors"
              >
                Buy Now
              </button>
            </div>

            {isInCart && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-blue-800 dark:text-blue-300 text-sm text-center">
                  ✓ This item is already in your cart ({cartQuantity} {cartQuantity === 1 ? 'item' : 'items'})
                </p>
              </div>
            )}

            {/* Share Button */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 w-full text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Share2 className="h-5 w-5" />
                Share this product
              </button>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Free Shipping</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">On orders above ₹999</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Secure Payment</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Package className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Easy Returns</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Details */}
      <div className="mt-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Specifications */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Specifications
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center px-6 py-4">
                    <span className="text-gray-600 dark:text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Product Tags
            </h2>
            <div className="flex flex-wrap gap-3">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-default"
                >
                  {tag.split('-').join(' ')}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}