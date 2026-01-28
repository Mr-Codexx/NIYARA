'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '../contexts/CartContext'
import toast from 'react-hot-toast'
import type { Product } from '../lib/products'

interface RelatedProductsProps {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const { addToCart } = useCart()

  if (products.length === 0) return null

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.images[0],
      stock: product.stock
    })
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Related Products
        </h2>
        <Link
          href="/products"
          className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          View all products
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
          >
            {/* Product Image */}
            <Link href={`/products/${product.slug}`}>
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center relative overflow-hidden">
                <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                
                {/* Discount Badge */}
                {product.originalPrice > product.price && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                )}
              </div>
            </Link>

            {/* Product Info */}
            <div className="p-5">
              <Link href={`/products/${product.slug}`}>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
              </Link>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-400 dark:text-gray-500 line-through ml-2">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 capitalize">
                  {product.category}
                </span>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors text-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}