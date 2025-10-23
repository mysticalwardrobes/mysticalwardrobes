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
                  <h3 className="font-semibold text-foreground mb-2">Fitting Fees</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-foreground/20">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Fee Type</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Amount</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Initial Fitting Fee</td>
                          <td className="py-3 px-4">₱800</td>
                          <td className="py-3 px-4">₱300 staff assistance + ₱500 deductible from rental balance</td>
                        </tr>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Rescheduling Fee</td>
                          <td className="py-3 px-4">₱300</td>
                          <td className="py-3 px-4">Per rescheduled appointment</td>
                        </tr>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Time Extension</td>
                          <td className="py-3 px-4">₱300</td>
                          <td className="py-3 px-4">Up to 30 minutes extra (subject to availability)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Session Details</h3>
                  <p className="leading-relaxed">
                    Standard fitting time is 30 minutes. Only 3–4 gowns will be prepared per session.
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
                  <h3 className="font-semibold text-foreground mb-2">Extension & Late Return Fees</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-foreground/20">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Fee</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Conditions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Rental Extension</td>
                          <td className="py-3 px-4">₱1,000/day</td>
                          <td className="py-3 px-4">
                            <ul className="list-disc list-inside space-y-1">
                              <li>Request at least 3 days before event</li>
                              <li>Subject to availability</li>
                              <li>Maximum 3 days without prior approval</li>
                            </ul>
                          </td>
                        </tr>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Late Return Fee</td>
                          <td className="py-3 px-4">₱1,488/day</td>
                          <td className="py-3 px-4">
                            <ul className="list-disc list-inside space-y-1">
                              <li>No advance extension requested</li>
                              <li>Affects next client booking</li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Return Window (Metro Manila)</h3>
                  <p className="leading-relaxed">
                    The 8:00–9:00 AM time is the start of the return window for Metro Manila. Clients must book the courier back to our agreed return location so that we receive the gown early on the return day. If the item is not received as scheduled, the late return fee applies.
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
                  <h3 className="font-semibold text-foreground mb-2">Rescheduling & Changing Gown Fees</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-foreground/20">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Service</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Metro Manila</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Outside Metro Manila</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Rescheduling Fee</td>
                          <td className="py-3 px-4">₱2,000</td>
                          <td className="py-3 px-4">₱3,000</td>
                        </tr>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Changing Gown Fee</td>
                          <td className="py-3 px-4">₱2,000</td>
                          <td className="py-3 px-4">₱3,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="leading-relaxed mt-3 text-sm">
                    <strong>Note:</strong> Rescheduling is not available if decided just 2 days before scheduled delivery. Gown changes are subject to availability and once per booking only.
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
                  <h3 className="font-semibold text-foreground mb-2">Damage Fees</h3>
                  <p className="leading-relaxed mb-3">
                    Any damage to the gown, whether due to negligence or not, will be assessed upon return and may result in a fee:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-foreground/20">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Damage Level</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Fee Range</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Examples</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Minor Damage</td>
                          <td className="py-3 px-4">₱500 - ₱2,000</td>
                          <td className="py-3 px-4">Small tears, minor stains, few missing beads</td>
                        </tr>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Moderate Damage</td>
                          <td className="py-3 px-4">₱2,000 - ₱5,000</td>
                          <td className="py-3 px-4">Large tears, significant stains, zipper damage</td>
                        </tr>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Severe Damage</td>
                          <td className="py-3 px-4">Up to Full Replacement</td>
                          <td className="py-3 px-4">Irreparable damage, major structural issues</td>
                        </tr>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Lost/Stolen</td>
                          <td className="py-3 px-4">Full Replacement Cost</td>
                          <td className="py-3 px-4">Complete loss of gown</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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

