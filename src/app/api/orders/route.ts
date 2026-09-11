import { NextRequest, NextResponse } from "next/server";
import { products, getEffectivePrice, isPurchasable } from "@/lib/catalog";
import {
  generateOrderId,
  saveOrder,
} from "@/lib/orders/memory-store";
import { Order, OrderAttribution } from "@/types/catalog";

interface OrderPayload {
  customer: {
    name: string;
    phone: string;
    email?: string;
    flatNo: string;
    blockId: string;
    apartmentName: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: { productId: string; quantity: number; variantId?: string }[];
  paymentMethod?: string;
  attribution?: OrderAttribution;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as OrderPayload;

    const c = body.customer;
    if (
      !c?.name ||
      !c?.phone ||
      !c?.flatNo ||
      !c?.blockId ||
      !c?.apartmentName ||
      !c?.address ||
      !c?.pincode ||
      !body.items?.length
    ) {
      return NextResponse.json({ error: "Please fill all delivery details" }, { status: 400 });
    }

    const orderItems = [];
    let subtotal = 0;

    for (const line of body.items) {
      const product = products.find((p) => p.id === line.productId);
      if (!product || !isPurchasable(product)) {
        return NextResponse.json(
          { error: `Product ${line.productId} is not available for online purchase` },
          { status: 400 }
        );
      }

      const price = getEffectivePrice(product, line.variantId);
      if (!price) {
        return NextResponse.json(
          { error: `Price unavailable for ${product.name}` },
          { status: 400 }
        );
      }

      const qty = Math.max(1, Math.min(99, line.quantity || 1));
      orderItems.push({
        productId: product.id,
        sku: product.sku,
        name: product.name,
        categorySlug: product.categorySlug,
        price,
        quantity: qty,
      });
      subtotal += price * qty;
    }

    const shipping = subtotal >= 3000 ? 0 : 149;
    const total = subtotal + shipping;

    const order: Order = {
      orderId: generateOrderId(),
      customer: body.customer,
      items: orderItems,
      subtotal,
      shipping,
      discount: 0,
      total,
      currency: "INR",
      paymentStatus: "pending",
      orderStatus: "pending",
      paymentMethod: body.paymentMethod ?? "upi",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      attribution: body.attribution,
    };

    saveOrder(order);

    return NextResponse.json({ orderId: order.orderId, total: order.total });
  } catch {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
