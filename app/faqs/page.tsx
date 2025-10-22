"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInOnScroll from "@/components/FadeInOnScroll";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  faqs: FAQ[];
}

const faqData: FAQCategory[] = [
  {
    title: "General Information",
    faqs: [
      {
        question: "What is Mystical Wardrobes?",
        answer: "Mystical Wardrobes is a gown rental service based in Malabon City, Philippines, offering a selection of gowns for various occasions."
      },
      {
        question: "Where can I view your gown rental rates and availability?",
        answer: "For gown rental rates and availability, please refer to the provided link."
      }
    ]
  },
  {
    title: "Booking & Payment",
    faqs: [
      {
        question: "How do I book a gown?",
        answer: "A booking is confirmed only after a 50% or stated down-payment is received. All fees must be settled before the gown is dispatched or a fitting is scheduled. You can find the booking link here."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept GCash, bank transfer, or in-studio cash."
      },
      {
        question: "Do I need to pay a security deposit?",
        answer: "No, we do not collect security deposits. All fees must be settled before the gown is dispatched or a fitting is scheduled."
      },
      {
        question: "When do I need to pay the remaining balance?",
        answer: "The remaining balance must be settled at least one week before the delivery date. If your event is less than one week away when you make a down-payment, you must pay the full amount immediately."
      },
      {
        question: "What is a rush rental fee?",
        answer: "Bookings placed less than 24 hours before ship-out incur a ₱500 rush fee."
      }
    ]
  },
  {
    title: "Fitting Appointments",
    faqs: [
      {
        question: "How do I schedule a fitting appointment?",
        answer: "For fitting appointments, please refer to the provided link."
      },
      {
        question: "Is there a fee for fitting appointments?",
        answer: "Yes, there is a fitting fee of ₱800. This includes ₱300 for staff assistance and ₱500 which is deductible from your rental balance. This fee is non-refundable for any missed appointments."
      },
      {
        question: "Can I reschedule my fitting appointment?",
        answer: "Yes, a ₱300 fee is payable each time a fitting slot is moved."
      },
      {
        question: "How long is a standard fitting session?",
        answer: "Standard fitting time is 30 minutes. An extension of up to 30 minutes may be allowed if there is no next client booked after your slot, for a ₱300 extension fee."
      },
      {
        question: "How many gowns can I try on during a fitting session?",
        answer: "Only 3–4 gowns will be prepared per session."
      },
      {
        question: "Is gown availability guaranteed for fitting appointments?",
        answer: "Gown availability is not guaranteed, as some pieces may be booked online at the same time. Real-time availability updates are provided only if you inquire directly."
      }
    ]
  },
  {
    title: "Rental Timeline & Shipping",
    faqs: [
      {
        question: "When does the rental period begin?",
        answer: "The rental period starts on the day we ship out the gown. Courier working days exclude Sundays and holidays."
      },
      {
        question: "Who is responsible for shipping fees?",
        answer: "The client shoulders all shipping fees."
      },
      {
        question: "Are you responsible for shipping delays?",
        answer: "We are not liable for delays, weather disruptions, or courier issues, but we will assist in coordinating if needed."
      }
    ]
  },
  {
    title: "Extension & Late Return",
    faqs: [
      {
        question: "How can I extend my gown rental?",
        answer: "If you need more time with the gown beyond your original return date, you can ask in advance to extend your rental. If approved, the cost is ₱1,000 per extra day. You should message us at least 3 days before your event to check if the gown isn't booked for the next client."
      },
      {
        question: "What happens if I return the gown late without an approved extension?",
        answer: "A late return fee of ₱1,488 per day will be charged when no extension was requested in advance. This higher fee exists because late returns directly affect our ability to prepare the gown for the next client and cause a measurable loss of income."
      },
      {
        question: "What is the return window for Metro Manila?",
        answer: "The 8:00–9:00 AM time is the start of the return window for Metro Manila. Clients must book the courier back to our agreed return location so that we receive the gown early on the return day. If the item is not received as scheduled, the late return fee applies."
      },
      {
        question: "What is the maximum rental extension allowed?",
        answer: "Rentals cannot be extended beyond 3 days without prior approval."
      },
      {
        question: "What happens if I fail to return the gown?",
        answer: "Failure to return the gown within 9 days from your scheduled return date will be treated as non-returned and may result in legal recovery procedures."
      }
    ]
  },
  {
    title: "Cancellations & Changes",
    faqs: [
      {
        question: "Can I cancel my gown rental?",
        answer: "If you cancel a rental, the gown was reserved exclusively for your date, and since we don't charge a security deposit, the remaining balance must be settled. Down-payments are non-refundable. Under our Store Credit Policy, the paid amount may be converted to store credit instead of being forfeited if approved."
      },
      {
        question: "What is the Store Credit Option?",
        answer: "In case of unavoidable cancellations, clients may request store credit instead of paying the full balance. Store credits are valid for one month and may be applied to any future rental within six months from the date of issuance. Store credit may only be granted once. If a client uses the store credit to rebook and later cancels again, the standard cancellation policy will be enforced."
      },
      {
        question: "Is there a fee for rescheduling my event date?",
        answer: "Yes, a rescheduling fee applies (Metro Manila: ₱2,000; Outside Metro Manila: ₱3,000). This applies even if the event is canceled, as your original slot was already reserved. This option is not available if you decide just 2 days before your scheduled delivery."
      },
      {
        question: "Can I change the gown I booked?",
        answer: "Yes, you can change your gown once per booking, subject to availability. If the new gown's rate is higher, the difference must be paid; if lower, no refunds are issued. A changing of gown fee applies (Metro Manila: ₱2,000; Outside Metro Manila: ₱3,000)."
      }
    ]
  },
  {
    title: "Damage & Loss Policy",
    faqs: [
      {
        question: "What happens if the gown is damaged while I have it?",
        answer: "Any damage to the gown, whether due to negligence or not, will be assessed upon return and may result in a fee. Fees vary depending on the severity of the damage (minor, moderate, severe), ranging from ₱500 to the full replacement value of the gown."
      },
      {
        question: "What if the gown is lost or irreparably damaged?",
        answer: "If the gown is lost, stolen, or damaged beyond repair, you will be charged the full replacement cost of a new, comparable gown, as determined by Mystical Wardrobes."
      },
      {
        question: "If I pay for a lost gown, does it become mine?",
        answer: "No, the payment for a lost or irreparably damaged item is a replacement cost and does not transfer ownership of the item to the client. The gown remains the property of Mystical Wardrobes, and the client is responsible for returning it regardless of whether replacement fees have been paid."
      },
      {
        question: "Are there any prohibited uses for the gown?",
        answer: "Yes, alterations (sewing, cutting, modifying), wet photoshoots, and activities involving liquids are strictly not allowed. Violations will be treated as damage and charged accordingly."
      },
      {
        question: "What about lost accessories or packaging?",
        answer: "Accessories, hangers, garment bags, or other items provided with the gown must be returned in the same condition. Missing items will incur replacement charges."
      }
    ]
  },
  {
    title: "Care Expectations",
    faqs: [
      {
        question: "Do I need to clean the gown before returning it?",
        answer: "No, Mystical Wardrobes handles all gown cleaning before and after use; this is included in your rental fee. Clients must not clean, spot-treat, or apply any detergents or chemicals to the gown. If a stain occurs, please return the gown as is."
      },
      {
        question: "Who is responsible for the gown during the rental period?",
        answer: "Upon delivery, you are fully responsible for the product. Please treat it with great care. You are liable for loss, destruction, or damage due to theft, mysterious disappearance, fire, major stains, or any other cause, other than normal wear and tear."
      },
      {
        question: "Is normal wear and tear covered?",
        answer: "Normal wear and tear (minor stains, rips, missing beads from previous uses) will not be shouldered by the present renter."
      }
    ]
  },
  {
    title: "Updates",
    faqs: [
      {
        question: "When were your terms last updated?",
        answer: "Our terms were last updated on October 15, 2025."
      },
      {
        question: "Do your terms change?",
        answer: "These terms may be updated at any time without prior notice. The latest version will always be posted on our website."
      }
    ]
  }
];

