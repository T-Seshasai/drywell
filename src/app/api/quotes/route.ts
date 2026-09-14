import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/catalog";
import { generateQuoteId, saveQuote } from "@/lib/orders/memory-store";
import { notifyNewQuote } from "@/lib/notifications";
import { QuoteRequest, OrderAttribution } from "@/types/catalog";

interface QuotePayload {
  name: string;
  phone: string;
  email?: string;
  productSlug?: string;
  categorySlug?: string;
  quantity?: number;
  location: string;
  requirement: string;
  preferredContact: "phone" | "whatsapp" | "email";
  attribution?: OrderAttribution;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as QuotePayload;

    if (!body.name || !body.phone || !body.location || !body.requirement) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let productName: string | undefined;
    if (body.productSlug && body.categorySlug) {
      const product = products.find(
        (p) => p.slug === body.productSlug && p.categorySlug === body.categorySlug
      );
      productName = product?.name;
    }

    const quote: QuoteRequest = {
      quoteId: generateQuoteId(),
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email?.trim(),
      productSlug: body.productSlug,
      productName,
      categorySlug: body.categorySlug,
      quantity: body.quantity,
      location: body.location.trim(),
      requirement: body.requirement.trim(),
      preferredContact: body.preferredContact ?? "phone",
      createdAt: new Date().toISOString(),
      attribution: body.attribution,
    };

    saveQuote(quote);
    void notifyNewQuote(quote);

    return NextResponse.json({ quoteId: quote.quoteId });
  } catch {
    return NextResponse.json({ error: "Failed to submit quote" }, { status: 500 });
  }
}
