"use client";

import FadeInOnScroll from "@/components/FadeInOnScroll";

export default function CustomMadeTermsPage() {
  return (
    <main className="bg-background py-10 md:py-16">
      <div className="mx-auto max-w-5xl px-6 md:px-16">
        <FadeInOnScroll delay={0.1}>
          <header className="mb-12 text-center">
            <p className="font-manrope text-xs uppercase tracking-[0.4em] text-secondary">
              Legal Information
            </p>
            <h1 className="mt-3 font-vegawanty text-4xl text-foreground md:text-6xl">
              Made-to-Own Terms
            </h1>
            <p className="mx-auto mt-5 max-w-3xl font-manrope text-sm text-secondary/80 md:text-base">
              These terms apply to all Made-to-Own (pre-designed "To-Own Collection" and Custom Creations) gown orders.
            </p>
          </header>
        </FadeInOnScroll>

        <div className="space-y-8 font-manrope">
          <FadeInOnScroll delay={0.15}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <div className="space-y-4 text-secondary/80 leading-relaxed">
                <p>
                  Please note that purchases are not made through a direct "click-to-buy" process on our website. All orders are coordinated personally through our official Mystical Wardrobes accounts on Instagram or Facebook, where our customer service team will assist you, confirm details, and provide major updates regarding your order's progress.
                </p>
                <p>
                  Our website serves primarily as a catalogue and pricing reference for transparency. Official bookings, payments, and order updates are handled exclusively through our direct communication channels on Instagram or Facebook.
                </p>
                <p>
                  By placing an order, paying a down payment, and/or approving a design, the client ("You") agrees to the terms below.
                </p>
              </div>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.2}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                1. Orders &amp; Design
              </h2>
              <div className="space-y-4 text-secondary/80 leading-relaxed">
                <h3 className="font-semibold text-foreground">Summary Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-foreground/20">
                        <th className="py-3 px-4 text-left font-semibold text-foreground">Aspect</th>
                        <th className="py-3 px-4 text-left font-semibold text-foreground">To-Own Collection</th>
                        <th className="py-3 px-4 text-left font-semibold text-foreground">Custom Creations</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-foreground/10">
                        <td className="py-3 px-4 font-semibold text-foreground align-top">What it is</td>
                        <td className="py-3 px-4 align-top">
                          Choose from existing MW designs; each gown is newly crafted per order (fabric availability may lead to minor variations).
                        </td>
                        <td className="py-3 px-4 align-top">
                          Bespoke design based on your mood boards, photos, theme, and event details.
                        </td>
                      </tr>
                      <tr className="border-b border-foreground/10">
                        <td className="py-3 px-4 font-semibold text-foreground align-top">Revisions</td>
                        <td className="py-3 px-4 align-top">Minor size adjustments only.</td>
                        <td className="py-3 px-4 align-top">
                          One finalized concept; minor tweaks after approval; major changes = new order &amp; new fees.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-foreground align-top">Output</td>
                        <td className="py-3 px-4 align-top">
                          A new piece following the chosen design (crafted as close as possible to the original style).
                        </td>
                        <td className="py-3 px-4 align-top">
                          A unique design produced for you per agreed concept.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.25}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                2. Fabrics &amp; Materials
              </h2>
              <div className="space-y-4 text-secondary/80 leading-relaxed">
                <p>
                  For Made-to-Own gowns, certain fabrics, trims, or embellishments may occasionally become unavailable due to limited stock or supplier changes. In such cases, Mystical Wardrobes will source the closest possible alternative that preserves the approved silhouette, structure, and overall design of the gown. As each piece is handcrafted and materials are individually sourced, slight variations in shade, texture, or embellishments may naturally occur, but every gown will remain closer to the approved look and quality standard.
                </p>
                <p>
                  Minor variations in fabric type, lace patterns, or embellishment details may occur, but the final piece will uphold the same design direction and craftsmanship quality approved by the client.
                </p>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Material Variation Guide</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-foreground/20">
                          <th className="py-3 px-4 text-left font-semibold text-foreground">Item</th>
                          <th className="py-3 px-4 text-left font-semibold text-foreground">What to Expect</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4 align-top">Color/Tone</td>
                          <td className="py-3 px-4 align-top">
                            Dye lots and lighting can cause subtle differences.
                          </td>
                        </tr>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4 align-top">Lace/Appliqué</td>
                          <td className="py-3 px-4 align-top">
                            Patterns may vary within the same style family.
                          </td>
                        </tr>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4 align-top">Embellishments</td>
                          <td className="py-3 px-4 align-top">
                            Beads or sequins may have minor variance in shape or finish.
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 align-top">Fabric Availability (Made-to-Own)</td>
                          <td className="py-3 px-4 align-top">
                            Certain fabrics or trims may be discontinued or out of stock. Closest available alternatives will be used while keeping the same structure and overall design.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.3}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                3. Booking &amp; Timelines
              </h2>
              <div className="space-y-4 text-secondary/80 leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  <li>To-Own Collection: typical production lead time is 1-2 months (excluding shipping).</li>
                  <li>Custom Creations: typical production lead time is 2-3 months, depending on complexity and sourcing.</li>
                  <li>Final timelines are confirmed during booking. Rush orders may be accepted subject to approval and additional fees.</li>
                  <li>Lead time refers to the gown's production period before dispatch or delivery. Shipping and transit times vary by location and are not included in the stated lead time.</li>
                </ul>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Lead-Time Guide</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-foreground/20">
                          <th className="py-3 px-4 text-left font-semibold text-foreground">Order Type</th>
                          <th className="py-3 px-4 text-left font-semibold text-foreground">Standard Lead Time</th>
                          <th className="py-3 px-4 text-left font-semibold text-foreground">Rush Option</th>
                          <th className="py-3 px-4 text-left font-semibold text-foreground">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4 align-top">To-Own</td>
                          <td className="py-3 px-4 align-top">1-2 months (production time only)</td>
                          <td className="py-3 px-4 align-top">Case-to-case</td>
                          <td className="py-3 px-4 align-top">Dependent on stock/queue.</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 align-top">Custom</td>
                          <td className="py-3 px-4 align-top">2-3 months (production time only)</td>
                          <td className="py-3 px-4 align-top">Case-to-case</td>
                          <td className="py-3 px-4 align-top">Dependent on complexity/sourcing.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.35}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                4. Payment &amp; Confirmation
              </h2>
              <div className="space-y-4 text-secondary/80 leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  <li>A 50% down payment confirms the order and allows production or material sourcing to begin.</li>
                  <li>An order is considered final only after MW officially acknowledges your payment via our channels.</li>
                  <li>Payments are strictly non-refundable, as each gown is custom-made and materials are ordered specifically for your piece.</li>
                  <li>The remaining balance must be settled before pickup or dispatch.</li>
                  <li>Once any payment has been made, the amount cannot be refunded or reallocated, even if the gown is not yet completed, released, or collected.</li>
                  <li>Failure to complete payment or claim the gown by the advised release schedule forfeits the client's rights to any refund or ownership. Unclaimed gowns may be forfeited after written notice, with Mystical Wardrobes retaining ownership of the item.</li>
                </ul>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Payment Stages</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-foreground/20">
                          <th className="py-3 px-4 text-left font-semibold text-foreground">Stage</th>
                          <th className="py-3 px-4 text-left font-semibold text-foreground">Amount</th>
                          <th className="py-3 px-4 text-left font-semibold text-foreground">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-foreground/10">
                          <td className="py-3 px-4 align-top">Order Confirmation</td>
                          <td className="py-3 px-4 align-top">50%</td>
                          <td className="py-3 px-4 align-top">Non-refundable; production or materials may begin.</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 align-top">Release</td>
                          <td className="py-3 px-4 align-top">50% balance</td>
                          <td className="py-3 px-4 align-top">Must be fully paid prior to collection or shipping.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.4}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                5. Shipping &amp; Delivery
              </h2>
              <div className="space-y-4 text-secondary/80 leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  <li>MW assists in arranging shipping, and the client shoulders all shipping costs through third-party couriers (e.g., Lalamove, LBC, DHL, Grab).</li>
                  <li>Once the gown has been handed over to the courier, responsibility for any loss, damage, or delay transfers to the client.</li>
                  <li>MW may help with basic coordination or follow-up when possible, but is not liable for courier-related issues.</li>
                </ul>
              </div>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.45}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                6. Cancellations &amp; Changes
              </h2>
              <div className="space-y-4 text-secondary/80 leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  <li>Orders cannot be canceled once production has started or materials have been purchased.</li>
                  <li>Minor changes after concept approval may be allowed and can affect timelines. Major changes or new directions require a new order with new fees and timelines.</li>
                </ul>
              </div>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.5}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                7. Ownership &amp; Usage
              </h2>
              <div className="space-y-4 text-secondary/80 leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  <li>Gowns are produced for and released to the ordering client.</li>
                  <li>MW may photograph and showcase gowns for marketing (website, social media, portfolio).</li>
                  <li>Unless exclusive rights are agreed in writing, designs/patterns/concepts may be recreated or reinterpreted for future collections.</li>
                </ul>
              </div>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.55}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                8. Sizing &amp; Alterations
              </h2>
              <div className="space-y-4 text-secondary/80 leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  <li>Studio fittings: MW staff will take your measurements during in-person appointments.</li>
                  <li>Remote clients: You are responsible for providing accurate measurements (guidance available upon request).</li>
                  <li>MW is not responsible for incorrect fits based on client-provided measurements. Post-delivery alterations (if any) are the client's responsibility and are not included in the order price.</li>
                </ul>
              </div>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.6}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                9. Client Responsibilities
              </h2>
              <div className="space-y-4 text-secondary/80 leading-relaxed">
                <p className="font-semibold text-foreground">Please:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Provide accurate measurements, clear deadlines, and timely design inputs.</li>
                  <li>Attend scheduled fittings (if any) and respond promptly to design or material approvals.</li>
                  <li>Follow agreed payment schedules; delays may change timelines or result in order cancellation.</li>
                </ul>
              </div>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.65}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                10. Quality &amp; Craftsmanship
              </h2>
              <div className="space-y-4 text-secondary/80 leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  <li>Each gown is handcrafted to the agreed specifications.</li>
                  <li>Minor artisanal variations are natural.</li>
                  <li>MW releases gowns free from major defects at hand-off (e.g., holes, unsewn seams affecting wearability).</li>
                </ul>
              </div>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.7}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                11. Liability Disclaimer
              </h2>
              <div className="space-y-4 text-secondary/80 leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  <li>Products are provided "as is" and "as available."</li>
                  <li>MW is not liable for courier delays, misuse, or incidental matters (e.g., fabric sensitivity, color transfer, wear-and-tear due to improper use).</li>
                  <li>After pickup or dispatch, clients assume full responsibility for the use and care of the gown.</li>
                </ul>
              </div>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.75}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                12. Privacy &amp; Communication
              </h2>
              <div className="space-y-4 text-secondary/80 leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  <li>MW collects minimal personal data (name, contact details, measurements) to process orders, fittings, and deliveries per our Privacy Policy.</li>
                  <li>By ordering, you consent to receiving order updates and marketing messages via official channels. You may opt out of marketing anytime.</li>
                </ul>
              </div>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.8}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-4">
                13. Governing Law &amp; Dispute Resolution
              </h2>
              <div className="space-y-4 text-secondary/80 leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  <li>These terms are governed by Philippine law.</li>
                  <li>Parties will first pursue good-faith discussion or mediation before legal action.</li>
                </ul>
              </div>
            </section>
          </FadeInOnScroll>
        </div>
      </div>
    </main>
  );
}

