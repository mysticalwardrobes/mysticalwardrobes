import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

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
  title: "Mystical Wardrobes",
  description: "Where Fairytales Come to Life - Discover enchanting gowns and accessories for your special moments. Rental gowns, custom-made designs, and mystical accessories.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vegawanty.variable} ${elagern.variable} ${manrope.variable} font-sans antialiased`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
