"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/Mystical Wardrobes Logo-02.svg"


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsDropdownOpen, setIsCollectionsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCollectionsDropdown = () => {
    setIsCollectionsDropdownOpen(!isCollectionsDropdownOpen);
  };

  return (
    <header className="bg-background shadow-md py-4">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center ">
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

            <div
            className="relative group"
            onMouseEnter={() => setIsCollectionsDropdownOpen(true)}
            onMouseLeave={() => setIsCollectionsDropdownOpen(false)}
            >
            <button
              className="hover:text-gray-900 focus:outline-none"
              tabIndex={0}
            >
              Collections
            </button>
            <div
              className={`
              absolute top-full left-0 mt-2 w-48 bg-background rounded shadow-lg z-10
              transition-all duration-300 ease-in-out
              ${isCollectionsDropdownOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
              `}
              style={{ transformOrigin: "top" }}
            >
              <Link
              href="/collections/fairy"
              className="block px-4 py-2 hover:bg-gray-100"
              >
              Fairy
              </Link>
              <Link
              href="/collections/disney"
              className="block px-4 py-2 hover:bg-gray-100"
              >
              Disney
              </Link>
              <Link
              href="/collections/bridgerton"
              className="block px-4 py-2 hover:bg-gray-100"
              >
              Bridgerton
              </Link>
              <Link
              href="/collections/mystical"
              className="block px-4 py-2 hover:bg-gray-100"
              >
              Mystical
              </Link>
            </div>
            </div>

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
          <div>
            <button
              onClick={toggleCollectionsDropdown}
              className="block hover:text-gray-900 w-full text-left"
            >
              Collections
            </button>
            {isCollectionsDropdownOpen && (
              <div className="mt-2 ml-4 space-y-1">
                <Link
                  href="/collections/fairy"
                  className="block  hover:text-gray-900"
                >
                  Fairy
                </Link>
                <Link
                  href="/collections/disney"
                  className="block  hover:text-gray-900"
                >
                  Disney
                </Link>
                <Link
                  href="/collections/bridgerton"
                  className="block  hover:text-gray-900"
                >
                  Bridgerton
                </Link>
                <Link
                  href="/collections/mystical"
                  className="block  hover:text-gray-900"
                >
                  Mystical
                </Link>
              </div>
            )}
          </div>
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
