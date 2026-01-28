import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      
      {/* Background Image */}
      <Image
        src="https://www.premiertissues.com/images/homepage/banner_1.png"
        alt="Premier Tissue Banner"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay (optional, like original site text layer) */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div className="relative z-10 container mx-auto h-full flex items-center px-6">
        <h1 className="text-white text-4xl md:text-6xl font-semibold">
          Pioneers of Hygiene <br />
          <span className="text-blue-200">& Lifestyle Products</span>
        </h1>
      </div>
    </section>
  )
}
