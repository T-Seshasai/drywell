"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductImage from "@/components/shop/ProductImage";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/catalog";
import { getAttribution } from "@/lib/analytics/attribution";
import {
  trackViewCart,
  trackAddPaymentInfo,
  mapProductToAnalyticsItem,
} from "@/lib/analytics/events";
import CashOnDeliveryPayment from "@/components/payment/CashOnDeliveryPayment";
import PageHero from "@/components/layout/PageHero";
import PageContent from "@/components/layout/PageContent";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, MapPin, Banknote } from "lucide-react";

interface DeliveryForm {
  name: string;
  phone: string;
  flatNo: string;
  blockId: string;
  apartmentName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const emptyForm: DeliveryForm = {
  name: "",
  phone: "",
  flatNo: "",
  blockId: "",
  apartmentName: "",
  address: "",
  city: "Hyderabad",
  state: "Telangana",
  pincode: "",
};

export default function CartPage() {
  const { items, setQuantity, removeItem, subtotal, shipping, total, clear } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<DeliveryForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;
    trackViewCart(
      items.map((i) =>
        mapProductToAnalyticsItem(
          { id: i.productId, name: i.name, categorySlug: i.categorySlug, price: i.price },
          i.quantity
        )
      ),
      total
    );
  }, [items, total]);

  if (items.length === 0 && !showCheckout) {
    return (
      <>
        <PageHero title="Your Cart" description="Review items before checkout." centered />
        <PageContent>
          <div className="py-16 text-center">
            <ShoppingBag className="w-14 h-14 text-surface-200 mx-auto mb-5" />
            <p className="text-stone-500 mb-4">Your cart is empty</p>
            <Link href="/products" className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-medium rounded-lg">
              <ArrowLeft className="w-4 h-4" /> Browse products
            </Link>
          </div>
        </PageContent>
      </>
    );
  }

  const isFormValid =
    form.name.trim() &&
    form.phone.trim() &&
    form.flatNo.trim() &&
    form.blockId.trim() &&
    form.apartmentName.trim() &&
    form.address.trim() &&
    form.pincode.trim();

  const handleContinueToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!isFormValid) {
      setFormError("Please fill all required delivery details.");
      return;
    }

    setLoading(true);
    trackAddPaymentInfo(
      items.map((i) =>
        mapProductToAnalyticsItem(
          { id: i.productId, name: i.name, categorySlug: i.categorySlug, price: i.price },
          i.quantity
        )
      ),
      total
    );

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
          paymentMethod: "cod",
          attribution: getAttribution(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not create order");

      setOrderId(data.orderId);
      setShowCheckout(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentDone = () => {
    clear();
    router.push(`/order-success/${orderId}`);
  };

  return (
    <>
      <PageHero
        title="Your Cart"
        description="Add delivery details, then confirm your Cash on Delivery order"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cart" },
        ]}
      />
      <PageContent className="py-8">
      {showCheckout && orderId && (
        <div className="mb-8">
          <div className="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm">
            <p className="font-semibold text-emerald-800">Delivery details saved</p>
            <p className="text-emerald-700 mt-1">
              {form.name} · {form.apartmentName}, Block {form.blockId}, Flat {form.flatNo}
            </p>
            <p className="text-emerald-600">{form.address}, {form.city} — {form.pincode}</p>
            <p className="text-emerald-600">Phone: {form.phone}</p>
          </div>
          <CashOnDeliveryPayment amount={total} orderId={orderId} />
          <button
            type="button"
            onClick={handlePaymentDone}
            className="w-full mt-4 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700"
          >
            Confirm Cash on Delivery order
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Cart items */}
          <section className="space-y-4">
            <h2 className="font-semibold text-lg">Order items</h2>
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4 p-4 bg-white rounded-2xl border border-surface-200">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-surface-100 flex-shrink-0">
                  <ProductImage src={item.image} alt={item.name} fill compactWatermark className="object-cover" />
                </div>
                <div className="flex-1">
                  <Link href={`/products/${item.categorySlug}/${item.slug}`} className="font-medium hover:underline">
                    {item.name}
                  </Link>
                  <p className="text-sm font-bold mt-1">{formatPrice(item.price)}</p>
                  {!showCheckout && (
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border rounded-full text-sm">
                        <button type="button" onClick={() => setQuantity(item.productId, item.quantity - 1)} className="p-1.5">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button type="button" onClick={() => setQuantity(item.productId, item.quantity + 1)} className="p-1.5">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button type="button" onClick={() => removeItem(item.productId)} className="text-stone-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="font-bold text-sm">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </section>

          {/* Delivery form */}
          {!showCheckout && (
            <section className="bg-white rounded-2xl border border-surface-200 p-6">
              <div className="flex items-center gap-2 mb-5">
                <MapPin className="w-5 h-5 text-brand-600" />
                <h2 className="font-semibold text-lg">Delivery details</h2>
              </div>

              <form onSubmit={handleContinueToPayment} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Full name *</label>
                    <input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone number *</label>
                    <input
                      id="phone"
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="apartmentName" className="block text-sm font-medium mb-1">Apartment name *</label>
                    <input
                      id="apartmentName"
                      required
                      value={form.apartmentName}
                      onChange={(e) => setForm({ ...form, apartmentName: e.target.value })}
                      placeholder="e.g. My Home Avatar"
                      className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="blockId" className="block text-sm font-medium mb-1">Block / Tower ID *</label>
                    <input
                      id="blockId"
                      required
                      value={form.blockId}
                      onChange={(e) => setForm({ ...form, blockId: e.target.value })}
                      placeholder="e.g. Block A, Tower 2"
                      className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="flatNo" className="block text-sm font-medium mb-1">Flat no. *</label>
                    <input
                      id="flatNo"
                      required
                      value={form.flatNo}
                      onChange={(e) => setForm({ ...form, flatNo: e.target.value })}
                      placeholder="e.g. 502"
                      className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium mb-1">Pincode *</label>
                    <input
                      id="pincode"
                      required
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      placeholder="500084"
                      className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-1">Full address *</label>
                  <textarea
                    id="address"
                    required
                    rows={3}
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Street, landmark, area"
                    className="w-full px-4 py-3 rounded-lg border border-surface-200 resize-none focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                    <input
                      id="city"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-surface-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
                    <input
                      id="state"
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-surface-200"
                    />
                  </div>
                </div>

                {formError && <p className="text-sm text-red-600">{formError}</p>}

                <button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 disabled:opacity-50 transition-colors"
                >
                  <Banknote className="w-5 h-5" />
                  {loading ? "Processing..." : `Place Order — Cash on Delivery ${formatPrice(total)}`}
                </button>
              </form>
            </section>
          )}
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl border border-surface-200 p-6 h-fit sticky top-24">
          <h2 className="font-semibold mb-4">Order summary</h2>
          <div className="flex justify-between text-sm text-stone-500 mb-2">
            <span>Subtotal ({items.reduce((n, i) => n + i.quantity, 0)} items)</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-emerald-600 mb-2">
            <span>Shipping</span>
            <span>{shipping ? formatPrice(shipping) : "Free"}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t border-surface-200 pt-3">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          {!showCheckout ? (
            <p className="text-xs text-stone-400 mt-4 text-center">
              Fill delivery details to place a Cash on Delivery order
            </p>
          ) : (
            <p className="text-xs text-brand-600 mt-4 text-center font-medium">
              Pay {formatPrice(total)} when delivered and installed
            </p>
          )}

          <Link href="/products" className="block text-center text-sm text-stone-500 hover:text-brand-700 mt-4">
            Continue shopping
          </Link>
        </div>
      </div>
      </PageContent>
    </>
  );
}
