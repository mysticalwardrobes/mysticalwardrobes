"use client";

import { useState } from "react";
import Link from "next/link";
import FadeInOnScroll from "@/components/FadeInOnScroll";

type TabType = "rental" | "fitting" | "custom";

export default function BookNowPage() {
  const [activeTab, setActiveTab] = useState<TabType>("rental");
  const [showBanner, setShowBanner] = useState(false); // Set to true to show exclusive deals

  return (
    <main className="bg-background">
      {/* Exclusive Deals Banner (Optional) */}
      {showBanner && (
        <div className="bg-gradient-to-r from-foreground to-secondary text-background py-4 px-6 text-center">
          <p className="font-manrope text-sm md:text-base font-medium">
            🎉 Special Offer: Get 10% off on bookings made this month! Limited time only.
          </p>
        </div>
      )}

      {/* Header Section */}
      <FadeInOnScroll delay={0.1}>
        <section className="py-10 md:py-16 px-6 md:px-16">
          <div className="mx-auto max-w-5xl text-center">
            <p className="font-manrope text-xs uppercase tracking-[0.4em] text-secondary">
              Start Your Journey
            </p>
            <h1 className="mt-3 font-vegawanty text-4xl text-foreground md:text-6xl">
              BOOK YOUR GOWN NOW
            </h1>
            <p className="mx-auto mt-5 max-w-2xl font-manrope text-sm text-secondary/80 md:text-base">
              Rent or book your dream gown for your event date.
            </p>
          </div>
        </section>
      </FadeInOnScroll>

      {/* Tab Navigation */}
      <FadeInOnScroll delay={0.15}>
        <section className="px-6 md:px-16">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8">
              <button
                onClick={() => setActiveTab("rental")}
                className={`px-6 py-3 font-manrope text-sm md:text-base rounded-lg transition-all duration-300 ${
                  activeTab === "rental"
                    ? "bg-secondary text-background shadow-lg"
                    : "bg-white text-secondary border-2 border-secondary/20 hover:border-secondary/50"
                }`}
              >
                Book a Rental
              </button>
              <button
                onClick={() => setActiveTab("fitting")}
                className={`px-6 py-3 font-manrope text-sm md:text-base rounded-lg transition-all duration-300 ${
                  activeTab === "fitting"
                    ? "bg-secondary text-background shadow-lg"
                    : "bg-white text-secondary border-2 border-secondary/20 hover:border-secondary/50"
                }`}
              >
                Book a Fitting
              </button>
              <button
                onClick={() => setActiveTab("custom")}
                className={`px-6 py-3 font-manrope text-sm md:text-base rounded-lg transition-all duration-300 ${
                  activeTab === "custom"
                    ? "bg-secondary text-background shadow-lg"
                    : "bg-white text-secondary border-2 border-secondary/20 hover:border-secondary/50"
                }`}
              >
                Start a Custom Order
              </button>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* Tab Content */}
      <section className="py-8 px-6 md:px-16 pb-16">
        <div className="mx-auto max-w-5xl">
          {activeTab === "rental" && <BookRentalSection />}
          {activeTab === "fitting" && <BookFittingSection />}
          {activeTab === "custom" && <CustomOrderSection />}
        </div>
      </section>
    </main>
  );
}

