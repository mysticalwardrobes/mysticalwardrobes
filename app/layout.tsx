import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import Header from "@/components/header"
import Footer from "@/components/footer"
import "@/app/globals.css";

const vegawanty = localFont({
  src: [
    {
      path: '../public/fonts/Vegawanty.ttf',
      style: 'normal',
      weight: '400',
    },
  ],
  variable: '--font-vegawanty',
  display: 'swap',
});

const elagern = localFont({
  src: [
    {
      path: '../public/fonts/ElagernItalic-lgmXw.ttf',
      style: 'italic',
      weight: '400',
    },
  ],
  variable: '--font-elagern',
  display: 'swap',
});

const manrope = localFont({
  src: [
    {
      path: '../public/fonts/Manrope-VariableFont_wght.ttf',
      style: 'normal',
    },
  ],
  variable: '--font-manrope',
  display: 'swap',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mystical Wardrobes - Where Fairytales Come to Life",
  description: "Discover enchanting gowns and accessories for your special moments. Rental gowns, custom-made designs, and mystical accessories. Premium formal wear for prom, weddings, and special events.",
  keywords: "gown rental, custom gowns, prom dresses, formal wear, mystical wardrobes, fairy tale dresses, wedding gowns, evening wear, special occasion dresses, formal accessories",
  authors: [{ name: "Mystical Wardrobes" }],
  creator: "Mystical Wardrobes",
  publisher: "Mystical Wardrobes",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mysticalwardrobes.com',
    title: 'Mystical Wardrobes - Where Fairytales Come to Life',
    description: 'Discover enchanting gowns and accessories for your special moments. Rental gowns, custom-made designs, and mystical accessories.',
    siteName: 'Mystical Wardrobes',
    images: [
      {
        url: '/assets/CoverPhoto.webp',
        width: 1200,
        height: 630,
        alt: 'Mystical Wardrobes - Enchanting Gowns and Accessories',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mystical Wardrobes - Where Fairytales Come to Life',
    description: 'Discover enchanting gowns and accessories for your special moments.',
    images: ['/assets/CoverPhoto.webp'],
  },
  verification: {
    google: 'x5fGpv6CrB1REo_zH1VEn1uWid6MVNtWmdjwkN-10Es',
    yandex: '4eb797e089586d4e',
  },
  alternates: {
    canonical: 'https://mysticalwardrobes.com',
  },
  icons: {
    icon: '/Icon.png',
    shortcut: '/Icon.png',
    apple: '/Icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Mystical Wardrobes",
              "description": "Where Fairytales Come to Life - Discover enchanting gowns and accessories for your special moments. Rental gowns, custom-made designs, and mystical accessories.",
              "url": "https://mysticalwardrobes.com",
              "logo": "https://mysticalwardrobes.com/assets/Mystical-Wardrobes-Logo-02.svg",
              "image": "https://mysticalwardrobes.com/assets/CoverPhoto.webp",
              "telephone": "+1-XXX-XXX-XXXX",
              "email": "info@mysticalwardrobes.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Your City",
                "addressRegion": "Your State",
                "postalCode": "XXXXX",
                "addressCountry": "US"
              },
              "openingHours": [
                "Mo-Fr 09:00-18:00",
                "Sa 10:00-16:00"
              ],
              "priceRange": "$$",
              "paymentAccepted": "Cash, Credit Card, PayPal",
              "currenciesAccepted": "USD",
              "areaServed": {
                "@type": "Country",
                "name": "United States"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Gown Collections",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Rental Gowns",
                      "description": "Beautiful gowns available for rent for special occasions"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Custom Made Gowns",
                      "description": "Bespoke gowns designed and created specifically for you"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Accessories",
                      "description": "Crowns, gloves, fans, and other mystical accessories"
                    }
                  }
                ]
              },
              "sameAs": [
                "https://www.facebook.com/mysticalwardrobes",
                "https://www.instagram.com/mysticalwardrobes",
                "https://www.pinterest.com/mysticalwardrobes"
              ],
              "foundingDate": "2020",
              "numberOfEmployees": "1-10",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "50"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vegawanty.variable} ${elagern.variable} ${manrope.variable} font-sans antialiased`}
      >
        <Header/>
        {children}
        <Footer/>
        <Analytics />
        <SpeedInsights/>
      </body>
    </html>
  );
}
