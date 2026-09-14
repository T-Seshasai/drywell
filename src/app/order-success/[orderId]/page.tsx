import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder } from "@/lib/orders/memory-store";
import { formatPrice } from "@/lib/catalog";
import PurchaseTracker from "@/components/analytics/PurchaseTracker";
import PageHero from "@/components/layout/PageHero";
import PageContent from "@/components/layout/PageContent";

type Props = { params: Promise<{ orderId: string }> };

export default async function OrderSuccessPage({ params }: Props) {
  const { orderId } = await params;
  const order = getOrder(orderId);
  if (!order) notFound();

  return (
    <>
      <PageHero
        title="Order Confirmed"
        description={`Order ID: ${order.orderId}`}
        centered
      />
      <PageContent narrow>
        <PurchaseTracker order={order} />
        <div className="bg-white rounded-2xl border border-surface-200 p-6 mb-6 text-left shadow-soft">
          <h2 className="font-semibold mb-3">Summary</h2>
          <ul className="space-y-2 text-sm mb-4">
            {order.items.map((i) => (
              <li key={i.productId} className="flex justify-between">
                <span>{i.name} × {i.quantity}</span>
                <span>{formatPrice(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
          <p className="text-xs text-stone-500 mt-3">
            Payment: {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod ?? order.paymentStatus}
          </p>
          <div className="mt-4 pt-4 border-t text-sm text-stone-600">
            <p className="font-medium text-stone-800 mb-1">Delivery to</p>
            <p>{order.customer.name} · {order.customer.phone}</p>
            <p>{order.customer.apartmentName}, Block {order.customer.blockId}, Flat {order.customer.flatNo}</p>
            <p>{order.customer.address}, {order.customer.city} — {order.customer.pincode}</p>
          </div>
        </div>
        <div className="text-center">
          <Link href="/products" className="inline-flex px-6 py-3 bg-brand-600 text-white rounded-lg font-medium">
            Continue Shopping
          </Link>
        </div>
      </PageContent>
    </>
  );
}
