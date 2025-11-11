"use client";

import { useState, FormEvent } from "react";
import FadeInOnScroll from "@/components/FadeInOnScroll";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setFormStatus({ type: 'loading', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: data.message || 'Thank you for contacting us! We will get back to you soon.'
        });
        // Clear form on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setFormStatus({
          type: 'error',
          message: data.error || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Failed to send message. Please check your connection and try again.'
      });
    }
  };

  return (
    <main className="bg-background">
      {/* Header Section */}
      <FadeInOnScroll delay={0.1}>
        <section className="py-10 md:py-16 px-6 md:px-16">
          <div className="mx-auto max-w-5xl text-center">
            <p className="font-manrope text-xs uppercase tracking-[0.4em] text-secondary">
              Get in Touch
            </p>
            <h1 className="mt-3 font-vegawanty text-4xl text-foreground md:text-6xl">
              Contact Us
            </h1>
            <p className="mx-auto mt-5 max-w-2xl font-manrope text-sm text-secondary/80 md:text-base">
              Have a question about our gowns or services? We'd love to hear from you. 
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>
      </FadeInOnScroll>

      {/* Contact Info Section */}
      <FadeInOnScroll delay={0.15}>
        <section 
          className="py-12 md:py-16 px-6 md:px-16"
          style={{ background: 'linear-gradient(135deg, #f4c4b0 0%, #f5e6d3 40%, #e8d4d8 70%, #d9b8c4 100%)' }}
        >
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Location */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-vegawanty text-xl text-foreground mb-2">Visit Our Studio</h3>
                  <p className="font-manrope text-sm text-secondary/80">
                    Malabon City<br/>Metro Manila, Philippines
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-vegawanty text-xl text-foreground mb-2">Call Us</h3>
                  <p className="font-manrope text-sm text-secondary/80">
                    <a href="tel:+639762774888" className="hover:text-secondary transition-colors duration-300">
                      (+63) 976 277 4888
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-vegawanty text-xl text-foreground mb-2">Email Us</h3>
                  <p className="font-manrope text-sm text-secondary/80 break-all">
                    <a href="mailto:mysticalwardrobes01@gmail.com" className="hover:text-secondary transition-colors duration-300">
                      mysticalwardrobes01@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* Contact Form and Business Hours */}
      <FadeInOnScroll delay={0.2}>
        <section className="py-12 md:py-16 px-6 md:px-16">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-foreground/10 rounded-lg shadow-lg p-6 md:p-8">
                  <h2 className="font-vegawanty text-2xl md:text-3xl text-foreground mb-2">
                    Send Us a Message
                  </h2>
                  <p className="font-manrope text-sm text-secondary/80 mb-6">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block font-manrope text-sm font-medium text-secondary mb-2">
                        Name <span className="text-foreground">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-foreground/20 rounded-lg font-manrope text-sm text-secondary focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors duration-200"
                        placeholder="Your full name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block font-manrope text-sm font-medium text-secondary mb-2">
                        Email <span className="text-foreground">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-foreground/20 rounded-lg font-manrope text-sm text-secondary focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors duration-200"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block font-manrope text-sm font-medium text-secondary mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-foreground/20 rounded-lg font-manrope text-sm text-secondary focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors duration-200"
                        placeholder="+63 XXX XXX XXXX"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block font-manrope text-sm font-medium text-secondary mb-2">
                        Message <span className="text-foreground">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-foreground/20 rounded-lg font-manrope text-sm text-secondary focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors duration-200 resize-none"
                        placeholder="Tell us about your inquiry..."
                      />
                    </div>

                    {/* Status Message */}
                    {formStatus.type !== 'idle' && (
                      <div
                        className={`p-4 rounded-lg font-manrope text-sm ${
                          formStatus.type === 'success'
                            ? 'bg-green-50 text-green-800 border border-green-200'
                            : formStatus.type === 'error'
                            ? 'bg-red-50 text-red-800 border border-red-200'
                            : 'bg-blue-50 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {formStatus.message || (formStatus.type === 'loading' ? 'Sending your message...' : '')}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formStatus.type === 'loading'}
                      className="w-full font-manrope text-base bg-secondary text-background hover:bg-foreground border-2 border-secondary hover:border-foreground rounded-lg px-6 py-3 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formStatus.type === 'loading' ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Business Hours */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-foreground/10 rounded-lg shadow-lg p-6">
                  <h3 className="font-vegawanty text-xl text-foreground mb-4">
                    Business Hours
                  </h3>
                  <div className="space-y-3 font-manrope text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-foreground/10">
                      <span className="text-secondary/80">Monday - Friday</span>
                      <span className="text-secondary font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-foreground/10">
                      <span className="text-secondary/80">Saturday</span>
                      <span className="text-secondary font-medium">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-secondary/80">Sunday</span>
                      <span className="text-secondary font-medium">Closed</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-foreground/10">
                    <p className="font-manrope text-xs text-secondary/70 mb-4">
                      Note: Please message us for booking appointments. Walk-ins are not guaranteed immediate service.
                    </p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white border border-foreground/10 rounded-lg shadow-lg p-6 mt-6">
                  <h3 className="font-vegawanty text-xl text-foreground mb-4">
                    Follow Us
                  </h3>
                  <p className="font-manrope text-sm text-secondary/80 mb-4">
                    Stay connected with us on social media for the latest updates and gown collections.
                  </p>
                  <div className="flex space-x-4">
                    <a 
                      href="https://www.facebook.com/MysticalWardrobes/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-colors duration-300"
                      aria-label="Facebook"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.instagram.com/mysticalwardrobes" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-colors duration-300"
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.tiktok.com/@mysticalwardrobes" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-colors duration-300"
                      aria-label="TikTok"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>
    </main>
  );
}

