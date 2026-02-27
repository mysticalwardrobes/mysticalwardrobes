"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/Mystical-Wardrobes-Logo-02.svg"


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFaqsDropdownOpen, setIsFaqsDropdownOpen] = useState(false);
  const [isStyleExtensionDropdownOpen, setIsStyleExtensionDropdownOpen] = useState(false);
  const [isAddOnsDropdownOpen, setIsAddOnsDropdownOpen] = useState(false);
  const [isMadeToOwnDropdownOpen, setIsMadeToOwnDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleFaqsDropdown = () => {
    setIsStyleExtensionDropdownOpen(false);
    setIsAddOnsDropdownOpen(false);
    setIsMadeToOwnDropdownOpen(false);
    setIsFaqsDropdownOpen(!isFaqsDropdownOpen);
  };

  const toggleStyleExtensionDropdown = () => {
    setIsFaqsDropdownOpen(false);
    setIsAddOnsDropdownOpen(false);
    setIsMadeToOwnDropdownOpen(false);
    setIsStyleExtensionDropdownOpen(!isStyleExtensionDropdownOpen);
  };

  const toggleAddOnsDropdown = () => {
    setIsFaqsDropdownOpen(false);
    setIsStyleExtensionDropdownOpen(false);
    setIsMadeToOwnDropdownOpen(false);
    setIsAddOnsDropdownOpen(!isAddOnsDropdownOpen);
  };

  const toggleMadeToOwnDropdown = () => {
    setIsFaqsDropdownOpen(false);
    setIsStyleExtensionDropdownOpen(false);
    setIsAddOnsDropdownOpen(false);
    setIsMadeToOwnDropdownOpen(!isMadeToOwnDropdownOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-background shadow-md py-4">
      <nav className="container mx-auto px-6 py-2 md:px-8 md:py-4 flex justify-between items-center ">
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
        <div className="hidden md:flex items-center space-x-4 text-foreground font-manrope text-sm">
          <Link href="/" className="relative group transition-colors duration-300 hover:text-foreground-darker">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground-darker transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link href="/collections" className="relative group transition-colors duration-300 hover:text-foreground-darker">
            Gowns
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground-darker transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Style Extension Dropdown */}
          <div className="relative group">
            <button
              onClick={toggleStyleExtensionDropdown}
              className="relative transition-colors duration-300 hover:text-foreground-darker flex items-center gap-1"
            >
              Style Extension
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isStyleExtensionDropdownOpen ? 'rotate-180' : ''}`}
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
            
            <div className={`absolute top-full left-0 mt-2 w-56 bg-white rounded shadow-lg overflow-hidden transition-all duration-300 ${isStyleExtensionDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <Link 
                href="/addons/hood" 
                className="block px-4 py-3 text-foreground hover:bg-gray-100 hover:text-foreground-darker transition-colors duration-200"
                onClick={() => setIsStyleExtensionDropdownOpen(false)}
              >
                Hood
              </Link>
              <Link 
                href="/addons-style-extensions/train" 
                className="block px-4 py-3 text-foreground hover:bg-gray-100 hover:text-foreground-darker transition-colors duration-200"
                onClick={() => setIsStyleExtensionDropdownOpen(false)}
              >
                Train
              </Link>
              <Link
                href="/addons-style-extensions/wings"
                className="block px-4 py-3 text-foreground hover:bg-gray-100 hover:text-foreground-darker transition-colors duration-200"
                onClick={() => setIsStyleExtensionDropdownOpen(false)}
              >
                Wings
              </Link>
              <Link 
                href="/request-style-extension" 
                className="block px-4 py-3 text-foreground hover:bg-gray-100 hover:text-foreground-darker transition-colors duration-200"
                onClick={() => setIsStyleExtensionDropdownOpen(false)}
              >
                Request Style Extension
              </Link>
            </div>
          </div>

          {/* Add Ons Dropdown */}
          <div className="relative group">
            <button
              onClick={toggleAddOnsDropdown}
              className="relative transition-colors duration-300 hover:text-foreground-darker flex items-center gap-1"
            >
              Add Ons
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isAddOnsDropdownOpen ? 'rotate-180' : ''}`}
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
            
            <div className={`absolute top-full left-0 mt-2 w-48 bg-white rounded shadow-lg overflow-hidden transition-all duration-300 ${isAddOnsDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <Link 
                href="/addons/petticoat" 
                className="block px-4 py-3 text-foreground hover:bg-gray-100 hover:text-foreground-darker transition-colors duration-200"
                onClick={() => setIsAddOnsDropdownOpen(false)}
              >
                Petticoats
              </Link>
              <Link 
                href="/addons-style-extensions" 
                className="block px-4 py-3 text-foreground hover:bg-gray-100 hover:text-foreground-darker transition-colors duration-200"
                onClick={() => setIsAddOnsDropdownOpen(false)}
              >
                Accessories
              </Link>
            </div>
          </div>

          {/* Made To Own Dropdown */}
          <div className="relative group">
            <button
              onClick={toggleMadeToOwnDropdown}
              className="relative transition-colors duration-300 hover:text-foreground-darker flex items-center gap-1"
            >
              Made To Own
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isMadeToOwnDropdownOpen ? 'rotate-180' : ''}`}
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
            
            <div className={`absolute top-full left-0 mt-2 w-56 bg-white rounded shadow-lg overflow-hidden transition-all duration-300 ${isMadeToOwnDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <Link 
                href="/custom-made-gowns" 
                className="block px-4 py-3 text-foreground hover:bg-gray-100 hover:text-foreground-darker transition-colors duration-200"
                onClick={() => setIsMadeToOwnDropdownOpen(false)}
              >
                Custom Creations
              </Link>
            </div>
          </div>

          <Link href="/portfolio" className="relative group transition-colors duration-300 hover:text-foreground-darker">
            Portfolio
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground-darker transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/book-now" className="relative group transition-colors duration-300 hover:text-foreground-darker">
            Book Now
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground-darker transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/community" className="relative group transition-colors duration-300 hover:text-foreground-darker">
            Community
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground-darker transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          {/* FAQs & Terms Dropdown */}
          <div className="relative group">
            <button
              onClick={toggleFaqsDropdown}
              className="relative transition-colors duration-300 hover:text-foreground-darker flex items-center gap-1"
            >
              FAQs & Terms
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
            <div className={`absolute top-full left-0 mt-2 w-56 bg-white rounded shadow-lg overflow-hidden transition-all duration-300 ${isFaqsDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <Link 
                href="/faqs" 
                className="block px-4 py-3 text-foreground hover:bg-gray-100 hover:text-foreground-darker transition-colors duration-200"
                onClick={() => setIsFaqsDropdownOpen(false)}
              >
                Faqs
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
                Made To Own Terms
              </Link>
              <Link 
                href="/contact" 
                className="block px-4 py-3 text-foreground hover:bg-gray-100 hover:text-foreground-darker transition-colors duration-200"
                onClick={() => setIsFaqsDropdownOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
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

          <Link 
            href="/collections" 
            className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 transform hover:translate-x-2"
            style={{ animationDelay: isMobileMenuOpen ? '0.2s' : '0s' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Gowns
          </Link>

          {/* Style Extension Mobile Dropdown */}
          <div style={{ animationDelay: isMobileMenuOpen ? '0.3s' : '0s' }}>
            <button
              onClick={toggleStyleExtensionDropdown}
              className="w-full text-left py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 transform hover:translate-x-2 flex items-center justify-between text-foreground"
            >
              Style Extension
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isStyleExtensionDropdownOpen ? 'rotate-180' : ''}`}
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
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isStyleExtensionDropdownOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="mt-1 ml-3 pl-3 border-l-2 border-foreground/20 space-y-1">
                <Link 
                  href="/addons/hood" 
                  className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 text-secondary text-sm"
                  onClick={() => {
                    setIsStyleExtensionDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Hood
                </Link>
                <Link 
                  href="/addons-style-extensions/train" 
                  className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 text-secondary text-sm"
                  onClick={() => {
                    setIsStyleExtensionDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Train
                </Link>
                <Link
                  href="/addons-style-extensions/wings"
                  className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 text-secondary text-sm"
                  onClick={() => {
                    setIsStyleExtensionDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Wings
                </Link>
                <Link 
                  href="/request-style-extension" 
                  className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 text-secondary text-sm"
                  onClick={() => {
                    setIsStyleExtensionDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Request Style Extension
                </Link>
              </div>
            </div>
          </div>

          {/* Add Ons Mobile Dropdown */}
          <div style={{ animationDelay: isMobileMenuOpen ? '0.4s' : '0s' }}>
            <button
              onClick={toggleAddOnsDropdown}
              className="w-full text-left py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 transform hover:translate-x-2 flex items-center justify-between text-foreground"
            >
              Add Ons
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isAddOnsDropdownOpen ? 'rotate-180' : ''}`}
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
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isAddOnsDropdownOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="mt-1 ml-3 pl-3 border-l-2 border-foreground/20 space-y-1">
                <Link 
                  href="/addons/petticoat" 
                  className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 text-secondary text-sm"
                  onClick={() => {
                    setIsAddOnsDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Petticoats
                </Link>
                <Link 
                  href="/addons-style-extensions" 
                  className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 text-secondary text-sm"
                  onClick={() => {
                    setIsAddOnsDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Accessories
                </Link>
              </div>
            </div>
          </div>

          {/* Made To Own Mobile Dropdown */}
          <div style={{ animationDelay: isMobileMenuOpen ? '0.5s' : '0s' }}>
            <button
              onClick={toggleMadeToOwnDropdown}
              className="w-full text-left py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 transform hover:translate-x-2 flex items-center justify-between text-foreground"
            >
              Made To Own
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isMadeToOwnDropdownOpen ? 'rotate-180' : ''}`}
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
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMadeToOwnDropdownOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="mt-1 ml-3 pl-3 border-l-2 border-foreground/20 space-y-1">
                <Link 
                  href="/custom-made-gowns" 
                  className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 text-secondary text-sm"
                  onClick={() => {
                    setIsMadeToOwnDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Custom Creations
                </Link>
              </div>
            </div>
          </div>

          <Link 
            href="/portfolio" 
            className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 transform hover:translate-x-2"
            style={{ animationDelay: isMobileMenuOpen ? '0.6s' : '0s' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Portfolio
          </Link>
          <Link 
            href="/book-now" 
            className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 transform hover:translate-x-2"
            style={{ animationDelay: isMobileMenuOpen ? '0.7s' : '0s' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Book Now
          </Link>
          <Link 
            href="/community" 
            className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 transform hover:translate-x-2"
            style={{ animationDelay: isMobileMenuOpen ? '0.8s' : '0s' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Community
          </Link>
          
          {/* FAQs & Terms Mobile Dropdown */}
          <div style={{ animationDelay: isMobileMenuOpen ? '0.9s' : '0s' }}>
            <button
              onClick={toggleFaqsDropdown}
              className="w-full text-left py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 transform hover:translate-x-2 flex items-center justify-between text-foreground"
            >
              FAQs & Terms
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
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFaqsDropdownOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="mt-1 ml-3 pl-3 border-l-2 border-foreground/20 space-y-1">
                <Link 
                  href="/faqs" 
                  className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 text-secondary text-sm"
                  onClick={() => {
                    setIsFaqsDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Faqs
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
                  Made To Own Terms
                </Link>
                <Link 
                  href="/contact" 
                  className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 text-secondary text-sm"
                  onClick={() => {
                    setIsFaqsDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
