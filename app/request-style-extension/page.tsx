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
            Style Extensions — Request Version for RENT
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-manrope text-base text-secondary">
            Transform your gown with custom style extensions
          </p>
        </header>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Style Extensions List */}
          <div className="mb-8 text-center">
            <p className="font-manrope text-lg text-foreground">
              Hood / Pixie Skirt / Long Skirt / Train / Sleeves
            </p>
          </div>

          {/* Pricing Table */}
          <div className="mb-8">
            <h2 className="font-vegawanty text-2xl text-foreground mb-6 text-center">
              Prices
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-4 px-4 font-manrope font-semibold text-foreground">
                      Style Extension
                    </th>
                    <th className="text-center py-4 px-4 font-manrope font-semibold text-foreground border-l border-gray-200">
                      Designer's Choice
                    </th>
                    <th className="text-center py-4 px-4 font-manrope font-semibold text-foreground border-l border-gray-200">
                      Made for You
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 font-manrope text-foreground">Hood and Capes</td>
                    <td className="py-4 px-4 font-manrope text-center text-foreground border-l border-gray-200">₱1,990</td>
                    <td className="py-4 px-4 font-manrope text-center text-foreground border-l border-gray-200">₱2,990+</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 font-manrope text-foreground">Pixie Skirts</td>
                    <td className="py-4 px-4 font-manrope text-center text-foreground border-l border-gray-200">₱2,990</td>
                    <td className="py-4 px-4 font-manrope text-center text-foreground border-l border-gray-200">₱3,990+</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 font-manrope text-foreground">Long Skirts</td>
                    <td className="py-4 px-4 font-manrope text-center text-foreground border-l border-gray-200">₱3,990</td>
                    <td className="py-4 px-4 font-manrope text-center text-foreground border-l border-gray-200">₱7,990+</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 font-manrope text-foreground">Train</td>
                    <td className="py-4 px-4 font-manrope text-center text-foreground border-l border-gray-200">₱3,990</td>
                    <td className="py-4 px-4 font-manrope text-center text-foreground border-l border-gray-200">₱5,990+</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 font-manrope text-foreground">Sleeves</td>
                    <td className="py-4 px-4 font-manrope text-center text-foreground border-l border-gray-200">₱990</td>
                    <td className="py-4 px-4 font-manrope text-center text-foreground border-l border-gray-200">₱1,890</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-sm text-secondary/70">
              <p className="font-manrope mb-2">
                <strong className="text-foreground">Designer's Choice</strong> - Mystical Wardrobes will release a new one based on its own design.
              </p>
              <p className="font-manrope">
                <strong className="text-foreground">Made for You</strong> - Mystical Wardrobes will release a new one based or similar on your design.
              </p>
            </div>
          </div>

          {/* Information Section */}
          <div className="space-y-6 text-secondary">
            <p className="font-manrope">
              Even if your chosen gown doesn't have a matching style extension, you can still avail it as an add-on. If a design that fits already exists, you'll be able to choose from the available options.
            </p>
            <p className="font-manrope">
              You might even be the first to wear it <span className="italic">(Case by case)</span> — Mystical Wardrobes will design a custom style extension just for you.
            </p>
            <p className="font-manrope">
              Once your downpayment is made, we'll begin the full design process, including the mood board, styling, and production of your style extension based on the gown's original look.
            </p>
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

