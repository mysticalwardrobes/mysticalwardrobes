"use client";

import Link from "next/link";
import FadeInOnScroll from "@/components/FadeInOnScroll";

export default function RentalTermsPage() {
  return (
    <main className="bg-background py-10 md:py-16">
      <div className="mx-auto max-w-5xl px-6 md:px-16">
        <FadeInOnScroll delay={0.1}>
          <header className="mb-12 text-center">
            <p className="font-manrope text-sm text-secondary/80">
              <Link href="/collections/all" className="text-secondary hover:text-foreground underline transition-colors">Click here to see our Rental gowns</Link>
            </p>
            <h1 className="mt-3 font-vegawanty text-4xl text-foreground md:text-6xl">
              Rental Terms
            </h1>
            <p className="mx-auto mt-5 max-w-3xl font-manrope text-sm text-secondary/80 md:text-base">
              These terms apply to all gown rentals and fittings booked through Mystical Wardrobes. By proceeding with your order, you confirm that you have read, understood, and agree to these terms in their entirety.
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
                <li>For gown rental rates, please refer to <Link href="/collections/all" className="text-secondary hover:text-foreground underline transition-colors">our gown collection</Link>.</li>
                <li>For fitting appointments, please refer to <Link href="/book-now" className="text-secondary hover:text-foreground underline transition-colors">our booking page</Link>.</li>
                <li>For renting a gown, please refer to <Link href="/book-now" className="text-secondary hover:text-foreground underline transition-colors">our booking page</Link>.</li>
              </ul>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.2}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                1. Booking &amp; Payment
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Reservation: A booking is locked only after the 70% or stated down-payment is received.</li>
                <li>Payment-First Policy: All fees must be settled before the gown is dispatched or a fitting is scheduled. We do not collect security deposits.</li>
                <li>Balance Payment: The client must settle the remaining balance at least one week before the delivery date. If a client makes a down-payment when their event is less than one week away, they must pay the full amount immediately.</li>
                <li>Proof of Payment: Clients must send a screenshot of their payment via our official channels (IG, FB, or email). A booking is only confirmed once acknowledged.</li>
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
                      <td className="py-3 px-4 align-top">₱800.00</td>
                      <td className="py-3 px-4 align-top">
                        Fitting Fee (₱800): ₱300 covers staff assistance (non-refundable), and ₱500 will be credited to your rental if you book within 5 calendar days from your fitting date (Day 1 = fitting day); missed or late-cancelled appointments forfeit the fee.
                      </td>
                    </tr>
                    <tr className="border-b border-foreground/10">
                      <td className="py-3 px-4 align-top">Reschedule Fee</td>
                      <td className="py-3 px-4 align-top">₱500.00</td>
                      <td className="py-3 px-4 align-top">
                        A ₱300.00 fee is payable each time a fitting slot is moved.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 align-top">Extension Fee</td>
                      <td className="py-3 px-4 align-top">₱400.00</td>
                      <td className="py-3 px-4 align-top">
                        An extension of up to 30 minutes may be allowed if there is no next client booked after your slot. A ₱400.00 extension fee will be charged.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm">
                Note: Fitting schedules are confirmed only after payment of the fitting or rescheduling fee. Gown availability is not guaranteed, as some pieces may be booked online at the same time.
              </p>
              <ul className="mt-4 list-disc list-inside space-y-2">
                <li>Only 2-3 gowns will be prepared per session.</li>
                <li><strong>Finalized Event Date Required:</strong> Clients must have a finalized date of use (event date) before scheduling a fitting. This allows us to prepare only the gowns that are still available on your date of use, ensuring you only try on gowns you can actually book. Your event date determines gown availability.</li>
                <li>Real-time availability updates are provided only if you inquire directly.</li>
                <li>Clients may only bring <strong>1–2 companions</strong> inside the fitting area. This is to maintain a comfortable and organized space for everyone.</li>
                <li>Clients have a strict 30-minute allotment for fitting and decision-making. To maximize this time and keep our schedule on track, fittings are limited to gowns only. Accessories are unavailable for fitting but can be selected via our website. Extensions of up to 30 minutes may be allowed if there is no next client after your slot; a ₱400.00 extension fee applies.</li>
              </ul>

              <div className="mt-6 pt-6 border-t border-foreground/10">
                <h3 className="font-semibold text-foreground mb-3 text-lg">
                  Gown Choices &amp; Availability
                </h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong>Finalized Event Date Required:</strong> You must have a confirmed date of use (event date) before your fitting appointment. We use your event date to check which gowns are still available, so you only try on gowns that can actually be booked for your date.</li>
                  <li>Some gowns may not be available on your fitting date, as they may already be booked by other clients. That's why we ask for your top 8–15 choices, so we can easily remove any unavailable gowns and proceed with the rest.</li>
                  <li>We're unable to update every fitting client in real time about each gown's status, so please message us a few days before your fitting and we'll send an updated list of gowns that are available to try.</li>
                  <li>Paying the ₱800 fitting fee does not reserve any gown for your fitting date or your event date. A gown is only reserved once you officially book it for your event.</li>
                  <li>You may book your gown online before fitting. If you later schedule a fitting, you may fit only the exact gown you already booked for your event date (1 gown only). The same fitting policy still applies, and we cannot guarantee that the booked gown will be physically available in the studio on your fitting date.</li>
                </ul>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-3">
                    Sample Scenario
                  </h4>
                  <p className="mb-3">
                    If you schedule your fitting weeks or months in advance, your preferred gowns may be available at the time of booking, but we cannot guarantee they'll still be available on your actual fitting day. Another client may reserve those gowns for an event date that overlaps with your fitting, making them unavailable for you.
                  </p>
                  <p>
                    If your chosen gowns are not in the studio on the day of your fitting, we will offer gowns with a similar structure or design for you to try (the design may not be exactly the same). Even if you're not able to fit a specific gown, you can still book it for your event date as long as it is available.
                  </p>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.3}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8 space-y-6">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl">
                3. Rental Timeline
              </h2>
              <p><Link href="/collections/all" className="text-secondary hover:text-foreground underline transition-colors">Click here to see our Rental gowns</Link></p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">3.1 Metro Manila and Greater Metro Manila (Lalamove / Grab / Pick-up)</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Day 1 – Dispatch between 3 PM to 5 PM (earlier if possible)</li>
                    <li>Day 2 – Client uses gown</li>
                    <li>
                      Day 3 – Return Schedule — <strong>STRICT</strong>
                      <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li>Return booking must be booked between 8:00 AM – 9:00 AM (<strong>STRICT</strong>).</li>
                        <li>The gown must be received by Mystical Wardrobes by 9:00 AM – 1:00 PM, (especially for Greater Metro Manila locations)</li>
                        <li>Return bookings must be <strong>EXCLUSIVE</strong> only (no pooling/multi-drop) and must follow the receiving timeline to avoid penalties.</li>
                      </ul>
                      <p className="mt-2 italic text-sm">Unless we specifically advise an earlier receiving time depending on the arrangement or schedule.</p>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">3.2 Luzon Provinces (LBC)</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Day 1 – Ship-out</li>
                    <li>Day 2-3 – In transit</li>
                    <li>Day 4 – Client receives gown</li>
                    <li>Day 5 – Event day</li>
                    <li>Day 6 – Hand back to LBC</li>
                    <li>Day 7-8 – Item arrives at Mystical</li>
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
                The rental period starts on the day we ship out the gown. For Luzon Provinces (Outside Metro Manila): 5 days (excluding Sundays and holidays) or 6-8 days (including Sundays and 1-2 holidays). We are not liable for delays, weather disruptions, or courier issues, but we will assist in coordinating if needed.
              </p>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.35}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8 space-y-6">
              <div>
                <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-1">
                  4. Delivery &amp; Return Coordination Policy
                </h2>
                <p className="text-sm italic">(Metro Manila &amp; Greater Metro Manila)</p>
                <p className="mt-3">
                  To ensure faster and smoother coordination during peak season, please follow the policy below:
                </p>
              </div>

              <hr className="border-foreground/10" />

              {/* 4.1 Pickup Options */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-xl mb-2">
                  4.1 Pickup Options
                </h3>

                {/* A) Rider / 3rd-Party Pickup */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    A) Rider / 3rd-Party Pickup (Lalamove / Grab / etc.)
                  </h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Mystical Wardrobes will <strong>book the rider for gown delivery</strong> by default.</li>
                    <li>Clients will only <strong>book their own delivery rider</strong> if they specifically request to do so.</li>
                    <li>If you&apos;d like to book delivery yourself, message us first so we can coordinate timelines smoothly.</li>
                  </ul>
                </div>

                {/* B) Client Pick-up */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    B) Client Pick-up (Personal Pick-up)
                  </h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Client pick-up is <strong>by appointment only</strong>.</li>
                    <li>Pick-up is confirmed by our team <strong>once items are ready</strong>.</li>
                    <li>Client (or authorized representative) must <strong>sign the Release Logbook</strong> upon release.</li>
                    <li>Please <strong>do not arrive without confirmation</strong>, as packing and release are scheduled.</li>
                  </ul>
                </div>
              </div>

              <hr className="border-foreground/10" />

              {/* 4.2 Required Details for Record Purposes */}
              <div>
                <h3 className="font-semibold text-foreground text-xl mb-2">
                  4.2 Required Details for Record Purposes
                </h3>
                <p className="mb-3">
                  Whether Mystical Wardrobes books the delivery rider or the client requests to book it, clients are still <strong>required to submit delivery and return details in advance</strong> (for documentation and smooth coordination), including:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Name</li>
                  <li>Contact number(s)</li>
                  <li>Exact pin location / address</li>
                </ul>
              </div>

              <hr className="border-foreground/10" />

              {/* 4.3 Standard Delivery & Return Windows (Strict) */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-xl mb-2">
                  4.3 Standard Delivery &amp; Return Windows (Strict)
                </h3>

                {/* Delivery Dispatch */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Delivery Dispatch</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Dispatch window: 3:00 PM – 5:00 PM</strong></li>
                    <li>Please <strong>message us first before booking/pickup</strong> so we can confirm the items are ready.</li>
                  </ul>
                </div>

                {/* Return Schedule */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Return Schedule — STRICT</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Return booking must be booked between 8:00 AM – 9:00 AM (<strong>STRICT</strong>).</li>
                    <li>The gown must be <strong>received by Mystical Wardrobes by 9:00 AM – 1:00 PM, (especially for Greater Metro Manila locations)</strong></li>
                  </ul>
                  <p className="mt-2 italic text-sm">
                    Unless we advise an earlier receiving time depending on the arrangement or schedule.
                  </p>
                </div>

                {/* FOR RETURN NO POOLING */}
                <div>
                  <p className="font-semibold text-foreground mb-2">FOR RETURN <strong>NO POOLING / MULTI-DROP (STRICT)</strong>:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Return bookings must be <strong>exclusive</strong> (not pooled with other deliveries).</li>
                    <li>Inform your rider that this is an <strong>exclusive return</strong> and must follow the receiving timeline.</li>
                    <li>Late arrivals may affect the next booking and may incur penalties.</li>
                  </ul>
                </div>
              </div>

              <hr className="border-foreground/10" />

              {/* 4.4 Delivery Updates & Item Checking */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-xl mb-2">
                  4.4 Delivery Updates &amp; Item Checking
                </h3>

                {/* If 3rd-Party Rider */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">If 3rd-Party Rider</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Upon receiving the items, the client is <strong>required to immediately check and confirm</strong> that all items are complete.</li>
                    <li>
                      The rider you booked must know the following details:
                      <ul className="list-[circle] list-inside ml-6 mt-1 space-y-1">
                        <li><strong>Gown name</strong></li>
                        <li><strong>Client/Account name</strong></li>
                      </ul>
                    </li>
                  </ul>
                </div>

                {/* If Client Pick-up */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">If Client Pick-up</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Clients may inspect the gown before release.</li>
                    <li>Clients must sign the <strong>Release Logbook</strong> confirming items are complete.</li>
                    <li>
                      Provide:
                      <ul className="list-[circle] list-inside ml-6 mt-1 space-y-1">
                        <li><strong>Gown name</strong></li>
                        <li><strong>Client/Account name</strong></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <hr className="border-foreground/10" />

              {/* 4.5 Return Confirmation (Required) */}
              <div>
                <h3 className="font-semibold text-foreground text-xl mb-2">
                  4.5 Return Confirmation (Required)
                </h3>
                <p className="mb-3">Upon return, please provide:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Gown name</strong></li>
                  <li><strong>Client/Account name</strong></li>
                </ul>
                <p className="mt-2 text-sm">So we can properly record the return in our system.</p>
              </div>

              <hr className="border-foreground/10" />

              {/* 4.6 Important Notes */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-xl mb-2">
                  4.6 Important Notes
                </h3>

                {/* Address Changes */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Address Changes (Strict)</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Delivery addresses must be finalized at least <strong>2 days before</strong> the delivery date.</li>
                    <li>Address changes requested within <strong>2 days</strong> cannot be accommodated because logistics details are already scheduled and recorded.</li>
                  </ul>
                </div>

                {/* Batch Deliveries */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Batch Deliveries (Case by case basis only)</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Deliveries may be handled in <strong>batches</strong>, so a Lalamove link may not always be available.</li>
                    <li>Status updates will be provided instead.</li>
                  </ul>
                </div>

                {/* Shipping Fees */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Shipping Fees</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Delivery and return shipping fees are shouldered by the client.</li>
                    <li>Shipping fees are based on <strong>Lalamove Priority Rate</strong> (or agreed rate).</li>
                  </ul>
                </div>

                {/* Policy Note */}
                <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Policy Note</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Failure to follow booking windows and coordination timelines may result in delays that can affect the next renter. Mystical Wardrobes will not be liable for delays caused by late booking, pooled riders, or unconfirmed coordination.</li>
                    <li>The gown must be <strong>received by Mystical Wardrobes by 9:00 AM – 1:00 PM, (especially for Greater Metro Manila locations)</strong>. Late arrivals may affect the next booking and may incur penalties.</li>
                  </ul>
                </div>
              </div>

              <hr className="border-foreground/10" />

              {/* 4.7 Why We Follow Lalamove Priority Rates */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-xl mb-2">
                  4.7 Why We Follow Lalamove Priority Rates (and Why Client Pooling is Not Allowed)
                </h3>
                <p>
                  To keep scheduling fair and operations smooth during peak season, Mystical Wardrobes follows the <strong>Lalamove Priority Rate</strong> as the standard basis for shipping fees (unless there is an agreed fixed amount). Please note that <strong>we do not earn from shipping fees</strong>—the amount goes directly to the rider/courier.
                </p>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Why shipping may be handled &ldquo;by batch&rdquo;</h4>
                  <p className="mt-2">
                    During peak season, we handle a high volume of deliveries and returns daily (around <strong>100–150 gowns/day</strong>). To meet strict timelines—especially for next-day bookings—we sometimes coordinate deliveries and returns <strong>by batch</strong> using our own trusted riders.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Why Mystical Wardrobes may pool using our own riders</h4>
                  <p className="mb-2">
                    When we pool orders through <strong>our own riders</strong>, it is done with controlled routing and internal scheduling to ensure:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>gowns arrive within our required receiving time</li>
                    <li>gowns are handled properly during transit</li>
                    <li>we can track riders directly and coordinate real-time updates</li>
                  </ul>
                  <p className="mt-2">
                    Pooling under our supervision helps prevent delays that could affect the next renter.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2 text-red-700">Why client-booked pooling / multi-drop is NOT allowed</h4>
                  <p className="mb-3">
                    If the rider is booked by the client under <strong>pooling/multi-drop</strong>, we do not have direct control over the route and schedule. Based on experience, even when booked early, some pooled riders arrive <strong>very late (ex. 12 midnight–3 AM)</strong> due to multiple stops. This disrupts our production, cleaning, repairs, and next-day dispatch.
                  </p>
                  <p className="mb-3">
                    We have also had cases where gowns were <strong>mishandled, dropped, or lost</strong> during client-booked bookings, and unfortunately these were not shouldered by the rider or client.
                  </p>
                  <p>
                    Because each gown is a single unit per design and often reserved back-to-back, we enforce a strict policy:
                  </p>
                  <div className="bg-red-50/80 border border-red-200 rounded-lg p-4 mt-3">
                    <ul className="list-disc list-inside space-y-2">
                      <li>Return bookings must be <strong>EXCLUSIVE</strong> (not pooled with other deliveries).</li>
                      <li>Inform your rider that this is an <strong>exclusive return</strong> and must follow the receiving timeline.</li>
                      <li>Late arrivals may affect the next booking and <strong>may incur penalties</strong>.</li>
                    </ul>
                  </div>
                </div>
              </div>
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
                      <td className="py-3 px-4 align-top">₱1,000.00</td>
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
                            <li>If you do not request in advance (or we cannot approve because the gown is booked), the late return penalty applies instead.</li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 align-top">Late return fee</td>
                      <td className="py-3 px-4 align-top">₱1,488/day</td>
                      <td className="py-3 px-4 align-top">
                        Late Return Fee (₱1,488/day). Charged per day when no extension was requested in advance. This higher fee exists because late returns directly affect our ability to prepare the gown for the next client and cause a measurable loss of income.
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
                        <ul className="list-disc list-inside space-y-1">
                          <li>The gown was reserved exclusively for your date. If your event is canceled or rescheduled, Mystical Wardrobes is not liable for resulting losses and no refund will be issued for booked gowns. Since we don't charge a security deposit, the remaining balance must still be settled. Down-payments are non-refundable.</li>
                          <li>If approved under the Store Credit Policy, only the eligible portion of the amount you've already paid may be converted to store credit instead of being forfeited. The remaining balance is still due and must be settled regardless of any store credit approval.</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="border-b border-foreground/10">
                      <td className="py-3 px-4 align-top">Store Credit Option</td>
                      <td className="py-3 px-4 align-top">N/A</td>
                      <td className="py-3 px-4 align-top space-y-3">
                        <div>
                          <p className="font-semibold text-foreground mb-1">What it is:</p>
                          <p>We convert only the eligible portion of the amount you've already paid into credit you can use for a future booking.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground mb-1">How long it's valid:</p>
                          <ul className="list-disc list-inside space-y-1">
                            <li>Use the credit to make a new booking within 30 days of issuance.</li>
                            <li>Your new event date must be within 6 months of issuance.</li>
                          </ul>
                        </div>
                        <p>One-time only. If you rebook with store credit and cancel again, our standard cancellation policy applies and the credit is forfeited.</p>
                      </td>
                    </tr>
                    <tr className="border-b border-foreground/10">
                      <td className="py-3 px-4 align-top">Rescheduling Fees</td>
                      <td className="py-3 px-4 align-top">
                        Metro Manila: ₱3,000<br />Outside Metro Manila: ₱4,000
                      </td>
                      <td className="py-3 px-4 align-top">
                        This applies if you move your event date, even when the original event is canceled, because your original slot was already reserved. Mystical Wardrobes is not liable for event cancellation or rescheduling outcomes, and no refund will be issued for booked gowns. This option is not available if you decide just 2 days before your scheduled delivery. If your first-choice gown isn't available on the new date, you'll need to choose from what's available. The fee still applies, as the gown was previously blocked for your original schedule.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 align-top">Changing of Gown Fees</td>
                      <td className="py-3 px-4 align-top">
                        Metro Manila: ₱3,000<br />Outside Metro Manila: ₱4,000
                      </td>
                      <td className="py-3 px-4 align-top">
                        Upon approval and subject to availability. One change per booking. If the new gown's rate is higher, the difference must be paid; if lower, no refunds are issued.
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
                        Covers the cost of a new, comparable gown or a significant portion thereof, in addition to lost income.11
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
                        <td className="py-3 px-4">₱400–₱500</td>
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
                        <td className="py-3 px-4">₱7,000–₱10,000</td>
                      </tr>
                      <tr className="border-b border-foreground/10">
                        <td className="py-3 px-4">Train</td>
                        <td className="py-3 px-4">₱8,000–₱12,000</td>
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
                8. Photo Usage Rights
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Mystical Wardrobes reserves the right to use photos and videos of clients wearing our gowns for marketing, promotional, and portfolio purposes, including but not limited to our website, social media platforms, advertisements, and other marketing materials.</li>
                <li>While we collect photos and videos from clients for potential marketing use, we are not obligated to post all submitted content. Due to the volume of marketing materials we receive and our content lineup, not all collected photos and videos are guaranteed to be posted.</li>
                <li>If you do not wish for your photos to be used, you must notify us in writing (via email, social media message, or other official channels) at the time of booking or before your event date.</li>
                <li>By proceeding with your rental without specifying otherwise, you grant Mystical Wardrobes permission to use your photos as described above.</li>
              </ul>
            </section>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.6}>
            <section className="bg-white/95 rounded-lg border border-foreground/10 p-6 shadow-md md:p-8">
              <h2 className="font-vegawanty text-2xl text-foreground md:text-3xl mb-4">
                9. Updates
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Last updated on February 25, 2026</li>
                <li>These terms may be updated at any time without prior notice. The latest version will always be posted on our website.</li>
              </ul>
            </section>
          </FadeInOnScroll>
        </div>
      </div>
    </main>
  );
}

