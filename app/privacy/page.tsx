"use client";

import FadeInOnScroll from "@/components/FadeInOnScroll";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-background py-10 md:py-16">
      <div className="mx-auto max-w-5xl px-6 md:px-16">
        <FadeInOnScroll delay={0.1}>
          <header className="mb-12 text-center">
            <p className="font-manrope text-sm text-secondary/80">
              Last Updated: November 14, 2025
            </p>
            <h1 className="mt-3 font-vegawanty text-4xl text-foreground md:text-6xl">
              Privacy Policy
            </h1>
            <p className="mx-auto mt-5 max-w-3xl font-manrope text-sm text-secondary/80 md:text-base">
              At Mystical Wardrobes, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and services.
            </p>
          </header>
        </FadeInOnScroll>

        <div className="space-y-8 font-manrope leading-relaxed text-secondary/80">
          <FadeInOnScroll delay={0.15}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                1. Information We Collect
              </h2>
              <p className="mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name and contact information (email, phone number)</li>
                <li>Social media profile links</li>
                <li>Measurement details for gown fittings</li>
                <li>Payment information (processed securely through third-party payment processors)</li>
                <li>Communication preferences and messages you send to us</li>
              </ul>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.2}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                2. How We Use Your Information
              </h2>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process and fulfill your gown rental or custom order requests</li>
                <li>Schedule and manage fitting appointments</li>
                <li>Communicate with you about your orders, appointments, and inquiries</li>
                <li>Send you updates about our services, promotions, and new collections (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.25}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                3. Information Sharing
              </h2>
              <p className="mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>With service providers who assist us in operating our website and conducting our business (e.g., payment processors, shipping companies)</li>
                <li>When required by law or to protect our rights and safety</li>
                <li>With your explicit consent</li>
              </ul>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.3}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                4. Data Security
              </h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.35}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                5. Your Rights
              </h2>
              <p className="mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and receive a copy of your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at <a href="mailto:mysticalwardrobes01@gmail.com" className="text-secondary hover:underline">mysticalwardrobes01@gmail.com</a>.
              </p>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.4}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                6. Cookies and Tracking
              </h2>
              <p className="mb-4">
                Our website may use cookies and similar tracking technologies to enhance your experience, analyze usage, and assist with marketing efforts. You can control cookie preferences through your browser settings.
              </p>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.45}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                7. Children's Privacy
              </h2>
              <p className="mb-4">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
              </p>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.5}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                8. Changes to This Policy
              </h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.55}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                9. Contact Us
              </h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us:
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

