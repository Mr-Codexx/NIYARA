import { notFound } from 'next/navigation'
import { getProductBySlug, getRelatedProducts, getAllProductSlugs } from '../../lib/products'
import ProductDetails from '../../components/ProductDetails'
import RelatedProducts from '../../components/RelatedProducts'
import { Metadata } from 'next'

// Generate static params for all products
export async function generateStaticParams() {
  const slugs = getAllProductSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

// Generate metadata for each product
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.'
    }
  }
  
  return {
    title: `${product.name} - Niyara Tissues`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  
  if (!product) {
    notFound()
  }
  
  const relatedProducts = getRelatedProducts(product.id)

  return (
    <div className="pt-16 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ProductDetails product={product} />
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  )
}