interface FAQAccordionProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQAccordion({ faq, isOpen, onToggle }: FAQAccordionProps) {
  return (
    <div className="border border-foreground/10 bg-white/95 rounded-lg shadow-md hover:border-secondary/30 transition-colors duration-300">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-start justify-between text-left hover:bg-foreground/5 transition-colors duration-200 rounded-lg"
        aria-expanded={isOpen}
      >
        <span className="font-manrope text-base md:text-lg font-semibold text-foreground pr-4">
          {faq.question}
        </span>
        <span className="flex-shrink-0 text-secondary text-2xl font-bold transition-transform duration-300" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          +
        </span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 pt-2">
              <p className="font-manrope text-sm md:text-base text-secondary/80 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQsPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (categoryIndex: number, faqIndex: number) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <main className="bg-background py-10 md:py-16">
      <div className="mx-auto max-w-5xl px-6 md:px-16">
        {/* Header */}
        <FadeInOnScroll delay={0.1}>
          <header className="mb-12 text-center">
            <p className="font-manrope text-xs uppercase tracking-[0.4em] text-secondary">
              Help Center
            </p>
            <h1 className="mt-3 font-vegawanty text-4xl text-foreground md:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mt-5 max-w-2xl font-manrope text-sm text-secondary/80 md:text-base">
              Find answers to common questions about our gown rental services, booking process, policies, and more. If you can't find what you're looking for, feel free to contact us.
            </p>
          </header>
        </FadeInOnScroll>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqData.map((category, categoryIndex) => (
            <FadeInOnScroll key={categoryIndex} delay={0.1 + categoryIndex * 0.05}>
              <section>
                <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-6">
                  {category.title}
                </h2>
                <div className="space-y-3">
                  {category.faqs.map((faq, faqIndex) => (
                    <FAQAccordion
                      key={faqIndex}
                      faq={faq}
                      isOpen={openItems[`${categoryIndex}-${faqIndex}`] || false}
                      onToggle={() => toggleItem(categoryIndex, faqIndex)}
                    />
                  ))}
                </div>
              </section>
            </FadeInOnScroll>
          ))}
        </div>

        {/* Contact Section */}
        <FadeInOnScroll delay={0.2}>
          <div className="mt-16 text-center border-t border-foreground/10 pt-12">
            <h3 className="font-vegawanty text-2xl text-foreground mb-3">
              Still Have Questions?
            </h3>
            <p className="font-manrope text-sm md:text-base text-secondary/80 mb-6">
              We're here to help! Reach out to us for any inquiries or concerns.
            </p>
            <a
              href="/contact"
              className="inline-block font-manrope text-sm md:text-base bg-secondary text-background hover:bg-foreground border-2 border-secondary hover:border-foreground rounded px-6 py-3 transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </FadeInOnScroll>
      </div>
    </main>
  );
}

