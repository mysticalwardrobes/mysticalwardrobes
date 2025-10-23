"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/Mystical-Wardrobes-Logo-02.svg"


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFaqsDropdownOpen, setIsFaqsDropdownOpen] = useState(false);
  const [isGownsDropdownOpen, setIsGownsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleFaqsDropdown = () => {
    setIsFaqsDropdownOpen(!isFaqsDropdownOpen);
  };

  const toggleGownsDropdown = () => {
    setIsGownsDropdownOpen(!isGownsDropdownOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-background shadow-md py-4">
      <nav className="container mx-auto px-6 py-2 md:px-16 md:py-4 flex justify-between items-center ">
        {/* Company Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="font-bold text-gray-800 flex items-center space-x-2 justify-center group transition-all duration-300 hover:scale-105">
            <Image className="w-6 h-6 md:w-10 md:h-10 transition-transform duration-300 group-hover:rotate-12" src={Logo} alt="Mystical Logo"/>
            <h1 className="font-vegawanty text-xl md:text-4xl text-foreground transition-colors duration-300 group-hover:text-foreground-darker">Mystical Wardrobes</h1>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="hover:text-foreground-darker focus:outline-none focus:text-foreground-darker transition-colors duration-300 p-2 rounded-lg hover:bg-gray-100"
          >
            <svg
              className={`h-6 w-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-foreground font-manrope">
          <Link href="/" className="relative group transition-colors duration-300 hover:text-foreground-darker">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground-darker transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Gowns Dropdown */}
          <div className="relative group">
            <button
              onClick={toggleGownsDropdown}
              className="relative transition-colors duration-300 hover:text-foreground-darker flex items-center gap-1"
            >
              Gowns
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isGownsDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7"></path>
              </svg>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground-darker transition-all duration-300 group-hover:w-full"></span>
            </button>
            
            {/* Dropdown Menu */}
            <div className={`absolute top-full left-0 mt-2 w-48 bg-white rounded shadow-lg overflow-hidden transition-all duration-300 ${isGownsDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <Link 
                href="/collections" 
                className="block px-4 py-3 text-foreground hover:bg-gray-100 hover:text-foreground-darker transition-colors duration-200"
                onClick={() => setIsGownsDropdownOpen(false)}
              >
                Collections
              </Link>
              <Link 
                href="/addons" 
                className="block px-4 py-3 text-foreground hover:bg-gray-100 hover:text-foreground-darker transition-colors duration-200"
                onClick={() => setIsGownsDropdownOpen(false)}
              >
                Add Ons
              </Link>
            </div>
          </div>

          <Link href="/promqueens" className="relative group transition-colors duration-300 hover:text-foreground-darker">
            Prom Queens
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground-darker transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/about" className="relative group transition-colors duration-300 hover:text-foreground-darker">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground-darker transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/contact" className="relative group transition-colors duration-300 hover:text-foreground-darker">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground-darker transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          {/* FAQs & Guides Dropdown */}
          <div className="relative group">
            <button
              onClick={toggleFaqsDropdown}
              className="relative transition-colors duration-300 hover:text-foreground-darker flex items-center gap-1"
            >
              FAQs & Guides
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isFaqsDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7"></path>
              </svg>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground-darker transition-all duration-300 group-hover:w-full"></span>
            </button>
            
            {/* Dropdown Menu */}
            <div className={`absolute top-full left-0 mt-2 w-48 bg-white rounded shadow-lg overflow-hidden transition-all duration-300 ${isFaqsDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <Link 
                href="/faqs" 
                className="block px-4 py-3 text-foreground hover:bg-gray-100 hover:text-foreground-darker transition-colors duration-200"
                onClick={() => setIsFaqsDropdownOpen(false)}
              >
                FAQs
              </Link>
              <Link 
                href="/rental-terms" 
                className="block px-4 py-3 text-foreground hover:bg-gray-100 hover:text-foreground-darker transition-colors duration-200"
                onClick={() => setIsFaqsDropdownOpen(false)}
              >
                Rental Terms
              </Link>
              <Link 
                href="/custom-made-terms" 
                className="block px-4 py-3 text-foreground hover:bg-gray-100 hover:text-foreground-darker transition-colors duration-200"
                onClick={() => setIsFaqsDropdownOpen(false)}
              >
                Custom Made Terms
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 pb-4 space-y-2 font-manrope">
          <Link 
            href="/" 
            className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 transform hover:translate-x-2"
            style={{ animationDelay: isMobileMenuOpen ? '0.1s' : '0s' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>

          {/* Gowns Mobile Dropdown */}
          <div style={{ animationDelay: isMobileMenuOpen ? '0.2s' : '0s' }}>
            <button
              onClick={toggleGownsDropdown}
              className="w-full text-left py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 transform hover:translate-x-2 flex items-center justify-between text-foreground"
            >
              Gowns
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isGownsDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {/* Mobile Dropdown Items */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isGownsDropdownOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="mt-1 ml-3 pl-3 border-l-2 border-foreground/20 space-y-1">
                <Link 
                  href="/collections" 
                  className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 text-secondary text-sm"
                  onClick={() => {
                    setIsGownsDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Collections
                </Link>
                <Link 
                  href="/addons" 
                  className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 text-secondary text-sm"
                  onClick={() => {
                    setIsGownsDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Add Ons
                </Link>
              </div>
            </div>
          </div>

          <Link 
            href="/promqueens" 
            className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 transform hover:translate-x-2"
            style={{ animationDelay: isMobileMenuOpen ? '0.3s' : '0s' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Prom Queens
          </Link>
          <Link 
            href="/about" 
            className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 transform hover:translate-x-2"
            style={{ animationDelay: isMobileMenuOpen ? '0.4s' : '0s' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 transform hover:translate-x-2"
            style={{ animationDelay: isMobileMenuOpen ? '0.5s' : '0s' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          
          {/* FAQs & Guides Mobile Dropdown */}
          <div style={{ animationDelay: isMobileMenuOpen ? '0.6s' : '0s' }}>
            <button
              onClick={toggleFaqsDropdown}
              className="w-full text-left py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 transform hover:translate-x-2 flex items-center justify-between text-foreground"
            >
              FAQs & Guides
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isFaqsDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {/* Mobile Dropdown Items */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFaqsDropdownOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="mt-1 ml-3 pl-3 border-l-2 border-foreground/20 space-y-1">
                <Link 
                  href="/faqs" 
                  className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 text-secondary text-sm"
                  onClick={() => {
                    setIsFaqsDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  FAQs
                </Link>
                <Link 
                  href="/rental-terms" 
                  className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 text-secondary text-sm"
                  onClick={() => {
                    setIsFaqsDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Rental Terms
                </Link>
                <Link 
                  href="/custom-made-terms" 
                  className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 text-secondary text-sm"
                  onClick={() => {
                    setIsFaqsDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Custom Made Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
