'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag, ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'
import CartIcon from './CartIcon'

const navItems = [
    { name: 'Products', href: '/products', hasDropdown: true },
    { name: 'Shop Now', href: '/shop-now' },
    { name: 'About', href: '/about' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'Contact', href: '/contact' },
]

// Product categories for the mega menu
const productCategories = [
    {
        title: 'Life',
        items: ['Face Tissues', 'Pocket Handkerchief', 'Bamboo Face Tissue'],
    },
    {
        title: 'Home',
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
    },
    {
        title: 'Special Services',
        items: ['Jumbo Rolls', 'Private Labelling'],
    },
]

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isProductsHovered, setIsProductsHovered] = useState(false)
    const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<NodeJS.Timeout>(null)
    const pathname = usePathname()

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
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        setIsProductsHovered(true)
    }

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsProductsHovered(false)
        }, 300) // 300ms delay before closing
    }

    return (
        <header className="sticky top-0 z-50 w-full  bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">N</span>
                            </div>
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                NIYARA
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
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
                                        className={`flex items-center text-sm font-medium transition-colors hover:text-blue-600 ${pathname.startsWith(item.href)
                                                ? 'text-blue-600 dark:text-blue-400'
                                                : 'text-gray-700 dark:text-gray-300'
                                            }`}
                                    >
                                        {item.name}
                                        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isProductsHovered ? 'rotate-180' : ''}`} />
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={`text-sm font-medium transition-colors hover:text-blue-600 ${pathname === item.href
                                                ? 'text-blue-600 dark:text-blue-400'
                                                : 'text-gray-700 dark:text-gray-300'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                )}

                                {/* Products Mega Menu Dropdown */}
                                {item.hasDropdown && isProductsHovered && (
                                    <div className="absolute right-0 top-full mt-2 w-290 rounded-lg bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                                        <div className="p-6">
                                            <div className="grid grid-cols-2 gap-8">
                                                {productCategories.map((category, idx) => (
                                                    <div key={idx} className="space-y-3">
                                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                                            {category.title}
                                                        </h3>
                                                        <ul className="space-y-2">
                                                            {category.items.map((product, productIdx) => (
                                                                <li key={productIdx}>
                                                                    <Link
                                                                        href={`/products/${product.toLowerCase().replace(/\s+/g, '-')}`}
                                                                        className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-1"
                                                                        onClick={() => setIsProductsHovered(false)}
                                                                    >
                                                                        {product}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Additional Services */}
                                            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                                                <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                                                    We also offer:
                                                </h3>
                                                <div className="flex gap-4">
                                                    {['Jumbo Rolls', 'Private Labelling'].map((service, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-sm font-medium text-blue-800 dark:text-blue-300"
                                                        >
                                                            {service}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* View All Button */}
                                            <div className="mt-6">
                                                <Link
                                                    href="/products"
                                                    className="block w-full text-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 transition-colors"
                                                    onClick={() => setIsProductsHovered(false)}
                                                >
                                                    View All Products
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="flex items-center space-x-6">
                            <CartIcon />
                            {/* <button className="flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                                <ShoppingBag className="h-4 w-4 mr-2" />
                                Shop Now
                            </button> */}
                        </div>
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                        ) : (
                            <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden border-t mt-2 pt-4 pb-6">
                        <div className="space-y-1">
                            {navItems.map((item) => (
                                <div key={item.name}>
                                    {item.hasDropdown ? (
                                        <>
                                            <button
                                                onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                                                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium ${pathname.startsWith(item.href)
                                                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                    }`}
                                            >
                                                {item.name}
                                                <ChevronDown className={`h-4 w-4 transition-transform ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
                                            </button>

                                            {/* Mobile Products Submenu */}
                                            {isMobileProductsOpen && (
                                                <div className="ml-6 mt-2 space-y-3 border-l border-gray-200 dark:border-gray-700 pl-4">
                                                    {productCategories.map((category, idx) => (
                                                        <div key={idx} className="space-y-2">
                                                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                                                                {category.title}
                                                            </h4>
                                                            <ul className="space-y-1">
                                                                {category.items.map((product, productIdx) => (
                                                                    <li key={productIdx}>
                                                                        <Link
                                                                            href={`/products/${product.toLowerCase().replace(/\s+/g, '-')}`}
                                                                            className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-1 px-2"
                                                                            onClick={() => {
                                                                                setIsMenuOpen(false)
                                                                                setIsMobileProductsOpen(false)
                                                                            }}
                                                                        >
                                                                            {product}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}

                                                    {/* Additional Services Mobile */}
                                                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                                                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                                                            We also offer:
                                                        </h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {['Jumbo Rolls', 'Private Labelling'].map((service, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-800 dark:text-blue-300"
                                                                >
                                                                    {service}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* View All Mobile */}
                                                    <div className="pt-4">
                                                        <Link
                                                            href="/products"
                                                            className="block text-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 text-sm transition-colors"
                                                            onClick={() => {
                                                                setIsMenuOpen(false)
                                                                setIsMobileProductsOpen(false)
                                                            }}
                                                        >
                                                            View All Products
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === item.href
                                                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                }`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                            ))}

                            <div className="flex items-center justify-between px-3 py-2">
                                <CartIcon />
                                {/* <button className="flex-1 ml-4 flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                                    <ShoppingBag className="h-4 w-4 mr-2" />
                                    Shop Now
                                </button> */}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}