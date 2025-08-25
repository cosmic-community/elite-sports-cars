'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-background border-b border-border fixed top-0 left-0 right-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-foreground">Elite Sports Cars</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                href="/" 
                className="text-foreground hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/vehicles" 
                className="text-foreground hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Vehicles
              </Link>
              <Link 
                href="/team" 
                className="text-foreground hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sales Team
              </Link>
              <Link 
                href="/locations" 
                className="text-foreground hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Locations
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-foreground hover:text-accent focus:outline-none focus:text-accent"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
            <Link 
              href="/" 
              className="text-card-foreground hover:text-accent block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/vehicles" 
              className="text-card-foreground hover:text-accent block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Vehicles
            </Link>
            <Link 
              href="/team" 
              className="text-card-foreground hover:text-accent block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sales Team
            </Link>
            <Link 
              href="/locations" 
              className="text-card-foreground hover:text-accent block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Locations
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}