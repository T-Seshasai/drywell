"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { business } from "@/lib/config/business";
import { getAttribution } from "@/lib/analytics/attribution";
import { trackFormSubmit, trackQuoteRequest } from "@/lib/analytics/events";
import PageHero from "@/components/layout/PageHero";
import PageContent from "@/components/layout/PageContent";
import { CheckCircle } from "lucide-react";

function QuoteFormInner() {
  const params = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [quoteId, setQuoteId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    requirement: params.get("measurement") ? "Request site measurement and quotation." : "",
    preferredContact: "whatsapp" as "phone" | "whatsapp" | "email",
  });

  const categorySlug = params.get("category") ?? undefined;
  const productSlug = params.get("product") ?? undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    trackFormSubmit("quote");

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          categorySlug,
          productSlug,
          attribution: getAttribution(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to submit");

      setQuoteId(data.quoteId);
      setSubmitted(true);
      trackQuoteRequest(categorySlug ?? "general");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Quote request received</h2>
        <p className="text-stone-500">Reference: {quoteId}. We will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-1">Name *</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-surface-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone *</label>
        <input
          required
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-surface-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-surface-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Location / Area *</label>
        <input
          required
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-surface-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Requirement *</label>
        <textarea
          required
          rows={4}
          value={form.requirement}
          onChange={(e) => setForm({ ...form, requirement: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-surface-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Preferred contact</label>
        <select
          value={form.preferredContact}
          onChange={(e) =>
            setForm({ ...form, preferredContact: e.target.value as typeof form.preferredContact })
          }
          className="w-full px-4 py-3 rounded-lg border border-surface-200"
        >
          <option value="whatsapp">WhatsApp</option>
          <option value="phone">Phone</option>
          <option value="email">Email</option>
        </select>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="px-8 py-3 bg-brand-600 text-white font-semibold rounded-lg disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Quote Request"}
      </button>
    </form>
  );
}

export default function QuotePage() {
  return (
    <>
      <PageHero
        title="Get a Free Quote"
        description={`For installation-based and custom-size products across ${business.primaryCities.join(" & ")}.`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get Quote" },
        ]}
      />
      <PageContent narrow>
        <div className="bg-white rounded-2xl border border-surface-200 p-6 sm:p-8 shadow-soft">
          <Suspense fallback={<p className="text-stone-500">Loading form...</p>}>
            <QuoteFormInner />
          </Suspense>
        </div>
      </PageContent>
    </>
  );
}
