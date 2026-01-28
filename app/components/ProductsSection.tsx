'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function ProductsSection() {
  // Array of products
  const products = [
    {
      name: 'Face Tissues',
      image: 'https://www.premiertissues.com/images/product/product2.png',
      bg: 'from-blue-700 to-blue-500',
      height: 'h-[520px]',
    },
    {
      name: 'Kitchen Towel',
      image: 'https://www.premiertissues.com/images/homepage/kitchen_towel.png',
      bg: 'bg-green-500',
      height: 'h-[540px]',
    },
    {
      name: 'Napkins',
      image: 'https://www.premiertissues.com/images/homepage/napkins.png',
      bg: 'bg-green-500',
      height: 'h-[540px]',
    },
    {
      name: 'Toilet Roll',
      image: 'https://www.premiertissues.com/images/homepage/toilet_roll1.png',
      bg: 'bg-red-500',
      height: 'h-[540px]',
    },
  ]

  // Function to convert name to URL-friendly slug
  const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-')

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-full mx-auto px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Our product range
          </h2>
          <Link
            href="https://www.premiertissues.com/images/products"
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            See all <span>›</span>
          </Link>
        </div>

        {/* Top Banner */}
        <Link href={`/products/${toSlug(products[0].name)}`}>
          <div className={`relative rounded-xl bg-gradient-to-b ${products[0].bg} mb-6 overflow-hidden cursor-pointer`}>
            <p className="absolute bottom-4 left-4 text-white font-medium z-10">
              {products[0].name}
            </p>
            <div className="relative w-screen h-[520px]">
              <Image
                src={products[0].image}
                alt={products[0].name}
                fill
                priority
                className="object-cover drop-shadow-xl"
              />
            </div>
          </div>
        </Link>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.slice(1).map((prod) => (
            <Link key={prod.name} href={`/products/${toSlug(prod.name)}`}>
              <div className={`relative rounded-xl ${prod.bg} ${prod.height} overflow-hidden cursor-pointer`}>
                <p className="absolute bottom-4 left-4 text-white font-medium z-10">
                  {prod.name}
                </p>
                <Image
                  src={prod.image}
                  alt={prod.name}
                  fill
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
