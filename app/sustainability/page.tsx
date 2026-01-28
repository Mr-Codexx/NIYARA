import { TreePine, Recycle, Leaf, Sprout, Target, Globe } from 'lucide-react'

export default function SustainabilityPage() {
  return (
    <div className="pt-16 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Sustainability Commitment
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Sustainability is not just a practice, it's our promise for a better tomorrow.
          </p>
        </div>

        {/* Main Statement */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <Leaf className="h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-6">
              "Sustainability is the only way forward."
            </blockquote>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Niyara ensures that we procure pulp and other related raw materials from 
              certified timberlands that are consciously harvested. These timberlands 
              are forests that can be managed for the sustainable production of wood products.
            </p>
          </div>
        </div>

        {/* Practices */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <TreePine className="h-8 w-8" />,
              title: 'Certified Timberlands',
              description: 'Responsibly sourced materials from sustainably managed forests'
            },
            {
              icon: <Recycle className="h-8 w-8" />,
              title: 'Waste Management',
              description: 'Efficient recycling and waste reduction systems'
            },
            {
              icon: <Sprout className="h-8 w-8" />,
              title: 'Renewable Resources',
              description: 'Focus on renewable and biodegradable materials'
            },
            {
              icon: <Target className="h-8 w-8" />,
              title: 'Sustainable Goals',
              description: 'Clear targets for reducing environmental impact'
            },
            {
              icon: <Globe className="h-8 w-8" />,
              title: 'Carbon Footprint',
              description: 'Continuous efforts to minimize carbon emissions'
            },
            {
              icon: <Leaf className="h-8 w-8" />,
              title: 'Green Packaging',
              description: 'Eco-friendly and minimal packaging solutions'
            }
          ].map((practice, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="h-14 w-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                {practice.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {practice.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {practice.description}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Our Sustainability Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-green-200 dark:bg-green-800/50"></div>
            {[
              { year: '1998', title: 'Foundation', description: 'Started with eco-conscious manufacturing principles' },
              { year: '2005', title: 'Certification', description: 'Achieved first sustainability certification' },
              { year: '2010', title: 'Green Initiative', description: 'Launched first bamboo-based product line' },
              { year: '2015', title: 'Zero Waste Goal', description: 'Set target for zero manufacturing waste' },
              { year: '2020', title: 'Carbon Neutral', description: 'Achieved carbon neutral manufacturing' },
              { year: '2023', title: 'Future Ready', description: 'Invested in advanced sustainable technologies' }
            ].map((milestone, idx) => (
              <div key={idx} className={`relative mb-8 ${idx % 2 === 0 ? 'ml-0 lg:ml-0 lg:mr-1/2 lg:pr-12 text-left' : 'ml-1/2 lg:ml-1/2 lg:pl-12 text-left lg:text-right'}`}>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 lg:left-0 lg:transform-none lg:right-[-8px]">
                  <div className="h-4 w-4 rounded-full bg-green-600 dark:bg-green-500 border-4 border-white dark:border-gray-800"></div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                  <div className="text-green-600 dark:text-green-400 font-bold text-lg mb-2">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}