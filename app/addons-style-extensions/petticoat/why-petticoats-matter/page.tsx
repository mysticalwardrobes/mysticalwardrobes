"use client";

import Link from "next/link";
import Image from "next/image";

export default function WhyPetticoatsMatterPage() {
  return (
    <main className="bg-background py-10 text-secondary md:py-16">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-xs animate-fade-in-up">
          <Link href="/addons" className="text-secondary/70 hover:text-secondary transition-colors">
            Add-Ons
          </Link>
          <span className="mx-2 text-secondary/40">/</span>
          <Link href="/addons/petticoat" className="text-secondary/70 hover:text-secondary transition-colors">
            Petticoats
          </Link>
          <span className="mx-2 text-secondary/40">/</span>
          <span className="text-secondary">Why Petticoats Matter</span>
        </nav>

        {/* Header */}
        <header className="mb-12 text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="font-vegawanty text-4xl text-foreground sm:text-5xl md:text-6xl mb-4">
            Why Petticoats Matter
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-manrope text-base text-secondary/80">
            Understanding the foundation of your gown's perfect silhouette
          </p>
        </header>

        {/* Content */}
        <div className="space-y-12">
          {/* The Role of Petticoats */}
          <section className="bg-white rounded-lg shadow-md p-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="font-vegawanty text-3xl text-foreground mb-6">The Role of Petticoats</h2>
            <div className="space-y-4 font-manrope text-secondary/90 leading-relaxed">
              <p>
                The fullness of your gown does not depend only on the number of hoops. <strong>Hoops simply act as support to hold the shape.</strong> What really affects the volume is the size of the hoop spacing and the overall volume of the petticoat.
              </p>
              <p>
                That's why at Mystical Wardrobes, we categorize our petticoats into three types:
              </p>
            </div>

            {/* Petticoat Types */}
            <div className="mt-8 space-y-6">
              {/* No Hoops */}
              <div className="border-l-4 border-secondary/30 pl-6 py-2">
                <h3 className="font-manrope font-semibold text-lg text-foreground mb-2">No Hoops Petticoat</h3>
                <p className="font-manrope text-secondary/80">
                  Adds gentle shape while keeping a sleek, flowy silhouette.
                </p>
              </div>

              {/* Slim Petticoat */}
              <div className="border-l-4 border-secondary/50 pl-6 py-2">
                <h3 className="font-manrope font-semibold text-lg text-foreground mb-2">Slim Petticoat</h3>
                <p className="font-manrope text-secondary/80">
                  Subtle shape with a sleek silhouette. Perfect for girls who prefer a flowy dress. <span className="text-secondary/60 italic">(Usually 3 hoops)</span>
                </p>
              </div>

              {/* Medium Petticoat */}
              <div className="border-l-4 border-secondary/70 pl-6 py-2">
                <h3 className="font-manrope font-semibold text-lg text-foreground mb-2">Medium Petticoat</h3>
                <p className="font-manrope text-secondary/80">
                  Gives moderate volume and a balanced shape. Ideal for mid ball gowns, easy movement, not too bulky, and fully dance-approved. <span className="text-secondary/60 italic">(Usually 4–6 hoops)</span>
                </p>
              </div>

              {/* Premium Petticoat */}
              <div className="border-l-4 border-secondary pl-6 py-2 bg-secondary/5 rounded-r">
                <h3 className="font-manrope font-semibold text-lg text-foreground mb-2">Premium Petticoat</h3>
                <p className="font-manrope text-secondary/80">
                  Our gowns with a Premium Petticoat deliver full ball-gown volume without taking up too much space—ideal for Victorian and princess looks. The hoops create comfortable leg room under the skirt for easy walking and smooth turns, and the look is fully dance-approved. <span className="text-secondary/60 italic">(Usually 4–6 hoops)</span>
                </p>
              </div>
            </div>
          </section>

          {/* How to Choose Your Petticoat */}
          <section className="bg-white rounded-lg shadow-md p-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="font-vegawanty text-3xl text-foreground mb-6">How to Choose Your Petticoat</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                  <span className="font-vegawanty text-secondary">1</span>
                </div>
                <div>
                  <h3 className="font-manrope font-semibold text-foreground mb-2">Flowy and Floor-Length Gowns</h3>
                  <p className="font-manrope text-secondary/80">
                    Best paired with a <strong>No Hoops or Slim Petticoat</strong> for a natural, elegant fall.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                  <span className="font-vegawanty text-secondary">2</span>
                </div>
                <div>
                  <h3 className="font-manrope font-semibold text-foreground mb-2">Mid Ball Gowns</h3>
                  <p className="font-manrope text-secondary/80">
                    Requires a <strong>Medium Petticoat</strong>. Take note that this is not a large ball gown and will not take up too much space around you. It's lightweight and dance-approved.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                  <span className="font-vegawanty text-secondary">3</span>
                </div>
                <div>
                  <h3 className="font-manrope font-semibold text-foreground mb-2">Ball Gowns</h3>
                  <p className="font-manrope text-secondary/80">
                    Usually paired with a <strong>Medium to Premium Petticoat</strong>. Some gowns may need a Premium Petticoat for maximum fullness, while others work perfectly with Medium. Like mid ball gowns, these are designed for movement and are still dance-approved.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* The Benefits of Petticoats */}
          <section className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-lg shadow-md p-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="font-vegawanty text-3xl text-foreground mb-6">The Benefits of Petticoats</h2>
            <div className="space-y-4 font-manrope text-secondary/90 leading-relaxed">
              <p>
                Petticoats don't just enhance the volume of a gown—they also make wearing it more comfortable. Many think that a petticoat makes walking harder, but <strong>the truth is the opposite:</strong>
              </p>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-foreground">
                      For ball gowns, a petticoat creates space inside the skirt, so your legs aren't restricted by the fabric. This makes walking—and even dancing—easier and more graceful.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="font-vegawanty text-2xl text-foreground mb-4">Ready to Find Your Perfect Petticoat?</h3>
              <p className="font-manrope text-secondary/80 mb-6 max-w-xl mx-auto">
                Browse our collection of petticoats and find the perfect foundation for your magical moment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/addons/petticoat"
                  className="inline-flex items-center justify-center px-8 py-3 bg-secondary text-white font-manrope font-medium rounded-lg hover:bg-secondary/90 transition-all duration-200 hover:scale-105"
                >
                  Browse Petticoats
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-secondary text-secondary font-manrope font-medium rounded-lg hover:bg-secondary hover:text-white transition-all duration-200"
                >
                  Need Help Choosing?
                </Link>
              </div>
            </div>
          </section>

          {/* Back Link */}
          <div className="text-center mt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
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
      </div>
    </main>
  );
}

