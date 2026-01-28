'use client'

import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '../contexts/CartContext'
import toast from 'react-hot-toast'

interface ProductCard {
  id: string
  slug: string
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: number
}

interface ProductsGridProps {
  products: ProductCard[]
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (product: ProductCard) => {
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock
    })
    toast.success(`${product.name} added to cart!`)
  }

  return (
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
              
              {/* Stock Badge */}
              <div className="absolute top-3 right-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  product.stock > 20 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                }`}>
                  {product.stock > 20 ? 'In Stock' : 'Low Stock'}
                </span>
              </div>
            </div>
          </Link>

          {/* Product Info */}
          <div className="p-5">
            <Link href={`/products/${product.slug}`}>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1">
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
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 capitalize">
                {product.category}
              </span>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/products/${product.slug}`}
                className="flex-1 text-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                View Details
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors text-sm"
              >
                <ShoppingBag className="h-4 w-4" />
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}