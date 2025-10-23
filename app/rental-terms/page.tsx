"use client";

import FadeInOnScroll from "@/components/FadeInOnScroll";

export default function RentalTermsPage() {
  return (
    <main className="bg-background py-10 md:py-16">
      <div className="mx-auto max-w-5xl px-6 md:px-16">
        {/* Header */}
        <FadeInOnScroll delay={0.1}>
          <header className="mb-12 text-center">
            <p className="font-manrope text-xs uppercase tracking-[0.4em] text-secondary">
              Legal Information
            </p>
            <h1 className="mt-3 font-vegawanty text-4xl text-foreground md:text-6xl">
              Rental Terms & Conditions
            </h1>
            <p className="mx-auto mt-5 max-w-2xl font-manrope text-sm text-secondary/80 md:text-base">
              Please read these terms carefully before renting a gown from Mystical Wardrobes.
            </p>
          </header>
        </FadeInOnScroll>

        {/* Terms Content */}
        <div className="space-y-8 font-manrope">
          
          {/* Introduction */}
          <FadeInOnScroll delay={0.15}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                Welcome to Mystical Wardrobes
              </h2>
              <p className="text-secondary/80 leading-relaxed mb-4">
                Mystical Wardrobes is a gown rental service based in Malabon City, Philippines. By booking a gown with us, you agree to the following terms and conditions.
              </p>
              <p className="text-secondary/80 leading-relaxed">
                These terms were last updated on <strong>October 15, 2025</strong> and may be updated at any time without prior notice. The latest version will always be posted on our website.
              </p>
            </section>
          </FadeInOnScroll>

          {/* Booking & Payment */}
          <FadeInOnScroll delay={0.2}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                Booking & Payment
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Confirmation of Booking</h3>
                  <p className="leading-relaxed">
                    A booking is confirmed only after a 50% or stated down-payment is received. All fees must be settled before the gown is dispatched or a fitting is scheduled.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Payment Methods</h3>
                  <p className="leading-relaxed">
                    We accept GCash, bank transfer, or in-studio cash.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Security Deposit</h3>
                  <p className="leading-relaxed">
                    We do not collect security deposits. All fees must be settled before the gown is dispatched or a fitting is scheduled.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Final Balance</h3>
                  <p className="leading-relaxed">
                    The remaining balance must be settled at least one week before the delivery date. If your event is less than one week away when you make a down-payment, you must pay the full amount immediately.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Rush Rental Fee</h3>
                  <p className="leading-relaxed">
                    Bookings placed less than 24 hours before ship-out incur a <strong>₱500 rush fee</strong>.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Fitting Appointments */}
          <FadeInOnScroll delay={0.25}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                Fitting Appointments
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Fitting Fee</h3>
                  <p className="leading-relaxed">
                    There is a fitting fee of <strong>₱800</strong>, which includes ₱300 for staff assistance and ₱500 which is deductible from your rental balance. This fee is non-refundable for any missed appointments.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Rescheduling</h3>
                  <p className="leading-relaxed">
                    A <strong>₱300 fee</strong> is payable each time a fitting slot is moved.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Session Duration</h3>
                  <p className="leading-relaxed">
                    Standard fitting time is 30 minutes. An extension of up to 30 minutes may be allowed if there is no next client booked after your slot, for a ₱300 extension fee.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Number of Gowns</h3>
                  <p className="leading-relaxed">
                    Only 3–4 gowns will be prepared per session.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Availability</h3>
                  <p className="leading-relaxed">
                    Gown availability is not guaranteed, as some pieces may be booked online at the same time. Real-time availability updates are provided only if you inquire directly.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Rental Period & Shipping */}
          <FadeInOnScroll delay={0.3}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                Rental Period & Shipping
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Rental Period</h3>
                  <p className="leading-relaxed">
                    The rental period starts on the day we ship out the gown. Courier working days exclude Sundays and holidays.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Shipping Fees</h3>
                  <p className="leading-relaxed">
                    The client shoulders all shipping fees.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Delays & Disruptions</h3>
                  <p className="leading-relaxed">
                    We are not liable for delays, weather disruptions, or courier issues, but we will assist in coordinating if needed.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Extension & Late Return */}
          <FadeInOnScroll delay={0.35}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                Extension & Late Return
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Rental Extension</h3>
                  <p className="leading-relaxed">
                    If you need more time with the gown beyond your original return date, you can ask in advance to extend your rental. If approved, the cost is <strong>₱1,000 per extra day</strong>. You should message us at least 3 days before your event to check if the gown isn't booked for the next client.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Late Return Fee</h3>
                  <p className="leading-relaxed">
                    A late return fee of <strong>₱1,488 per day</strong> will be charged when no extension was requested in advance. This higher fee exists because late returns directly affect our ability to prepare the gown for the next client and cause a measurable loss of income.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Return Window (Metro Manila)</h3>
                  <p className="leading-relaxed">
                    The 8:00–9:00 AM time is the start of the return window for Metro Manila. Clients must book the courier back to our agreed return location so that we receive the gown early on the return day. If the item is not received as scheduled, the late return fee applies.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Maximum Extension</h3>
                  <p className="leading-relaxed">
                    Rentals cannot be extended beyond 3 days without prior approval.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Non-Return Policy</h3>
                  <p className="leading-relaxed">
                    Failure to return the gown within 9 days from your scheduled return date will be treated as non-returned and may result in legal recovery procedures.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Cancellations & Changes */}
          <FadeInOnScroll delay={0.4}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                Cancellations & Changes
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Cancellation Policy</h3>
                  <p className="leading-relaxed">
                    If you cancel a rental, the gown was reserved exclusively for your date, and since we don't charge a security deposit, the remaining balance must be settled. Down-payments are non-refundable.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Store Credit Option</h3>
                  <p className="leading-relaxed">
                    In case of unavoidable cancellations, clients may request store credit instead of paying the full balance. Store credits are valid for one month and may be applied to any future rental within six months from the date of issuance. Store credit may only be granted once. If a client uses the store credit to rebook and later cancels again, the standard cancellation policy will be enforced.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Rescheduling Fee</h3>
                  <p className="leading-relaxed">
                    A rescheduling fee applies: <strong>Metro Manila: ₱2,000</strong>; <strong>Outside Metro Manila: ₱3,000</strong>. This applies even if the event is canceled, as your original slot was already reserved. This option is not available if you decide just 2 days before your scheduled delivery.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Changing Gowns</h3>
                  <p className="leading-relaxed">
                    You can change your gown once per booking, subject to availability. If the new gown's rate is higher, the difference must be paid; if lower, no refunds are issued. A changing of gown fee applies: <strong>Metro Manila: ₱2,000</strong>; <strong>Outside Metro Manila: ₱3,000</strong>.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Damage & Loss Policy */}
          <FadeInOnScroll delay={0.45}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                Damage & Loss Policy
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Damage Assessment</h3>
                  <p className="leading-relaxed">
                    Any damage to the gown, whether due to negligence or not, will be assessed upon return and may result in a fee. Fees vary depending on the severity of the damage:
                  </p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Minor damage: ₱500 - ₱2,000</li>
                    <li>Moderate damage: ₱2,000 - ₱5,000</li>
                    <li>Severe damage: Up to full replacement value</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Lost or Irreparably Damaged Gowns</h3>
                  <p className="leading-relaxed">
                    If the gown is lost, stolen, or damaged beyond repair, you will be charged the full replacement cost of a new, comparable gown, as determined by Mystical Wardrobes.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Ownership</h3>
                  <p className="leading-relaxed">
                    The payment for a lost or irreparably damaged item is a replacement cost and does not transfer ownership of the item to the client. The gown remains the property of Mystical Wardrobes.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Prohibited Uses</h3>
                  <p className="leading-relaxed">
                    The following are strictly prohibited and will be treated as damage:
                  </p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Alterations (sewing, cutting, modifying)</li>
                    <li>Wet photoshoots or activities involving liquids</li>
                    <li>Any other alterations or modifications</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Accessories & Packaging</h3>
                  <p className="leading-relaxed">
                    Accessories, hangers, garment bags, or other items provided with the gown must be returned in the same condition. Missing items will incur replacement charges.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Care & Responsibility */}
          <FadeInOnScroll delay={0.5}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                Care & Responsibility
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Cleaning</h3>
                  <p className="leading-relaxed">
                    Mystical Wardrobes handles all gown cleaning before and after use; this is included in your rental fee. Clients must not clean, spot-treat, or apply any detergents or chemicals to the gown. If a stain occurs, please return the gown as is.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Client Responsibility</h3>
                  <p className="leading-relaxed">
                    Upon delivery, you are fully responsible for the product. Please treat it with great care. You are liable for loss, destruction, or damage due to theft, mysterious disappearance, fire, major stains, or any other cause, other than normal wear and tear.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Normal Wear and Tear</h3>
                  <p className="leading-relaxed">
                    Normal wear and tear (minor stains, rips, missing beads from previous uses) will not be shouldered by the present renter.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Rental Duration & Pricing */}
          <FadeInOnScroll delay={0.55}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                Rental Duration & Pricing
              </h2>
              <div className="space-y-4 text-secondary/80">
                <p className="leading-relaxed">
                  Our standard rental rates are designed to provide you with exceptional value:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-foreground/20">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Duration</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Rate</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-foreground/10">
                        <td className="py-3 px-4">3 Days</td>
                        <td className="py-3 px-4">Standard Rate</td>
                        <td className="py-3 px-4">Perfect for most events</td>
                      </tr>
                      <tr className="border-b border-foreground/10">
                        <td className="py-3 px-4">7 Days</td>
                        <td className="py-3 px-4">+25% from Standard</td>
                        <td className="py-3 px-4">Extended rental period</td>
                      </tr>
                      <tr className="border-b border-foreground/10">
                        <td className="py-3 px-4">1 Month</td>
                        <td className="py-3 px-4">+50% from Standard</td>
                        <td className="py-3 px-4">Long-term rental option</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Additional Policies */}
          <FadeInOnScroll delay={0.6}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                Additional Policies
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Liability Limitation</h3>
                  <p className="leading-relaxed">
                    Mystical Wardrobes is not responsible for any injuries, accidents, or incidents that occur while wearing our gowns. Clients are responsible for their own safety and the safety of others.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Force Majeure</h3>
                  <p className="leading-relaxed">
                    We are not liable for delays or inability to perform due to circumstances beyond our control, including but not limited to natural disasters, pandemics, government restrictions, or other force majeure events.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Disputes</h3>
                  <p className="leading-relaxed">
                    Any disputes arising from these terms will be resolved through good-faith negotiation. If a resolution cannot be reached, the matter will be handled according to the laws of the Philippines.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Contact */}
          <FadeInOnScroll delay={0.65}>
            <section className="mt-16 text-center border-t border-foreground/10 pt-12">
              <h3 className="font-vegawanty text-2xl text-foreground mb-3">
                Questions About Our Terms?
              </h3>
              <p className="font-manrope text-sm md:text-base text-secondary/80 mb-6">
                If you have any questions or need clarification on our rental terms, please don't hesitate to contact us.
              </p>
              <a
                href="/contact"
                className="inline-block font-manrope text-sm md:text-base bg-secondary text-background hover:bg-foreground border-2 border-secondary hover:border-foreground rounded px-6 py-3 transition-colors duration-300"
              >
                Contact Us
              </a>
            </section>
          </FadeInOnScroll>
        </div>
      </div>
    </main>
  );
}

