import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative mx-auto px-8 overflow-hidden">
      
      {/* Responsive container with aspect ratio */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] xl:h-[80vh]">
        
        {/* Background Image - Using Next.js Image with proper responsive sizes */}
        <Image
          src="https://www.premiertissues.com/images/homepage/banner_1.png"
          alt="Premier Tissue Banner"
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
          className="object-cover"
          quality={85}
        />

        {/* Overlay with gradient for better text readability */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10" /> */}

        {/* Content - Responsive positioning and typography */}
        <div className="relative z-10 h-full flex items-center">
          
        </div>
      </div>
    </section>
  )
}