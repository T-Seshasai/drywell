"use client";

import { useState } from "react";
import Image from "next/image";
import { store, formatPrice } from "@/lib/store";
import { Copy, Check, Smartphone } from "lucide-react";

function generatePaymentId(orderId?: string) {
  if (orderId) return orderId;
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `PP${timestamp}${random}`;
}

export default function PhonePePayment({
  amount,
  orderId,
  onClose,
}: {
  amount: number;
  orderId?: string;
  onClose?: () => void;
}) {
  const [paymentId] = useState(() => generatePaymentId(orderId));
  const [copied, setCopied] = useState(false);

  const upiString = `upi://pay?pa=${store.upiId}&pn=${encodeURIComponent(store.name)}&am=${amount}&cu=INR&tn=${paymentId}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiString)}`;

  const copyPaymentId = async () => {
    await navigator.clipboard.writeText(paymentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-surface-200 rounded-2xl p-6 bg-white shadow-soft">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#5f259f] flex items-center justify-center">
          <Smartphone className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold">Pay with UPI / PhonePe</h3>
          <p className="text-xs text-stone-500">Scan QR code or pay to UPI ID below</p>
        </div>
      </div>

      <div className="flex flex-col items-center py-4">
        <div className="relative w-[250px] h-[250px] rounded-xl overflow-hidden border-2 border-[#5f259f]/20 bg-white p-2">
          <Image
            src={qrUrl}
            alt="UPI QR Code"
            width={250}
            height={250}
            className="w-full h-full"
            unoptimized
          />
        </div>
        <p className="text-2xl font-bold mt-4">{formatPrice(amount)}</p>
        <p className="text-xs text-stone-400 mt-1 text-center">
          Open PhonePe / GPay / Paytm → Scan QR → Confirm payment
        </p>
      </div>

      <div className="mt-3 p-3 rounded-lg bg-surface-50 border border-surface-200 text-center">
        <p className="text-xs text-stone-500 mb-1">Or pay directly to UPI ID</p>
        <p className="font-mono font-semibold text-brand-700">{store.upiId}</p>
      </div>

      <div className="mt-4 p-4 bg-surface-50 rounded-xl border border-surface-200">
        <p className="text-xs text-stone-500 mb-1">Payment / Order ID</p>
        <div className="flex items-center justify-between gap-2">
          <code className="text-sm font-mono font-semibold text-[#5f259f] break-all">
            {paymentId}
          </code>
          <button
            type="button"
            onClick={copyPaymentId}
            className="flex-shrink-0 p-2 rounded-lg hover:bg-surface-200 transition-colors"
            aria-label="Copy payment ID"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4 text-stone-400" />
            )}
          </button>
        </div>
        <p className="text-xs text-stone-400 mt-2">
          Share this ID after payment so we can verify your order.
        </p>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="w-full mt-4 py-2.5 text-sm text-stone-500 hover:text-black transition-colors"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