function BookRentalSection() {
  const steps = [
    {
      number: 1,
      title: "Choose and Message Us",
      content: (
        <div className="space-y-3">
          <p className="font-manrope text-sm text-secondary/80">
            Browse our rental collection and reach out to us with your selection.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/collections/all"
              className="inline-flex items-center text-foreground hover:text-secondary transition-colors font-manrope text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Browse Rental Collection
            </Link>
          </div>
          <p className="font-manrope text-sm text-secondary/80 mt-4">
            Message us on Instagram or Facebook with:
          </p>
          <ul className="list-disc list-inside font-manrope text-sm text-secondary/80 space-y-1">
            <li>Gown name</li>
            <li>Your location</li>
            <li>Event date</li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a
              href="https://www.instagram.com/mysticalwardrobes"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-manrope text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
            <a
              href="https://www.facebook.com/MysticalWardrobes/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-manrope text-sm rounded-lg hover:bg-blue-700 transition-all"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
          </div>
        </div>
      ),
    },
    {
      number: 2,
      title: "Reserve",
      content: (
        <p className="font-manrope text-sm text-secondary/80">
          Pay 50% or the agreed upon amount as down payment and send proof of payment. A booking is only confirmed once acknowledged by our team.
        </p>
      ),
    },
    {
      number: 3,
      title: "Confirm",
      content: (
        <p className="font-manrope text-sm text-secondary/80">
          We finalize your booking details and rental period to ensure everything is perfect for your special day.
        </p>
      ),
    },
    {
      number: 4,
      title: "Receive Your Gown",
      content: (
        <p className="font-manrope text-sm text-secondary/80">
          Your gown will be delivered to your location. We utilize Lalamove for shipping, with the shipping fee to be handled by the client for both delivery and return.
        </p>
      ),
    },
    {
      number: 5,
      title: "Enjoy Your Event",
      content: (
        <p className="font-manrope text-sm text-secondary/80">
          Wear your chosen gown, take beautiful photos, and make your special day unforgettable!
        </p>
      ),
    },
    {
      number: 6,
      title: "Return Your Gown",
      content: (
        <p className="font-manrope text-sm text-secondary/80">
          Please return the gown on the scheduled date to ensure it's available for the next client.
        </p>
      ),
    },
  ];

  return (
    <FadeInOnScroll delay={0.1}>
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="font-vegawanty text-3xl text-foreground mb-6">Book a Rental</h2>
        
        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-secondary text-background flex items-center justify-center font-manrope font-bold">
                  {step.number}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-manrope text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <div>{step.content}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-foreground/10">
          <Link
            href="/rental-terms"
            className="inline-flex items-center text-secondary hover:text-foreground transition-colors font-manrope text-sm font-medium"
          >
            View Rental Terms & Conditions
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </FadeInOnScroll>
  );
}

