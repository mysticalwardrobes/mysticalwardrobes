"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/Mystical-Wardrobes-Logo-02.svg"


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-background shadow-md py-4">
      <nav className="container mx-auto px-6 py-2 md:px-12 md:py-4 flex justify-between items-center ">
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

          <Link href="/collections" className="relative group transition-colors duration-300 hover:text-foreground-darker">
            Collections
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground-darker transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link href="/addons" className="relative group transition-colors duration-300 hover:text-foreground-darker">
            Add Ons
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground-darker transition-all duration-300 group-hover:w-full"></span>
          </Link>
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
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 pb-4 space-y-2 font-manrope">
          <Link 
            href="/" 
            className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 transform hover:translate-x-2"
            style={{ animationDelay: isMobileMenuOpen ? '0.1s' : '0s' }}
          >
            Home
          </Link>
          <Link 
            href="/collections" 
            className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 transform hover:translate-x-2"
            style={{ animationDelay: isMobileMenuOpen ? '0.2s' : '0s' }}
          >
            Collections
          </Link>
          <Link 
            href="/addons" 
            className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 transform hover:translate-x-2"
            style={{ animationDelay: isMobileMenuOpen ? '0.3s' : '0s' }}
          >
            Add Ons
          </Link>
          <Link 
            href="/promqueens" 
            className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 transform hover:translate-x-2"
            style={{ animationDelay: isMobileMenuOpen ? '0.4s' : '0s' }}
          >
            Prom Queens
          </Link>
          <Link 
            href="/about" 
            className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 transform hover:translate-x-2"
            style={{ animationDelay: isMobileMenuOpen ? '0.5s' : '0s' }}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 transform hover:translate-x-2"
            style={{ animationDelay: isMobileMenuOpen ? '0.6s' : '0s' }}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
