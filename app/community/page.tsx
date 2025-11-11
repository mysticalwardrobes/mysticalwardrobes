"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/assets/Mystical-Wardrobes-Logo-02.svg";

export default function CommunityPage() {
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
            Community
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-manrope text-base text-secondary">
            Join our magical community of dreamers and fashion enthusiasts
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
            </div>
            <h2 className="font-vegawanty text-3xl text-foreground mb-4">
              Coming Soon
            </h2>
            <p className="font-manrope text-secondary/80 mb-6 max-w-xl mx-auto">
              We're building a special space where our customers can share their magical moments, 
              showcase their photos, and inspire others. Stay tuned for updates!
            </p>
          </div>

          {/* What to Expect */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <h3 className="font-vegawanty text-2xl text-foreground mb-6">
              What to Expect
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-8">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-manrope font-semibold text-foreground mb-1">Photo Gallery</h4>
                  <p className="font-manrope text-sm text-secondary/70">
                    Share your magical moments and see how others styled their gowns
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-manrope font-semibold text-foreground mb-1">Reviews & Stories</h4>
                  <p className="font-manrope text-sm text-secondary/70">
                    Read real experiences and share your own magical story
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-manrope font-semibold text-foreground mb-1">Style Inspiration</h4>
                  <p className="font-manrope text-sm text-secondary/70">
                    Get ideas and inspiration for your perfect look
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-manrope font-semibold text-foreground mb-1">Community Events</h4>
                  <p className="font-manrope text-sm text-secondary/70">
                    Participate in styling contests and special events
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Connect With Us Now */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <h3 className="font-vegawanty text-xl text-foreground mb-4">
              Stay Connected
            </h3>
            <p className="font-manrope text-secondary/80 mb-6">
              Follow us on social media to stay updated on our latest collections and community features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://www.instagram.com/mysticalwardrobes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-manrope font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </Link>
              <Link
                href="https://www.facebook.com/MysticalWardrobes/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-manrope font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-secondary hover:text-secondary/80 font-manrope transition-colors"
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

