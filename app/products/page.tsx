import { Package, Star, Truck, Shield } from 'lucide-react'

const products = [
  {
    category: 'Facial Care',
    items: [
      { name: 'Face Tissues', description: 'Soft and gentle facial tissues', features: ['Soft', 'Hypoallergenic', 'Durable'] },
      { name: 'Pocket Handkerchief', description: 'Convenient pocket-sized tissues', features: ['Compact', 'Strong', 'Absorbent'] },
      { name: 'Bamboo Face Tissue', description: 'Eco-friendly bamboo tissues', features: ['Sustainable', 'Biodegradable', 'Soft'] }
    ]
  },
  {
    category: 'Home Essentials',
    items: [
      { name: 'Kitchen Towel', description: 'Highly absorbent kitchen towels', features: ['Absorbent', 'Strong', 'Multi-purpose'] },
      { name: 'Toilet Roll', description: 'Premium quality toilet rolls', features: ['Soft', 'Septic-safe', 'Long-lasting'] },
      { name: 'Kitchen Wipes', description: 'Disposable kitchen cleaning wipes', features: ['Cleaning', 'Disposable', 'Effective'] }
    ]
  },
  {
    category: 'Dining & Kitchen',
    items: [
      { name: 'Napkins', description: 'Quality paper napkins', features: ['Disposable', 'Soft', 'Various sizes'] },
      { name: 'Bamboo Napkins', description: 'Eco-friendly dining napkins', features: ['Sustainable', 'Biodegradable', 'Durable'] },
      { name: 'Aluminium Foil', description: 'Food grade aluminium foil', features: ['Heat resistant', 'Food safe', 'Versatile'] }
    ]
  },
  {
    category: 'Specialty Products',
    items: [
      { name: 'Jumbo Rolls', description: 'Industrial size tissue rolls', features: ['Bulk', 'Commercial use', 'Cost-effective'] },
      { name: 'Private Labelling', description: 'Custom branding available', features: ['Customizable', 'Branding', 'B2B'] },
      { name: 'Cling Film', description: 'Food preservation film', features: ['Transparent', 'Flexible', 'Preserves freshness'] }
    ]
  }
]

export default function ProductsPage() {
  return (
    <div className="pt-16 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover our premium range of hygiene and lifestyle products designed for quality and comfort.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: <Star className="h-6 w-6" />, text: 'Premium Quality' },
            { icon: <Truck className="h-6 w-6" />, text: 'Nationwide Delivery' },
            { icon: <Shield className="h-6 w-6" />, text: 'Safe & Hygienic' },
            { icon: <Package className="h-6 w-6" />, text: 'Eco-Friendly Options' }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-3 mx-auto">
                {feature.icon}
              </div>
              <p className="font-medium text-gray-900 dark:text-white">{feature.text}</p>
            </div>
          ))}
        </div>

        {/* Products Grid */}
        <div className="space-y-12">
          {products.map((category) => (
            <div key={category.category} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {category.category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((product) => (
                  <div key={product.name} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white mb-4">
                      <Package className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-3 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}