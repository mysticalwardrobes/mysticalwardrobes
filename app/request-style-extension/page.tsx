"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/assets/Mystical-Wardrobes-Logo-02.svg";

export default function RequestStyleExtensionPage() {
  return (
    <main className="bg-background min-h-screen py-16 text-secondary">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <Image 
              src={Logo} 
              alt="Mystical Wardrobes" 
              width={80} 
              height={80}
              className="opacity-50"
            />
          </div>
          <h1 className="font-vegawanty text-4xl text-foreground sm:text-5xl md:text-6xl mb-4">
            Request Style Extension
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-manrope text-base text-secondary">
            Transform your gown with custom style extensions
          </p>
        </header>

        {/* Coming Soon Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
          <div className="mb-6">
            <div className="inline-block p-4 bg-secondary/10 rounded-full mb-4">
              <svg 
                className="w-16 h-16 text-secondary" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                />
              </svg>
            </div>
            <h2 className="font-vegawanty text-3xl text-foreground mb-4">
              Coming Soon
            </h2>
            <p className="font-manrope text-secondary/80 mb-6 max-w-xl mx-auto">
              We're working on making it easier for you to request custom style extensions for your gowns. 
              This feature will allow you to add hoods, trains, and other enhancements to create your perfect look.
            </p>
          </div>

          {/* What's Available Now */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <h3 className="font-vegawanty text-2xl text-foreground mb-6">
              Available Style Extensions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Link
                href="/addons/hood"
                className="p-4 border border-gray-200 rounded-lg hover:border-secondary hover:bg-secondary/5 transition-all duration-200"
              >
                <h4 className="font-manrope font-semibold text-foreground mb-2">Hoods</h4>
                <p className="text-sm text-secondary/70">
                  Browse our collection of dramatic hoods with elegant details
                </p>
              </Link>
              <Link
                href="/collections/all?skirtStyles=Train"
                className="p-4 border border-gray-200 rounded-lg hover:border-secondary hover:bg-secondary/5 transition-all duration-200"
              >
                <h4 className="font-manrope font-semibold text-foreground mb-2">Trains</h4>
                <p className="text-sm text-secondary/70">
                  Discover gowns featuring elegant flowing trains
                </p>
              </Link>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <h3 className="font-vegawanty text-xl text-foreground mb-4">
              Need a Custom Style Extension Now?
            </h3>
            <p className="font-manrope text-secondary/80 mb-6">
              Contact us directly and we'll help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-secondary text-white font-manrope font-medium rounded-lg hover:bg-secondary/90 transition-all duration-200 hover:scale-105"
              >
                Contact Us
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/custom-made-gowns"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-secondary text-secondary font-manrope font-medium rounded-lg hover:bg-secondary hover:text-white transition-all duration-200"
              >
                Custom Creations
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Add-Ons */}
        <div className="mt-8 text-center">
          <Link
            href="/addons"
            className="inline-flex items-center text-secondary hover:text-secondary/80 font-manrope transition-colors"
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Add-Ons
          </Link>
        </div>
      </div>
    </main>
  );
}