function BookFittingSection() {
  return (
    <FadeInOnScroll delay={0.1}>
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="font-vegawanty text-3xl text-foreground mb-6">Book a Fitting</h2>
        
        <div className="space-y-6">
          {/* Initial Contact */}
          <div>
            <h3 className="font-manrope text-lg font-semibold text-foreground mb-3">
              How to Book
            </h3>
            <p className="font-manrope text-sm text-secondary/80 mb-4">
              To book a fitting appointment, message us on Instagram or Facebook:
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/mysticalwardrobes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-manrope text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
              <a
                href="https://www.facebook.com/MysticalWardrobes/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-manrope text-sm rounded-lg hover:bg-blue-700 transition-all"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </div>
          </div>

          {/* Fitting Fee */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-lg p-4">
            <h3 className="font-manrope text-lg font-semibold text-foreground mb-3">
              Fitting Fee: ₱800
            </h3>
            <ul className="space-y-2 font-manrope text-sm text-secondary/80">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>A non-refundable ₱800 fitting fee is required and must be paid online before your visit.</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>₱500 Rebate:</strong> ₱500 of your fitting fee will be deducted from your gown rental if you book within 5 days of your fitting appointment.</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span><strong>Cancellation Policy:</strong> The fitting fee is non-refundable for cancellations or missed appointments.</span>
              </li>
            </ul>
          </div>

          {/* During Your Fitting */}
          <div>
            <h3 className="font-manrope text-lg font-semibold text-foreground mb-3">
              During Your Fitting
            </h3>
            <ul className="space-y-2 font-manrope text-sm text-secondary/80">
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">•</span>
                <span><strong>Try-On Time:</strong> You can try on 3-4 gowns within a 30-40 minute session.</span>
              </li>
            </ul>
          </div>

          {/* Gown Choices & Availability */}
          <div>
            <h3 className="font-manrope text-lg font-semibold text-foreground mb-3">
              Gown Choices & Availability
            </h3>
            <ul className="space-y-2 font-manrope text-sm text-secondary/80 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">•</span>
                <span>Some gowns may not be available on your fitting date, as they may already be booked by other clients. That's why we ask for your top 8–15 choices, so we can easily remove any unavailable gowns and proceed with the rest.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">•</span>
                <span>We're unable to update every fitting client in real time about each gown's status, so please message us a few days before your fitting and we'll send an updated list of gowns that are available to try.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">•</span>
                <span>Paying the ₱800 fitting fee does not reserve any gown for your fitting date or your event date. A gown is only reserved once you officially book it for your event.</span>
              </li>
            </ul>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
              <h4 className="font-manrope text-base font-semibold text-foreground mb-3">
                Sample Scenario
              </h4>
              <p className="font-manrope text-sm text-secondary/80 mb-3">
                If you schedule your fitting weeks or months in advance, your preferred gowns may be available at the time of booking, but we cannot guarantee they'll still be available on your actual fitting day. Another client may reserve those gowns for an event date that overlaps with your fitting, making them unavailable for you.
              </p>
              <p className="font-manrope text-sm text-secondary/80">
                If your chosen gowns are not in the studio on the day of your fitting, we will offer gowns with a similar structure or design for you to try (the design may not be exactly the same). Even if you're not able to fit a specific gown, you can still book it for your event date as long as it is available.
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
            <h3 className="font-manrope text-lg font-semibold text-foreground mb-4">
              Our Location
            </h3>
            <p className="font-manrope text-sm text-secondary/80 mb-4">
              <strong>Address:</strong> Crystal Fuel, Hulong Duhat, Malabon City
            </p>
            <div className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d309.9050619844438!2d120.94277897525555!3d14.678243168290427!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b500510de647%3A0x9cb071aa8aa79434!2sMystical!5e0!3m2!1sen!2sph!4v1763780514540!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
            <div className="space-y-2 font-manrope text-sm text-secondary/80">
              <p className="flex items-start gap-2">
                <span className="text-foreground">📍</span>
                <span><strong className="text-foreground">Use this for Waze or Google Maps pin:</strong> Crystal Fuel, Hulong Duhat</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-foreground">🚗</span>
                <span><strong className="text-foreground">If you're driving,</strong> please call us before passing Crystal Fuel to avoid making a U-turn.</span>
              </p>
            </div>
          </div>

          {/* Online Booking Alternative */}
          <div>
            <h3 className="font-manrope text-lg font-semibold text-foreground mb-3">
              Online Bookings (Highly Recommended)
            </h3>
            <ul className="space-y-2 font-manrope text-sm text-secondary/80">
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">•</span>
                <span><strong>Can't Visit Us?</strong> No problem! Most of our bookings are conveniently done online.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">•</span>
                <span><strong>How to Book Online:</strong> Simply send us your bust and waist measurements.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">•</span>
                <span><strong>Adjustable Gowns:</strong> Our gowns are mostly adjustable. We especially recommend online booking for clients wearing S-XL or those with non-busty frames.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-foreground/10">
          <Link
            href="/rental-terms"
            className="inline-flex items-center text-secondary hover:text-foreground transition-colors font-manrope text-sm font-medium"
          >
            View Fitting Studio Rules & Terms
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </FadeInOnScroll>
  );
}

function CustomOrderSection() {
  return (
    <FadeInOnScroll delay={0.1}>
      <div className="space-y-6">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="font-vegawanty text-3xl text-foreground mb-4">Start a Custom Order</h2>
          <p className="font-manrope text-sm text-secondary/80 mb-4">
            Please note that purchases are not made through a direct "click-to-buy" process on our website for both "To Own Collection" and "Custom Creation". All orders are coordinated personally through our official Mystical Wardrobes accounts on Instagram or Facebook, where our customer service team will assist you, confirm details, and provide major updates regarding your order's progress.
          </p>
          <p className="font-manrope text-sm text-secondary/80">
            Our website serves primarily as a catalogue and pricing reference for transparency. Official bookings, payments, and order updates are handled exclusively through our direct communication channels on Instagram or Facebook.
          </p>
        </div>

        {/* To Own Collection */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h3 className="font-vegawanty text-2xl text-foreground mb-3">To Own Collection</h3>
          <p className="font-manrope text-sm text-secondary/80 mb-6">
            Choose from our existing gown designs with published purchase rates. These gowns are already styled, priced, and ready to be made yours, with only minor size adjustments if needed. Perfect for clients who want a beautiful gown without going through the full design process.
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-manrope font-bold">
                  1
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-manrope text-base font-semibold text-foreground mb-2">
                  Browse Our Collection
                </h4>
                <p className="font-manrope text-sm text-secondary/80 mb-2">
                  Choose from our existing gown designs with published rates.
                </p>
                <Link
                  href="/custom-made-gowns"
                  className="inline-flex items-center text-foreground hover:text-secondary transition-colors font-manrope text-sm font-medium"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  View Made to Own Collection
                </Link>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-manrope font-bold">
                  2
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-manrope text-base font-semibold text-foreground mb-2">
                  Send Us a Message
                </h4>
                <p className="font-manrope text-sm text-secondary/80 mb-3">
                  For questions or clarifications, reach out to us:
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/mysticalwardrobes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-manrope text-xs rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/MysticalWardrobes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 bg-blue-600 text-white font-manrope text-xs rounded-lg hover:bg-blue-700 transition-all"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-manrope font-bold">
                  3
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-manrope text-base font-semibold text-foreground mb-2">
                  Confirm Your Order
                </h4>
                <p className="font-manrope text-sm text-secondary/80">
                  A 50% or the agreed upon amount as down payment secures your order. Bookings are confirmed once acknowledged via Facebook, Email, or Instagram.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-manrope font-bold">
                  4
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-manrope text-base font-semibold text-foreground mb-2">
                  Gown Production & Adjustments
                </h4>
                <p className="font-manrope text-sm text-secondary/80">
                  Your chosen gown will be newly crafted for you. Minor size adjustments may be accommodated depending on availability. In some cases, certain fabrics may no longer be available, but we will provide the best alternatives.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-manrope font-bold">
                  5
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-manrope text-base font-semibold text-foreground mb-2">
                  Shipping
                </h4>
                <p className="font-manrope text-sm text-secondary/80">
                  Nationwide delivery available via Lalamove, LBC, or DHL. Shipping fees handled by client.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Creation */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h3 className="font-vegawanty text-2xl text-foreground mb-3">Custom Creation</h3>
          <p className="font-manrope text-sm text-secondary/80 mb-4">
            A fully personalized gown experience, crafted from your vision. You decide on the design by sending your pegs and inspirations, along with event details and measurements. We'll guide you through fabric selection, design approval, and production to create a one-of-a-kind gown made exclusively for you.
          </p>
          <p className="font-manrope text-sm text-secondary/80 mb-6">
            Explore our portfolio under "Custom Creations" to see how our clients turned their pegs and inspirations into breathtaking reality.
          </p>
          <Link
            href="/portfolio"
            className="inline-flex items-center text-foreground hover:text-secondary transition-colors font-manrope text-sm font-medium mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            View Custom Creation Portfolio
          </Link>

          <div className="space-y-4 mt-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-tertiary text-background flex items-center justify-center font-manrope font-bold">
                  1
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-manrope text-base font-semibold text-foreground mb-2">
                  Message Us for a Quote
                </h4>
                <p className="font-manrope text-sm text-secondary/80 mb-2">
                  Send us your design inspirations so we can prepare a price quotation. Please include:
                </p>
                <ul className="list-disc list-inside font-manrope text-sm text-secondary/80 space-y-1 mb-3">
                  <li>Three (3) photo references of your desired design</li>
                  <li>Your event date and location</li>
                  <li>Your bust, waist, and height measurements</li>
                </ul>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/mysticalwardrobes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-manrope text-xs rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/MysticalWardrobes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 bg-blue-600 text-white font-manrope text-xs rounded-lg hover:bg-blue-700 transition-all"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-tertiary text-background flex items-center justify-center font-manrope font-bold">
                  2
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-manrope text-base font-semibold text-foreground mb-2">
                  Design Approval
                </h4>
                <p className="font-manrope text-sm text-secondary/80">
                  Once approved, only minor revisions are allowed.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-tertiary text-background flex items-center justify-center font-manrope font-bold">
                  3
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-manrope text-base font-semibold text-foreground mb-2">
                  Confirm Materials
                </h4>
                <p className="font-manrope text-sm text-secondary/80">
                  Final look depends on fabric availability; best alternatives will be offered if needed.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-tertiary text-background flex items-center justify-center font-manrope font-bold">
                  4
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-manrope text-base font-semibold text-foreground mb-2">
                  Book Your Slot
                </h4>
                <p className="font-manrope text-sm text-secondary/80">
                  1–3 months advance booking required (rush orders possible upon request).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-tertiary text-background flex items-center justify-center font-manrope font-bold">
                  5
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-manrope text-base font-semibold text-foreground mb-2">
                  Shipping
                </h4>
                <p className="font-manrope text-sm text-secondary/80">
                  Nationwide via Lalamove, LBC, or DHL.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Link */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <p className="font-manrope text-sm text-secondary/80 mb-4">
            By placing an order, paying a down payment, and/or approving a design, you agree to our terms and conditions.
          </p>
          <Link
            href="/custom-made-terms"
            className="inline-flex items-center text-secondary hover:text-foreground transition-colors font-manrope text-sm font-medium"
          >
            View Custom Made Terms & Conditions
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </FadeInOnScroll>
  );
}

