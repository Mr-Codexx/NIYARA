import { notFound } from 'next/navigation'
import { getProductsByCategory, getAllProductSlugs } from '../../../lib/products'
import ProductsGrid from '../../../components/ProductsGrid'

export async function generateStaticParams() {
  const categories = ['facial', 'home', 'dining', 'kitchen', 'commercial']
  return categories.map((category) => ({
    category,
  }))
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const products = getProductsByCategory(category)
  
  if (products.length === 0) {
    notFound()
  }

  const categoryNames: Record<string, string> = {
    facial: 'Facial Care',
    home: 'Home Essentials',
    dining: 'Dining',
    kitchen: 'Kitchen',
    commercial: 'Commercial'
  }

  return (
    <div className="pt-16 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <div className="mb-12">
          <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-sm font-medium text-blue-800 dark:text-blue-300 mb-4">
            Category
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {categoryNames[category] || category}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {products.length} {products.length === 1 ? 'product' : 'products'} found in this category
          </p>
        </div>

        {/* Products Grid */}
        <ProductsGrid 
          products={products.map(p => ({
            id: p.id,
            slug: p.slug,
            name: p.name,
            description: p.description,
            price: p.price,
            category: p.category,
            image: p.images[0],
            stock: p.stock
          }))} 
        />

        {/* Category Description */}
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            About {categoryNames[category] || category}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {category === 'facial' && 'Our facial care products are designed with your skin in mind. Made from premium materials, they offer superior softness and absorption while being gentle on sensitive skin.'}
            {category === 'home' && 'Essential products for every home, designed to provide convenience, hygiene, and comfort. From bathroom essentials to household cleaning, we have you covered.'}
            {category === 'dining' && 'Elevate your dining experience with our premium napkins and tableware. Perfect for everyday meals, special occasions, and entertaining guests.'}
            {category === 'kitchen' && 'Practical and efficient solutions for your kitchen needs. Our products help with food preparation, storage, and cleanup, making kitchen tasks easier.'}
            {category === 'commercial' && 'Professional-grade products designed for businesses, institutions, and commercial establishments. Bulk quantities and custom branding available.'}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            All products in this category are made with quality materials and sustainable practices.
          </p>
        </div>
      </div>
    </div>
  )
}