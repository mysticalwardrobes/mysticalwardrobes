"use client";

import FadeInOnScroll from "@/components/FadeInOnScroll";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <main className="bg-background py-10 md:py-16">
      <div className="mx-auto max-w-5xl px-6 md:px-16">
        <FadeInOnScroll delay={0.1}>
          <header className="mb-12 text-center">
            <p className="font-manrope text-sm text-secondary/80">
              Last Updated: November 14, 2025
            </p>
            <h1 className="mt-3 font-vegawanty text-4xl text-foreground md:text-6xl">
              Terms of Service
            </h1>
            <p className="mx-auto mt-5 max-w-3xl font-manrope text-sm text-secondary/80 md:text-base">
              Please read these Terms of Service carefully before using our website and services. By accessing or using Mystical Wardrobes, you agree to be bound by these terms.
            </p>
          </header>
        </FadeInOnScroll>

        <div className="space-y-8 font-manrope leading-relaxed text-secondary/80">
          <FadeInOnScroll delay={0.15}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="mb-4">
                By accessing and using the Mystical Wardrobes website and services, you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
              </p>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.2}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                2. Services
              </h2>
              <p className="mb-4">
                Mystical Wardrobes provides:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Gown rental services for special events</li>
                <li>Custom-made gown design and creation services</li>
                <li>Fitting appointments and consultations</li>
                <li>Accessories and add-ons for gowns</li>
              </ul>
              <p className="mt-4">
                For specific terms related to rentals, please see our <Link href="/rental-terms" className="text-secondary hover:underline">Rental Terms</Link>. For custom-made gowns, please see our <Link href="/custom-made-terms" className="text-secondary hover:underline">Made-to-Own Terms</Link>.
              </p>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.25}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                3. User Responsibilities
              </h2>
              <p className="mb-4">
                You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information when making bookings or orders</li>
                <li>Use our services only for lawful purposes</li>
                <li>Respect the intellectual property rights of Mystical Wardrobes</li>
                <li>Not damage, misuse, or attempt to gain unauthorized access to our website or services</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.3}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                4. Booking and Appointments
              </h2>
              <p className="mb-4">
                All bookings and appointments are subject to availability. We recommend booking in advance, especially for peak seasons. Walk-ins are not guaranteed immediate service.
              </p>
              <p className="mb-4">
                Cancellation and rescheduling policies apply as outlined in our specific service terms. For gown rentals, if the event is canceled or rescheduled, Mystical Wardrobes is not liable for resulting losses and no refund will be issued for booked gowns.
              </p>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.35}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                5. Pricing and Payment
              </h2>
              <p className="mb-4">
                All prices are listed in Philippine Peso (₱) and are subject to change without notice. Payment terms vary by service type:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Rentals: Payment required as specified in Rental Terms</li>
                <li>Custom-made gowns: Down payment required, with balance due as specified in Made-to-Own Terms</li>
              </ul>
              <p className="mt-4">
                We accept various payment methods as communicated during booking.
              </p>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.4}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                6. Intellectual Property
              </h2>
              <p className="mb-4">
                All content on this website, including designs, images, text, logos, and graphics, is the property of Mystical Wardrobes or its licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or use our content without written permission.
              </p>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.45}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                7. Limitation of Liability
              </h2>
              <p className="mb-4">
                To the maximum extent permitted by law, Mystical Wardrobes shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.
              </p>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.5}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                8. Indemnification
              </h2>
              <p className="mb-4">
                You agree to indemnify and hold harmless Mystical Wardrobes, its owners, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of our services or violation of these terms.
              </p>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.55}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                9. Modifications to Terms
              </h2>
              <p className="mb-4">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.
              </p>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.6}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                10. Governing Law
              </h2>
              <p className="mb-4">
                These Terms of Service are governed by and construed in accordance with the laws of the Philippines. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts of Metro Manila, Philippines.
              </p>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.65}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                11. Contact Information
              </h2>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> <a href="mailto:mysticalwardrobes01@gmail.com" className="text-secondary hover:underline">mysticalwardrobes01@gmail.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+639762774888" className="text-secondary hover:underline">(+63) 976 277 4888</a></p>
                <p><strong>Address:</strong> Malabon City, Metro Manila, Philippines</p>
              </div>
            </section>
          </FadeInOnScroll>
        </div>
      </div>
    </main>
  );
}

