"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { openWhatsAppEnquiry } from "@/lib/whatsapp";
import { trackFormSubmit, trackWhatsAppClick } from "@/lib/analytics/events";

type Props = {
  compact?: boolean;
  idPrefix?: string;
  source?: string;
};

export default function ContactForm({
  compact = false,
  idPrefix = "contact",
  source = "Contact form",
}: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackFormSubmit(compact ? "hero_contact" : "contact");
    trackWhatsAppClick(compact ? "hero_contact_form" : "contact_form");
    openWhatsAppEnquiry({
      name: form.name,
      phone: form.phone,
      email: form.email,
      message: form.message,
      source,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={compact ? "text-center py-6" : "text-center py-12"}>
        <CheckCircle className={`${compact ? "w-10 h-10" : "w-14 h-14"} text-emerald-500 mx-auto mb-3`} />
        <h3 className={`${compact ? "text-lg" : "text-xl"} font-bold mb-2`}>WhatsApp opened!</h3>
        <p className="text-stone-500 text-sm max-w-sm mx-auto">
          Your enquiry is ready in WhatsApp. Tap <strong>Send</strong> there to deliver it to our team.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", phone: "", email: "", message: "" });
          }}
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor={`${idPrefix}-name`} className="sr-only">
              Full Name
            </label>
            <input
              id={`${idPrefix}-name`}
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2.5 text-sm rounded-lg border border-surface-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
              placeholder="Your name *"
            />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-phone`} className="sr-only">
              Phone Number
            </label>
            <input
              id={`${idPrefix}-phone`}
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3 py-2.5 text-sm rounded-lg border border-surface-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
              placeholder="Phone number *"
            />
          </div>
        </div>
        <div>
          <label htmlFor={`${idPrefix}-message`} className="sr-only">
            Message
          </label>
          <textarea
            id={`${idPrefix}-message`}
            required
            rows={2}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-surface-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 resize-none"
            placeholder="What product or installation do you need? *"
          />
        </div>
        <button
          type="submit"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-2.5 text-sm bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20bd5a] transition-colors"
        >
          <Send className="w-4 h-4" />
          Send on WhatsApp
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${idPrefix}-name`} className="block text-sm font-medium mb-1.5">
            Full Name *
          </label>
          <input
            id={`${idPrefix}-name`}
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-shadow"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-phone`} className="block text-sm font-medium mb-1.5">
            Phone Number *
          </label>
          <input
            id={`${idPrefix}-phone`}
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-shadow"
            placeholder="+91 98765 43210"
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-email`} className="block text-sm font-medium mb-1.5">
          Email Address
        </label>
        <input
          id={`${idPrefix}-email`}
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-shadow"
          placeholder="you@email.com"
        />
      </div>

      <div>
        <label htmlFor={`${idPrefix}-message`} className="block text-sm font-medium mb-1.5">
          Message *
        </label>
        <textarea
          id={`${idPrefix}-message`}
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-shadow resize-none"
          placeholder="Tell us about your project or product inquiry..."
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 px-8 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20bd5a] transition-colors"
      >
        <Send className="w-4 h-4" />
        Send on WhatsApp
      </button>
    </form>
  );
}
