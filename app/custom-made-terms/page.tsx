"use client";

import FadeInOnScroll from "@/components/FadeInOnScroll";

export default function CustomMadeTermsPage() {
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
              Made-to-Own Terms
            </h1>
            <p className="mx-auto mt-5 max-w-2xl font-manrope text-sm text-secondary/80 md:text-base">
              Please read these terms carefully before ordering a custom-made gown from Mystical Wardrobes.
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
                Mystical Wardrobes is a gown rental and custom gown service based in Malabon City, Philippines. By ordering a custom-made gown with us, you agree to the following terms and conditions.
              </p>
              <p className="text-secondary/80 leading-relaxed">
                These terms were last updated on <strong>October 15, 2025</strong> and may be updated at any time without prior notice. The latest version will always be posted on our website.
              </p>
            </section>
          </FadeInOnScroll>

          {/* Orders & Design */}
          <FadeInOnScroll delay={0.2}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                1. Orders & Design
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Design Consultation</h3>
                  <p className="leading-relaxed">
                    All custom orders begin with a design consultation where we discuss your vision, measurements, fabric preferences, and timeline.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Design Approval</h3>
                  <p className="leading-relaxed">
                    Once a design is finalized and approved, any changes requested after production begins may incur additional fees.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Inspiration vs. Exact Replication</h3>
                  <p className="leading-relaxed">
                    We create custom pieces inspired by your references. We do not replicate designer pieces exactly but instead interpret designs with our own craftsmanship and available materials.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Design Ownership</h3>
                  <p className="leading-relaxed">
                    All custom designs created by Mystical Wardrobes remain the intellectual property of Mystical Wardrobes. We reserve the right to recreate or reuse design elements for future projects.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Pricing Table */}
          <FadeInOnScroll delay={0.25}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                Pricing Guide
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-foreground/20">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Category</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Starting Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-foreground/10">
                      <td className="py-3 px-4">Simple Gown</td>
                      <td className="py-3 px-4">₱8,000</td>
                      <td className="py-3 px-4">Basic silhouette, minimal embellishment</td>
                    </tr>
                    <tr className="border-b border-foreground/10">
                      <td className="py-3 px-4">Standard Gown</td>
                      <td className="py-3 px-4">₱12,000</td>
                      <td className="py-3 px-4">Moderate detailing, standard fabrics</td>
                    </tr>
                    <tr className="border-b border-foreground/10">
                      <td className="py-3 px-4">Premium Gown</td>
                      <td className="py-3 px-4">₱18,000+</td>
                      <td className="py-3 px-4">Complex design, premium fabrics, extensive embellishment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-secondary/80 mt-4 italic">
                * Final pricing depends on design complexity, fabric choice, embellishments, and timeline. A detailed quote will be provided after consultation.
              </p>
            </section>
          </FadeInOnScroll>

          {/* Fabrics & Materials */}
          <FadeInOnScroll delay={0.3}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                2. Fabrics & Materials
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Fabric Selection</h3>
                  <p className="leading-relaxed">
                    We will present fabric options during your consultation. Availability of specific fabrics may vary depending on suppliers.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Client-Provided Materials</h3>
                  <p className="leading-relaxed">
                    If you wish to provide your own fabric or embellishments, please coordinate with us beforehand. We are not responsible for defects in client-provided materials.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Fabric Substitutions</h3>
                  <p className="leading-relaxed">
                    If a chosen fabric becomes unavailable, we will offer the closest alternative and inform you before proceeding. Additional costs may apply.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Natural Variations</h3>
                  <p className="leading-relaxed">
                    Natural fabrics may have slight variations in color, texture, or pattern. These are considered normal and not defects.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Booking & Timelines */}
          <FadeInOnScroll delay={0.35}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                3. Booking & Timelines
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Production Timeline & Rush Fees</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-foreground/20">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Timeline</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Production Time</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Rush Fee</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Standard Order</td>
                          <td className="py-3 px-4">6-8 weeks</td>
                          <td className="py-3 px-4">None</td>
                        </tr>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Rush Order (&lt;6 weeks)</td>
                          <td className="py-3 px-4">4-6 weeks</td>
                          <td className="py-3 px-4">20-30% of total cost</td>
                        </tr>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Recommended Booking</td>
                          <td className="py-3 px-4">3+ months before event</td>
                          <td className="py-3 px-4">None</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="leading-relaxed mt-3 text-sm">
                    <strong>Note:</strong> Timeline starts from the date of final design approval and down-payment. Rush orders are subject to availability.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Timeline Delays</h3>
                  <p className="leading-relaxed">
                    While we strive to meet all deadlines, unforeseen circumstances (fabric delays, supplier issues, etc.) may affect production time. We will communicate any delays promptly.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Payment & Confirmation */}
          <FadeInOnScroll delay={0.4}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                4. Payment & Confirmation
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Payment Schedule</h3>
                  <p className="leading-relaxed mb-3">
                    A non-refundable down-payment of 50% is required to confirm your order and begin production.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-foreground/20">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Payment Stage</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Percentage</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Timing</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Down-Payment</td>
                          <td className="py-3 px-4">50%</td>
                          <td className="py-3 px-4">Upon order confirmation (non-refundable)</td>
                        </tr>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Second Payment</td>
                          <td className="py-3 px-4">30%</td>
                          <td className="py-3 px-4">Upon completion of first fitting</td>
                        </tr>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Final Payment</td>
                          <td className="py-3 px-4">20%</td>
                          <td className="py-3 px-4">Before pickup or delivery</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Payment Methods</h3>
                  <p className="leading-relaxed">
                    We accept GCash, bank transfer, or in-studio cash payments.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Price Adjustments</h3>
                  <p className="leading-relaxed">
                    The final price may be adjusted if you request significant design changes, upgrade fabrics, or add embellishments after the initial quote.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Shipping & Delivery */}
          <FadeInOnScroll delay={0.45}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                5. Shipping & Delivery
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Pickup</h3>
                  <p className="leading-relaxed">
                    Gowns can be picked up at our studio in Malabon City. Please schedule your pickup appointment in advance.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Delivery</h3>
                  <p className="leading-relaxed">
                    Delivery is available within Metro Manila and provincial areas. The client shoulders all shipping fees.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Shipping Insurance</h3>
                  <p className="leading-relaxed">
                    We recommend insuring your shipment. Mystical Wardrobes is not liable for damage or loss during shipping.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Cancellations & Changes */}
          <FadeInOnScroll delay={0.5}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                6. Cancellations & Changes
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Cancellation Policy</h3>
                  <p className="leading-relaxed">
                    Because custom gowns are made specifically for you, <strong>cancellations are not permitted once production has begun</strong>. Your down-payment is non-refundable.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Design Changes</h3>
                  <p className="leading-relaxed">
                    Minor design changes may be accommodated before production begins. Once production has started, changes may incur additional fees and extend the timeline.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Major Alterations</h3>
                  <p className="leading-relaxed">
                    Major design overhauls after production has begun are not permitted. The client will be responsible for the full payment of the original design.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Ownership & Usage */}
          <FadeInOnScroll delay={0.55}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                7. Ownership & Usage
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Full Ownership</h3>
                  <p className="leading-relaxed">
                    Upon full payment, the gown becomes your property. You may wear it, alter it, or resell it as you wish.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Portfolio Use</h3>
                  <p className="leading-relaxed">
                    We reserve the right to photograph your gown and use images for our portfolio, social media, and promotional materials unless you explicitly request otherwise.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Design Rights</h3>
                  <p className="leading-relaxed">
                    While you own the physical gown, Mystical Wardrobes retains the rights to the design concept and may create similar pieces for other clients.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Sizing & Alterations */}
          <FadeInOnScroll delay={0.6}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                8. Sizing & Alterations
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Measurements</h3>
                  <p className="leading-relaxed">
                    Accurate measurements are crucial. We will take your measurements during consultation. If measurements are provided remotely, the client is responsible for accuracy.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Fittings & Alterations</h3>
                  <p className="leading-relaxed mb-3">
                    We typically schedule 1-2 fittings during production. Additional fittings may be arranged if needed.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-foreground/20">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Alteration Type</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Cost</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Minor Alterations</td>
                          <td className="py-3 px-4">Included</td>
                          <td className="py-3 px-4">Hemming, taking in/out within 2 inches during production</td>
                        </tr>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Standard Fittings</td>
                          <td className="py-3 px-4">Included</td>
                          <td className="py-3 px-4">1-2 fittings during production phase</td>
                        </tr>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Post-Delivery Alterations</td>
                          <td className="py-3 px-4">Additional Fee</td>
                          <td className="py-3 px-4">Alterations requested after final delivery</td>
                        </tr>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4">Major Body Changes</td>
                          <td className="py-3 px-4">Additional Fee</td>
                          <td className="py-3 px-4">Significant weight changes requiring extensive alterations</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="leading-relaxed mt-3 text-sm">
                    <strong>Note:</strong> We are not responsible for alterations done by third parties.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Client Responsibilities */}
          <FadeInOnScroll delay={0.65}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                9. Client Responsibilities
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Timely Communication</h3>
                  <p className="leading-relaxed">
                    Clients must respond promptly to design approvals, fitting schedules, and payment requests to avoid delays.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Attending Fittings</h3>
                  <p className="leading-relaxed">
                    Clients must attend scheduled fittings. Missed appointments may delay production and could incur rescheduling fees.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Honest Feedback</h3>
                  <p className="leading-relaxed">
                    Please provide honest feedback during fittings. Once you approve a fitting, further changes may not be possible.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Quality & Craftsmanship */}
          <FadeInOnScroll delay={0.7}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                10. Quality & Craftsmanship
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Handmade Quality</h3>
                  <p className="leading-relaxed">
                    Each gown is handmade with care. Minor variations are natural in handcrafted items and are not considered defects.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Quality Assurance</h3>
                  <p className="leading-relaxed">
                    We inspect all gowns before delivery. If you notice any manufacturing defects upon receipt, please notify us within 48 hours.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Defect Resolution</h3>
                  <p className="leading-relaxed">
                    Legitimate manufacturing defects will be repaired at no charge. Normal wear and tear, damage from misuse, or alterations by third parties are not covered.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Liability Disclaimer */}
          <FadeInOnScroll delay={0.75}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                11. Liability Disclaimer
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Fit & Comfort</h3>
                  <p className="leading-relaxed">
                    While we strive for perfect fit, we cannot guarantee absolute comfort for extended wear. Gowns should be tried on and approved during fittings.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Personal Injury</h3>
                  <p className="leading-relaxed">
                    Mystical Wardrobes is not responsible for any injuries, accidents, or incidents that occur while wearing our gowns.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Photography & Events</h3>
                  <p className="leading-relaxed">
                    We are not responsible for how the gown appears in photographs or under specific event lighting conditions.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Privacy & Communication */}
          <FadeInOnScroll delay={0.8}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                12. Privacy & Communication
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                  <p className="leading-relaxed">
                    We collect your measurements, contact information, and design preferences solely to create your gown. This information will not be shared with third parties.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Preferred Communication</h3>
                  <p className="leading-relaxed">
                    All communications regarding your order will be conducted via your preferred method (email, phone, or messaging app).
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Governing Law */}
          <FadeInOnScroll delay={0.85}>
            <section className="bg-white/95 rounded-lg shadow-md p-6 md:p-8 border border-foreground/10">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                13. Governing Law & Dispute Resolution
              </h2>
              <div className="space-y-4 text-secondary/80">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Applicable Law</h3>
                  <p className="leading-relaxed">
                    These terms are governed by the laws of the Philippines.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Dispute Resolution</h3>
                  <p className="leading-relaxed">
                    Any disputes will first be addressed through good-faith negotiation. If unresolved, disputes will be handled according to Philippine law.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* Contact */}
          <FadeInOnScroll delay={0.9}>
            <section className="mt-16 text-center border-t border-foreground/10 pt-12">
              <h3 className="font-vegawanty text-2xl text-foreground mb-3">
                Ready to Create Your Dream Gown?
              </h3>
              <p className="font-manrope text-sm md:text-base text-secondary/80 mb-6">
                If you have any questions about our custom-made services or would like to schedule a design consultation, please contact us.
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

