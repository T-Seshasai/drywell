import { formatPrice } from "@/lib/store";
import { Banknote, Truck, Wrench } from "lucide-react";

export default function CashOnDeliveryPayment({
  amount,
  orderId,
}: {
  amount: number;
  orderId: string;
}) {
  return (
    <div className="border border-surface-200 rounded-2xl p-6 bg-white shadow-soft">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
          <Banknote className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold">Cash on Delivery</h3>
          <p className="text-xs text-stone-500">Pay when your order is delivered and installed</p>
        </div>
      </div>

      <div className="text-center py-4">
        <p className="text-2xl font-bold">{formatPrice(amount)}</p>
        <p className="text-xs text-stone-400 mt-1">Amount due on delivery</p>
      </div>

      <ul className="space-y-3 text-sm text-stone-600">
        <li className="flex items-start gap-2">
          <Truck className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
          <span>Free delivery across Hyderabad & Secunderabad</span>
        </li>
        <li className="flex items-start gap-2">
          <Wrench className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
          <span>Professional installation included — pay after service</span>
        </li>
        <li className="flex items-start gap-2">
          <Banknote className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
          <span>Keep exact cash ready or pay via UPI to our technician on arrival</span>
        </li>
      </ul>

      <div className="mt-4 p-3 rounded-lg bg-surface-50 border border-surface-200 text-center">
        <p className="text-xs text-stone-500 mb-1">Order ID</p>
        <p className="font-mono font-semibold text-brand-700">{orderId}</p>
      </div>
    </div>
  );
}
