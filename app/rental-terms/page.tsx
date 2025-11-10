"use client";

import FadeInOnScroll from "@/components/FadeInOnScroll";

export default function RentalTermsPage() {
  return (
    <main className="bg-background py-10 md:py-16">
      <div className="mx-auto max-w-5xl px-6 md:px-16">
        <FadeInOnScroll delay={0.1}>
          <header className="mb-12 text-center">
            <p className="font-manrope text-sm text-secondary/80">
              Click here to see our Rental gowns
            </p>
            <h1 className="mt-3 font-vegawanty text-4xl text-foreground md:text-6xl">
              Rental Terms
            </h1>
            <p className="mx-auto mt-5 max-w-3xl font-manrope text-sm text-secondary/80 md:text-base">
              These terms apply to all gown rentals and fittings booked through Mystical Wardrobes in Malabon City, Philippines. By proceeding with your order, you confirm that you have read, understood, and agree to these terms in their entirety.
            </p>
          </header>
        </FadeInOnScroll>

        <div className="space-y-8 font-manrope leading-relaxed text-secondary/80">
          <FadeInOnScroll delay={0.15}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                Gown Rates, Fitting Appointments, and Booking
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>For gown rental rates and availability, please refer to [ link].</li>
                <li>For fitting appointments, please refer to [ link].</li>
                <li>For booking a gown, please refer to [ link].</li>
              </ul>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.2}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                1. Booking &amp; Payment
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Reservation: A booking is locked only after the 50% or stated down-payment is received.</li>
                <li>Payment-First Policy: All fees must be settled before the gown is dispatched or a fitting is scheduled. We do not collect security deposits.</li>
                <li>Balance Payment: The client must settle the remaining balance at least one week before the delivery date. If a client makes a down-payment when their event is less than one week away, they must pay the full amount immediately.</li>
                <li>Proof of Payment: Clients must send a screenshot of their payment via our official channels (IG, FB or email). A booking is only confirmed once acknowledged.</li>
                <li>ID Requirement: First-time renters must present a valid government-issued ID (or school ID for minors).</li>
                <li>Accepted Channels: We accept GCash, bank transfer, or in-studio cash.</li>
                <li>Rush Rental: Bookings placed less than 24 hours before ship-out incur a ₱500 rush fee.</li>
              </ul>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.25}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                2. Fitting Studio Rules
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-foreground/20">
                      <th className="py-3 px-4 text-left font-semibold text-foreground">Fees</th>
                      <th className="py-3 px-4 text-left font-semibold text-foreground">Amount</th>
                      <th className="py-3 px-4 text-left font-semibold text-foreground">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-foreground/10">
                      <td className="py-3 px-4 align-top">Fitting Fee</td>
                      <td className="py-3 px-4 align-top">P800.00</td>
                      <td className="py-3 px-4 align-top">
                        ₱300 staff assistance + ₱500 deductible from rental balance. This fee is non-refundable for any missed appointments.
                      </td>
                    </tr>
                    <tr className="border-b border-foreground/10">
                      <td className="py-3 px-4 align-top">Reschedule Fee</td>
                      <td className="py-3 px-4 align-top">P300.00</td>
                      <td className="py-3 px-4 align-top">
                        A ₱300.00 fee is payable each time a fitting slot is moved.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 align-top">Extension Fee</td>
                      <td className="py-3 px-4 align-top">P300.00</td>
                      <td className="py-3 px-4 align-top">
                        An extension of up to 30 minutes may be allowed if there is no next client booked after your slot. A ₱300.00 extension fee will be charged.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm">
                Note: Fitting schedules are confirmed only after payment of the fitting or rescheduling fee. Gown availability is not guaranteed, as some pieces may be booked online at the same time.
              </p>
              <ul className="mt-4 list-disc list-inside space-y-2">
                <li>Only 3–4 gowns will be prepared per session.</li>
                <li>Real-time availability updates are provided only if you inquire directly.</li>
                <li>Standard fitting time is 30 minutes. Extensions of up to 30 minutes may be allowed if there is no next client after your slot; a ₱300.00 extension fee applies.</li>
              </ul>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.3}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8 space-y-6">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl">
                3. Rental Timeline
              </h2>
              <p>Click here to see our Rental gowns</p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">3.1 Metro Manila (Lalamove / Grab / Pick-up)</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Day 1 – Dispatch between 3 PM to 5 PM (earlier if possible)</li>
                    <li>Day 2 – Client uses gown</li>
                    <li>Day 3 – Return via Lalamove between 8 AM to 9 AM</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">3.2 Luzon Provinces (LBC)</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Day 1 – Ship-out</li>
                    <li>Day 2-3 – In transit</li>
                    <li>Day 4 – Client receives gown</li>
                    <li>Day 5 – Event day</li>
                    <li>Day 7 – Hand back to LBC</li>
                    <li>Day 8-9 – Item arrives at Mystical</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">3.3 Outside Luzon / Luzon Islands (LBC or DHL)</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Day 1 – LBC/DHL ship-out</li>
                    <li>Day 2 to 8 – In transit</li>
                    <li>Day 9 – Client receives gown</li>
                    <li>Day 10 – Use of gown</li>
                    <li>Day 11 – Return item via LBC/DHL</li>
                    <li>Day 12 to 16 – In transit back to Mystical</li>
                    <li>Day 17 – Gown received by Mystical Wardrobes</li>
                  </ul>
                </div>
              </div>
              <p>
                The rental period starts on the day we ship out the gown. Courier working days exclude Sundays and holidays. We are not liable for delays, weather disruptions, or courier issues, but we will assist in coordinating if needed.
              </p>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.35}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                4. Shipping
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>We are not liable for delays, weather disruptions, or courier issues, but we will assist in coordinating if needed.</li>
                <li>The client shoulders all shipping fees.</li>
              </ul>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.4}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8 space-y-4">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl">
                5. Extension &amp; Late Return
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-foreground/20">
                      <th className="py-3 px-4 text-left font-semibold text-foreground">Scenario</th>
                      <th className="py-3 px-4 text-left font-semibold text-foreground">Daily Fee</th>
                      <th className="py-3 px-4 text-left font-semibold text-foreground">Conditions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-foreground/10">
                      <td className="py-3 px-4 align-top">Approved Extension Fee</td>
                      <td className="py-3 px-4 align-top">P1,000.00</td>
                      <td className="py-3 px-4 align-top space-y-3">
                        <ul className="list-disc list-inside space-y-1">
                          <li>If you need more time with the gown beyond your original return date, you can ask in advance to extend your rental.</li>
                          <li>If we approve the request, the cost is ₱1,000 per extra day.</li>
                          <li>To be considered, you should message us at least 3 days before your event (so we can check if the gown isn’t booked for the next client).</li>
                        </ul>
                        <div>
                          <p className="font-semibold text-foreground">Important:</p>
                          <ul className="mt-1 list-disc list-inside space-y-1">
                            <li>This is different from a late return fee. The extension fee applies only if you asked and we approved before the due date.</li>
                            <li>If you don’t request in advance (or we can’t approve because the gown is booked), the late return penalty applies instead.</li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 align-top">Late return fee</td>
                      <td className="py-3 px-4 align-top">Late Return Fee (₱1,488/day).</td>
                      <td className="py-3 px-4 align-top">
                        Charged per day when no extension was requested in advance. This higher fee exists because late returns directly affect our ability to prepare the gown for the next client and cause a measurable loss of income.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Metro Manila Return Window. The 8:00–9:00 AM time is the start of the return window. Clients must book the courier back to our agreed return location (Metro Manila/Greater Metro Manila) so that we receive the gown early on the return day. If the item is not received as scheduled, the late return fee applies.
              </p>
              <p>
                <strong>Maximum Extension:</strong> Rentals cannot be extended beyond 3 days without prior approval.
              </p>
              <p>
                <strong>Non-Returned Gown:</strong> Failure to return the gown within 9 days from your scheduled return date will be treated as non-returned and may result in legal recovery procedures.
              </p>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.45}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8 space-y-4">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl">
                6. Cancellations &amp; Changes
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-foreground/20">
                      <th className="py-3 px-4 text-left font-semibold text-foreground">Scenario</th>
                      <th className="py-3 px-4 text-left font-semibold text-foreground">Amount</th>
                      <th className="py-3 px-4 text-left font-semibold text-foreground">Conditions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-foreground/10">
                      <td className="py-3 px-4 align-top">Rental cancellation</td>
                      <td className="py-3 px-4 align-top">Remaining balance payable</td>
                      <td className="py-3 px-4 align-top">
                        The gown was reserved exclusively for your date. Since we don’t charge a security deposit, the remaining balance must be settled. Down-payments are non-refundable. If approved under the Store Credit Policy, the paid amount may be converted to store credit instead of being forfeited.
                      </td>
                    </tr>
                    <tr className="border-b border-foreground/10">
                      <td className="py-3 px-4 align-top">Store Credit Option</td>
                      <td className="py-3 px-4 align-top">N/A</td>
                      <td className="py-3 px-4 align-top">
                        In case of unavoidable cancellations, clients may request store credit instead of paying the full balance. Store credits are valid for one month and may be applied to any future rental within six months from the date of issuance. Store credit may only be granted once. If a client uses the store credit to rebook and later cancels again, the standard cancellation policy will be enforced.
                      </td>
                    </tr>
                    <tr className="border-b border-foreground/10">
                      <td className="py-3 px-4 align-top">Rescheduling Fees</td>
                      <td className="py-3 px-4 align-top">
                        Metro Manila: 2,000<br />Outside Metro Manila: 3,000
                      </td>
                      <td className="py-3 px-4 align-top">
                        This applies if you move your event date—even if the event is canceled—as your original slot was already reserved. This option is not available if you decide just 2 days before your scheduled delivery. If your first-choice gown isn’t available on the new date, you’ll need to choose from what’s available. The fee still applies, as the gown was previously blocked for your original schedule.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 align-top">Changing of Gown Fees</td>
                      <td className="py-3 px-4 align-top">
                        Metro Manila: 2,000<br />Outside Metro Manila: 3,000
                      </td>
                      <td className="py-3 px-4 align-top">
                        Subject to availability. One change per booking. If the new gown’s rate is higher, the difference must be paid; if lower, no refunds are issued.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.5}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8 space-y-6">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl">
                7. Damage &amp; Loss Policy
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-foreground/20">
                      <th className="py-3 px-4 text-left font-semibold text-foreground">Damage Type</th>
                      <th className="py-3 px-4 text-left font-semibold text-foreground">Description</th>
                      <th className="py-3 px-4 text-left font-semibold text-foreground">Fee</th>
                      <th className="py-3 px-4 text-left font-semibold text-foreground">Rationale</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-foreground/10">
                      <td className="py-3 px-4 align-top">Minor Damage</td>
                      <td className="py-3 px-4 align-top">
                        Small, reparable tears (less than 1 inch), missing beads or buttons, minor and removable soiling.
                      </td>
                      <td className="py-3 px-4 align-top">₱500–₱1,000</td>
                      <td className="py-3 px-4 align-top">
                        Covers minimal staff time for repair and replacement of minor parts without professional external services.
                      </td>
                    </tr>
                    <tr className="border-b border-foreground/10">
                      <td className="py-3 px-4 align-top">Moderate Damage</td>
                      <td className="py-3 px-4 align-top">
                        Significant tears (more than 1 inch), stubborn stains requiring specialized cleaning, broken zippers, or snapped straps.
                      </td>
                      <td className="py-3 px-4 align-top">₱1,000–₱2,500</td>
                      <td className="py-3 px-4 align-top">
                        Covers professional repair costs, specialized cleaning, or material replacement for integral components.
                      </td>
                    </tr>
                    <tr className="border-b border-foreground/10">
                      <td className="py-3 px-4 align-top">Severe Damage</td>
                      <td className="py-3 px-4 align-top">
                        Large tears that compromise the gown&apos;s structure, permanent, irreversible stains (e.g., wine, ink, burn marks) that cannot be removed by professional cleaning, or loss of accessories/packaging.
                      </td>
                      <td className="py-3 px-4 align-top">₱2,500 to Full Replacement Value</td>
                      <td className="py-3 px-4 align-top">
                        Covers the cost of a new, comparable gown or a significant portion thereof, in addition to lost income.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 align-top">Lost or Irreparable Gown</td>
                      <td className="py-3 px-4 align-top">
                        The gown is lost, stolen, or damaged beyond repair.
                      </td>
                      <td className="py-3 px-4 align-top">Full replacement cost of a new, comparable gown, as determined by Mystical Wardrobes.</td>
                      <td className="py-3 px-4 align-top">
                        The client is liable for the full value of the asset.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-foreground/20">
                        <th className="py-3 px-4 text-left font-semibold text-foreground">Accessories</th>
                        <th className="py-3 px-4 text-left font-semibold text-foreground">Replacement Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-foreground/10">
                        <td className="py-3 px-4">Brooch</td>
                        <td className="py-3 px-4">₱400-500</td>
                      </tr>
                      <tr className="border-b border-foreground/10">
                        <td className="py-3 px-4">Necklace</td>
                        <td className="py-3 px-4">₱400–₱500</td>
                      </tr>
                      <tr className="border-b border-foreground/10">
                        <td className="py-3 px-4">Fan</td>
                        <td className="py-3 px-4">₱400–₱500</td>
                      </tr>
                      <tr className="border-b border-foreground/10">
                        <td className="py-3 px-4">Gloves</td>
                        <td className="py-3 px-4">₱400–₱500</td>
                      </tr>
                      <tr className="border-b border-foreground/10">
                        <td className="py-3 px-4">Masks</td>
                        <td className="py-3 px-4">₱500</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Headpieces</td>
                        <td className="py-3 px-4">₱800–₱1,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-foreground/20">
                        <th className="py-3 px-4 text-left font-semibold text-foreground">Style Extensions</th>
                        <th className="py-3 px-4 text-left font-semibold text-foreground">Replacement Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-foreground/10">
                        <td className="py-3 px-4">Hood and capes</td>
                        <td className="py-3 px-4">₱5,000–₱7,000</td>
                      </tr>
                      <tr className="border-b border-foreground/10">
                        <td className="py-3 px-4">Pixie skirts</td>
                        <td className="py-3 px-4">₱5,000–₱7,000</td>
                      </tr>
                      <tr className="border-b border-foreground/10">
                        <td className="py-3 px-4">Train</td>
                        <td className="py-3 px-4">₱8,000–₱10,000</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Wings</td>
                        <td className="py-3 px-4">₱8,000–₱10,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-foreground/20">
                        <th className="py-3 px-4 text-left font-semibold text-foreground">Garments</th>
                        <th className="py-3 px-4 text-left font-semibold text-foreground">Replacement Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-foreground/10">
                        <td className="py-3 px-4">Sleeves</td>
                        <td className="py-3 px-4">₱1,500–₱2,500</td>
                      </tr>
                      <tr className="border-b border-foreground/10">
                        <td className="py-3 px-4">Corset</td>
                        <td className="py-3 px-4">₱7,000–₱15,000</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Skirt</td>
                        <td className="py-3 px-4">₱8,000–₱15,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-foreground/20">
                        <th className="py-3 px-4 text-left font-semibold text-foreground">Petticoats</th>
                        <th className="py-3 px-4 text-left font-semibold text-foreground">Replacement Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-foreground/10">
                        <td className="py-3 px-4">No hoops petticoat</td>
                        <td className="py-3 px-4">₱800</td>
                      </tr>
                      <tr className="border-b border-foreground/10">
                        <td className="py-3 px-4">Slim Petticoat</td>
                        <td className="py-3 px-4">₱800</td>
                      </tr>
                      <tr className="border-b border-foreground/10">
                        <td className="py-3 px-4">Medium Petticoat</td>
                        <td className="py-3 px-4">₱1,500</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Premium Petticoat</td>
                        <td className="py-3 px-4">₱2,000–₱3,500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-foreground/20">
                        <th className="py-3 px-4 text-left font-semibold text-foreground">Other</th>
                        <th className="py-3 px-4 text-left font-semibold text-foreground">Replacement Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 px-4">Gown bag</td>
                        <td className="py-3 px-4">₱1,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-4">
                <p>
                  Documentation: All gowns are inspected and documented with photos before release and upon return to verify their condition. Any visible damage will be documented immediately, and the client will be asked to acknowledge it.
                </p>
                <p>
                  Responsibility: We understand that accidents can happen, but any damage, whether due to negligence or not, will be assessed and may result in a fee.
                </p>
                <p>
                  Ownership of Lost Items: The payment for a lost or irreparably damaged item is a replacement cost and does not transfer ownership of the item to the client. The gown remains the property of Mystical Wardrobes, and the client is responsible for returning it regardless of whether replacement fees have been paid.
                </p>
                <p>
                  Prohibited Use: Alterations (sewing, cutting, modifying), wet photoshoots, and activities involving liquids are strictly not allowed. Violations will be treated as damage and charged accordingly.
                </p>
                <p>
                  Lost Items: You are liable for loss, destruction, or damage due to theft, mysterious disappearance, fire, major stains, or any other cause, other than normal wear and tear.
                </p>
                <p>
                  Accessories &amp; Packaging: Accessories, hangers, garment bags, or other items provided with the gown must be returned in the same condition. Missing items will incur replacement charges.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Care Expectations</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    Normal Wear and Tear: Due to the nature of a gown being worn multiple times, there may be minor stains, rips, missing beads, or other normal wear and tear concerns. The normal wear and tear caused by previous clients will not be shouldered by the present renter.
                  </li>
                  <li>
                    Responsibility: Upon delivery, you are fully responsible for the product. Please treat it with great care.
                  </li>
                  <li>
                    Upon delivery, you are responsible for the product(s). Please treat the products with great care. You are liable for loss, destruction, or damage due to theft, mysterious disappearance, fire, major stains, or any other cause, other than normal wear and tear.
                  </li>
                  <li>
                    Cleaning: Mystical Wardrobes handles all gown cleaning before and after use; this is included in your rental fee. Clients must not clean, spot-treat, or apply any detergents or chemicals to the gown—even if permission is requested—as this can cause further damage. If a stain occurs, please return the gown as is. Any necessary restoration will be handled by our team and, if applicable, charged under the Damage &amp; Loss schedule.
                  </li>
                  <li>
                    Liability: We are not liable for any injuries or damages that may occur while the client is wearing the gown. The client assumes all risks associated with wearing the gown.
                  </li>
                </ul>
              </div>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.55}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                Updates
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Last updated on October 15, 2025</li>
                <li>These terms may be updated at any time without prior notice. The latest version will always be posted on our website.</li>
              </ul>
            </section>
          </FadeInOnScroll>
        </div>
      </div>
    </main>
  );
}

