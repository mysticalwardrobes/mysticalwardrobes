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
      <nav className="container mx-auto px-12 py-4 flex justify-between items-center ">
        {/* Company Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="font-bold text-gray-800 flex items-center space-x-2 justify-center">
            <Image className="w-6 h-6 md:w-10 md:h-10" src={Logo} alt="Mystical Logo"/>
            <h1 className=" font-vegawanty text-xl md:text-4xl text-foreground">Mystical Wardrobes</h1>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="hover:text-foreground focus:outline-none focus:text-foreground"
          >
            <svg
              className="h-6 w-6"
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
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>

            <Link href="/collections" className="hover:text-gray-900">
              Collections
            </Link>

          <Link href="/addons" className=" hover:text-gray-900">
            Add Ons
          </Link>
          <Link href="/promqueens" className=" hover:text-gray-900">
            Prom Queens
          </Link>
          <Link href="/about" className=" hover:text-gray-900">
            About
          </Link>
          <Link href="/contact" className=" hover:text-gray-900">
            Contact
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 font-manrope">
          <Link href="/" className="block  hover:text-gray-900">
            Home
          </Link>
          <Link href="/collections" className="block hover:text-gray-900">
            Collections
          </Link>
          <Link href="/addons" className="block  hover:text-gray-900">
            Add Ons
          </Link>
          <Link href="/promqueens" className="block  hover:text-gray-900">
            Prom Queens
          </Link>
          <Link href="/about" className="block  hover:text-gray-900">
            About
          </Link>
          <Link href="/contact" className="block  hover:text-gray-900">
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
