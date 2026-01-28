import productsData from '../data/products.json'

export interface ProductSpecifications {
  material: string
  ply?: string
  dimensions?: string
  sheetsPerPack?: number | string
  packsPerCarton?: number | string
  weight?: string
  sheetsPerRoll?: number | string
  rollsPerPack?: number | string
  absorbency?: string
  thickness?: string
  length?: string
  width?: string
  heatResistance?: string
  transparency?: string
  napkinsPerPack?: number | string
  diameter?: string
  minimumOrder?: string
  leadTime?: string
  designSupport?: string
  packagingOptions?: string
  samples?: string
  [key: string]: string | number | undefined
}

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  longDescription: string
  price: number
  originalPrice: number
  category: string
  features: string[]
  specifications: ProductSpecifications
  images: string[]
  stock: number
  rating: number
  reviews: number
  tags: string[]
  relatedProducts: string[]
}

export interface ProductCard {
  id: string
  slug: string
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: number
}

// Get all products
export function getAllProducts(): Product[] {
  return productsData.products as Product[]
}

// Get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return productsData.products.find(product => product.slug === slug) as Product | undefined
}

// Get product by ID
export function getProductById(id: string): Product | undefined {
  return productsData.products.find(product => product.id === id) as Product | undefined
}

// Get related products
export function getRelatedProducts(productId: string): Product[] {
  const product = getProductById(productId)
  if (!product) return []
  
  return product.relatedProducts
    .map(id => getProductById(id))
    .filter(Boolean) as Product[]
}

// Get products by category
export function getProductsByCategory(category: string): Product[] {
  return productsData.products.filter(product => product.category === category) as Product[]
}

// Get all product slugs for static generation
export function getAllProductSlugs(): string[] {
  return productsData.products.map(product => product.slug)
}

// Get products for cards (lightweight data)
export function getProductCards(): ProductCard[] {
  return productsData.products.map(product => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    image: product.images[0] || '/images/placeholder.jpg',
    stock: product.stock
  }))
}

// Convert specifications values to string for display
export function formatSpecificationValue(value: string | number | undefined): string {
  if (value === undefined) return 'N/A'
  if (typeof value === 'number') return value.toString()
  return value
}