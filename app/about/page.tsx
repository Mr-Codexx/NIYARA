import { History, Target, Users, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="pt-16 pb-24"> 
    
    <img src="https://www.premiertissues.com/images/about/banner.png" alt="About Niyara Tissues" className="w-full h-full object-cover rounded-2xl mb-12" />
       
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Niyara Tissues
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Pioneers in hygiene and lifestyle products since 1998, 
            we are committed to delivering premium quality with sustainable practices.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-sm font-medium text-blue-800 dark:text-blue-300 mb-6">
              <History className="h-4 w-4 mr-2" />
              Our Journey
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              25+ Years of Excellence
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Founded in 1998, Niyara Tissues has grown from a small manufacturing unit 
              to one of India's leading hygiene product companies. Our journey is 
              marked by innovation, quality, and a commitment to customer satisfaction.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Through the years, we've expanded our product range while maintaining 
              our core values of sustainability and excellence in manufacturing.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8">
            <div className="aspect-video rounded-xl bg-gradient-to-r from-blue-200 to-cyan-200 dark:from-blue-800/30 dark:to-cyan-800/30 flex items-center justify-center">
              <div className="text-center">
                <History className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Since 1998
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Target className="h-8 w-8" />,
                title: 'Quality First',
                description: 'Uncompromising quality in every product we manufacture'
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: 'Customer Focus',
                description: 'Understanding and meeting customer needs effectively'
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: 'Innovation',
                description: 'Continuous improvement and product innovation'
              },
              {
                icon: <History className="h-8 w-8" />,
                title: 'Sustainability',
                description: 'Responsible manufacturing and environmental care'
              }
            ].map((value, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="h-16 w-16 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}