'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Menu, X, Search, User, ChevronDown, ShoppingBag, Sun, Moon, Phone, MapPin } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import CartIcon from './CartIcon'

const navItems = [
  { name: 'Products', href: '/products', hasDropdown: true },
  { name: 'Shop Now', href: '/shop-now', highlight: false },
  { name: 'About', href: '/about' },
  { name: 'Sustainability', href: '/sustainability' },
  { name: 'Contact', href: '/contact' },
]

const productCategories = [
  {
    title: 'Life',
    icon: '💫',
    items: ['Face Tissues', 'Pocket Handkerchief', 'Bamboo Face Tissue'],
    description: 'Daily hygiene essentials'
  },
  {
    title: 'Home',
    icon: '🏠',
    items: [
      'Kitchen Towel',
      'Toilet Roll',
      'Kitchen Wipes',
      'Napkins',
      'Bamboo Napkins',
      'Aluminium Foil',
      'Cling Film',
      'Food Wrapper'
    ],
    description: 'Home care solutions'
  },
  {
    title: 'Special Services',
    icon: '⚡',
    items: ['Jumbo Rolls', 'Private Labelling'],
    description: 'Custom business solutions'
  },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProductsHovered, setIsProductsHovered] = useState(false)
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>(null)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  // Initialize theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsHovered(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsProductsHovered(false)
        setIsMenuOpen(false)
        setIsSearchOpen(false)
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsProductsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsProductsHovered(false)
    }, 150)
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-xl' 
            : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md'
        }`}
      >
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between">
            
            {/* Logo with animation */}
            <div className="flex items-center group">
              <Link 
                href="/" 
                className="flex items-center space-x-2 transform transition-transform hover:scale-105 active:scale-95"
              >
                <div className="relative h-10 w-10 md:h-12 md:w-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                  <span className="text-white font-bold text-xl md:text-2xl relative z-10">N</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                    NIYARA
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Hygiene Solutions
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={item.hasDropdown ? handleMouseEnter : undefined}
                  onMouseLeave={item.hasDropdown ? handleMouseLeave : undefined}
                  ref={item.hasDropdown ? dropdownRef : undefined}
                >
                  {item.hasDropdown ? (
                    <button
                      className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        pathname.startsWith(item.href)
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        isProductsHovered ? 'rotate-180' : ''
                      }`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        item.highlight 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 hover:shadow-lg' 
                          : pathname === item.href
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Products Mega Menu Dropdown */}
                  {item.hasDropdown && isProductsHovered && (
                    <div className="absolute left-0 top-full mt-2 w-[600px] rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-in slide-in-from-top-5 duration-200">
                      <div className="p-6">
                        <div className="grid grid-cols-3 gap-6">
                          {productCategories.map((category, idx) => (
                            <div key={idx} className="space-y-3 group/category">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{category.icon}</span>
                                <div>
                                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                    {category.title}
                                  </h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {category.description}
                                  </p>
                                </div>
                              </div>
                              <ul className="space-y-2">
                                {category.items.map((product, productIdx) => (
                                  <li key={productIdx}>
                                    <Link
                                      href={`/products/${product.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all group-hover/category:translate-x-1 duration-200 py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                                      onClick={() => setIsProductsHovered(false)}
                                    >
                                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500 opacity-0 group-hover/category:opacity-100 transition-opacity"></div>
                                      {product}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                                Bulk Orders & Custom Solutions
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Contact us for wholesale pricing and private labeling
                              </p>
                            </div>
                            <Link
                              href="/contact"
                              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                              onClick={() => setIsProductsHovered(false)}
                            >
                              Get Quote
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
            

              {/* Cart */}
              <CartIcon />

              {/* Shop Now Button (Mobile) */}
              <Link
                href="/shop-now"
                className="lg:hidden flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white hover:shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Shop</span>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden animate-in slide-in-from-top duration-200">
              <div className="border-t mt-2 pt-4 pb-6 space-y-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                            pathname.startsWith(item.href)
                              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            {item.name}
                          </div>
                          <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${
                            isMobileProductsOpen ? 'rotate-180' : ''
                          }`} />
                        </button>

                        {/* Mobile Products Submenu */}
                        {isMobileProductsOpen && (
                          <div className="ml-6 mt-2 space-y-4 border-l border-gray-200 dark:border-gray-700 pl-4 animate-in slide-in-from-left-4 duration-200">
                            {productCategories.map((category, idx) => (
                              <div key={idx} className="space-y-2">
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">{category.icon}</span>
                                  <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">
                                      {category.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {category.description}
                                    </p>
                                  </div>
                                </div>
                                <ul className="space-y-1">
                                  {category.items.map((product, productIdx) => (
                                    <li key={productIdx}>
                                      <Link
                                        href={`/products/${product.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                                        onClick={() => {
                                          setIsMenuOpen(false)
                                          setIsMobileProductsOpen(false)
                                        }}
                                      >
                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                        {product}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}

                            {/* View All Mobile */}
                            <div className="pt-4">
                              <Link
                                href="/products"
                                className="block text-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-3 text-sm transition-all active:scale-95"
                                onClick={() => {
                                  setIsMenuOpen(false)
                                  setIsMobileProductsOpen(false)
                                }}
                              >
                                Browse All Products
                              </Link>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                          item.highlight 
                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600' 
                            : pathname === item.href
                              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.highlight && <ShoppingBag className="h-4 w-4" />}
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Account Mobile */}
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">My Account</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}