"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/Mystical Wardrobes Logo-02 White.svg";

export default function Footer() {
  return (
    <footer className="bg-secondary text-background">
      <div className="container mx-auto px-12 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image className="w-8 h-8" src={Logo} alt="Mystical Logo"/>
              <h3 className="font-vegawanty text-2xl text-background">Mystical Wardrobes</h3>
            </div>
            <p className="font-manrope text-background/80 mb-4 max-w-md">
              Where fairytales come to life. We create enchanting gowns that blend fantasy with elegance, 
              crafting unique pieces that inspire your imagination and elevate your wardrobe.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/FairyandDreamyGowns" 
                className="text-background/70 hover:text-background transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
               <a 
                 href="https://www.instagram.com/mystical_wardrobes/" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-background/70 hover:text-background transition-colors duration-300"
                 aria-label="Instagram"
               >
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                 </svg>
               </a>
               <a 
                 href="https://www.tiktok.com/@mysticalwardrobes" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-background/70 hover:text-background transition-colors duration-300"
                 aria-label="TikTok"
               >
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                 </svg>
               </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-vegawanty text-lg text-background mb-4">Quick Links</h4>
            <ul className="space-y-2 font-manrope">
              <li>
                <Link href="/" className="text-background/70 hover:text-background transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-background/70 hover:text-background transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-background/70 hover:text-background transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/rental-terms" className="text-background/70 hover:text-background transition-colors duration-300">
                  Rental Terms
                </Link>
              </li>
              <li>
                <Link href="/custom-made-terms" className="text-background/70 hover:text-background transition-colors duration-300">
                  Custom Made Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-vegawanty text-lg text-background mb-4">Collections</h4>
            <ul className="space-y-2 font-manrope">
              <li>
                <Link href="/collections/modern-glamour" className="text-background/70 hover:text-background transition-colors duration-300">
                Modern Glamour
                </Link>
              </li>
              <li>
                <Link href="/collections/royal-historical-eras" className="text-background/70 hover:text-background transition-colors duration-300">
                Royal Historical Eras
                </Link>
              </li>
              <li>
                <Link href="/collections/fairytale-fantasy" className="text-background/70 hover:text-background transition-colors duration-300">
                Fairytale Fantasy
                </Link>
              </li>
              <li>
                <Link href="/collections/nature-seasonal-realms" className="text-background/70 hover:text-background transition-colors duration-300">
                Nature Seasonal Realms
                </Link>
              </li>
              <li>
                <Link href="/collections/celestial-dreamlike" className="text-background/70 hover:text-background transition-colors duration-300">
                Celestial Dreamlike
                </Link>
              </li>
              <li>
                <Link href="/collections/ocean-realm" className="text-background/70 hover:text-background transition-colors duration-300">
                Ocean Realm
                </Link>
              </li>
              <li>
                <Link href="/collections/cultural-and-mythic-icons" className="text-background/70 hover:text-background transition-colors duration-300">
                Cultural and Mythic Icons
                </Link>
              </li>
              <li>
                <Link href="/collections/all" className="text-background/70 hover:text-background transition-colors duration-300">
                View All Collections
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-background/20 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-background/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="font-manrope text-sm text-background/70">Visit Our Studio</p>
                <p className="font-manrope text-background">Hulong Duhat, Malabon City</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-background/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <p className="font-manrope text-sm text-background/70">Call Us</p>
                <p className="font-manrope text-background">(+63) 976 277 4888</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-background/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="font-manrope text-sm text-background/70">Email Us</p>
                <p className="font-manrope text-background">mysticalwardrobes07@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-manrope text-sm text-background/70">
              © 2021 Mystical Wardrobes. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="font-manrope text-sm text-background/70 hover:text-background transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="font-manrope text-sm text-background/70 hover:text-background transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
