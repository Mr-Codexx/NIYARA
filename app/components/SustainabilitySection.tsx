import Link from 'next/link'
import { TreePine, Leaf, Recycle, Target } from 'lucide-react'

export default function SustainabilitySection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-4 py-2 text-sm font-medium text-green-800 dark:text-green-300 mb-6">
              <Leaf className="h-4 w-4 mr-2" />
              Sustainable Practices
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Sustainability is the only way forward
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Niyara ensures that we procure pulp and other related raw materials 
              from certified timberlands that are consciously harvested. These 
              timberlands are forests that can be managed for the sustainable 
              production of wood products.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { icon: TreePine, title: 'Certified Timberlands', desc: 'Responsibly sourced materials' },
                { icon: Recycle, title: 'Eco-Friendly', desc: 'Minimal environmental impact' },
                { icon: Target, title: 'Sustainable Goals', desc: 'Long-term environmental planning' },
                { icon: Leaf, title: 'Green Production', desc: 'Efficient manufacturing processes' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/sustainability"
              className="inline-flex items-center rounded-lg bg-green-600 px-6 py-3 text-base font-medium text-white hover:bg-green-700 transition-colors"
            >
              Read More About Our Commitment
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 p-8">
              <div className="h-full w-full rounded-xl bg-gradient-to-br from-green-200 to-blue-200 dark:from-green-800/30 dark:to-blue-800/30 flex items-center justify-center">
                <div className="text-center">
                  <TreePine className="h-24 w-24 text-green-600 dark:text-green-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Green Initiative
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Committed to sustainable forestry
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}