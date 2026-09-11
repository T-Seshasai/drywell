import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import AppShell from "@/components/layout/AppShell";
import GoogleTagManager, { GoogleTagManagerNoScript } from "@/components/analytics/GoogleTagManager";
import AttributionCapture from "@/components/analytics/AttributionCapture";
import JsonLd from "@/components/shop/JsonLd";
import { localBusinessJsonLd } from "@/lib/schema/jsonld";
import { store } from "@/lib/store";
import { absoluteUrl } from "@/lib/config/business";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${store.name} — ${store.tagline}`,
    template: `%s | ${store.name}`,
  },
  description: store.description,
  alternates: { canonical: absoluteUrl("/") },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={localBusinessJsonLd()} />
      </head>
      <body className={`${font.variable} font-sans`}>
        <GoogleTagManagerNoScript />
        <GoogleTagManager />
        <AttributionCapture />
        <CartProvider>
          <AppShell>{children}</AppShell>
        </CartProvider>
      </body>
    </html>
  );
}
