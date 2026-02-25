import Image from 'next/image'
import { Recycle } from 'lucide-react'

export default function SustainabilitySection() {
  return (
    <section className="relative bg-[#eff7ff] overflow-hidden">
      
      {/* Content wrapper */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="max-w-xl space-y-6">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
            <Recycle className="h-4 w-4" />
            Our Commitment
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-semibold text-emerald-600 leading-snug">
            Sustainability is not a choice;<br />
            <span className="text-emerald-500">
              it is the only way forward.
            </span>
          </h2>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-md">
            Premier ensures that it procures pulp and other related raw materials
            from certified timberlands that are consciously harvested. These
            timberlands are forests that can be managed for the sustainable
            production of wood products.
          </p>

          {/* Read more */}
          <a
            href="#"
            className="inline-block text-sm font-medium underline underline-offset-4 text-gray-800 hover:text-emerald-600"
          >
            Read More
          </a>

        </div>
      </div>

      {/* Leaf Image – attached to bottom */}
      <div className="absolute bottom-0 right-0 w-[55%] max-w-3xl pointer-events-none">
        <Image
          src="/leaf.svg"
          alt="Sustainability Leaf"
          width={900}
          height={900}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

    </section>
  )
}
