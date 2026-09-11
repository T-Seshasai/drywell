"use client";

import Link from "next/link";
import { ShoppingBag, Menu, Phone, Search, MapPin } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { store } from "@/lib/store";
import { useCart } from "@/context/CartContext";
import { trackPhoneClick, trackWhatsAppClick } from "@/lib/analytics/events";
import TopOfferBar from "@/components/home/urban/TopOfferBar";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import Logo from "@/components/ui/Logo";
import { CategoryStrip, MegaMenuMobile, NavDrawer } from "@/components/layout/MegaMenu";

const navLinks = [
  { href: "/products", label: "All Products" },
  { href: "/quote", label: "Get Quote" },
  { href: "/faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const whatsappUrl = `https://wa.me/${store.whatsapp}?text=${encodeURIComponent("Hi, I need a quote.")}`;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <TopOfferBar />

      <div className="border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 min-h-[4.5rem] sm:min-h-20 py-2 flex items-center gap-4">
          <Logo priority />

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search cloth hangers, grills, shoe racks..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface-50 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
              />
            </div>
          </form>

          <div className="flex items-center gap-1 sm:gap-2 ml-auto">
            <span className="hidden lg:inline-flex items-center gap-1 text-xs text-stone-500 mr-2">
              <MapPin className="w-3.5 h-3.5" />
              Hyderabad
            </span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("header")}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-lg transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <a
              href={`tel:${store.phone}`}
              onClick={() => trackPhoneClick("header")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm bg-accent-500 text-white rounded-lg hover:bg-accent-600"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden md:inline">Call</span>
            </a>
            <Link href="/cart" className="relative p-2.5 rounded-lg hover:bg-surface-100">
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-brand-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="lg:hidden p-2.5 rounded-lg hover:bg-surface-100"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Single nav bar — categories + quick links */}
      <CategoryStrip onOpenMenu={() => setMenuOpen(true)} navLinks={navLinks} />

      <NavDrawer open={menuOpen} onClose={closeMenu}>
        <form onSubmit={handleSearch} className="md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface-50 border border-surface-200 rounded-lg"
            />
          </div>
        </form>

        <MegaMenuMobile onClose={closeMenu} />

        <div className="grid grid-cols-2 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-sm font-medium text-stone-700 py-2.5 px-3 rounded-lg bg-surface-50 text-center active:bg-brand-50"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("mobile_menu")}
          className="flex items-center justify-center gap-2 w-full px-4 py-3.5 text-sm font-semibold text-white bg-[#25D366] rounded-lg"
        >
          <WhatsAppIcon className="w-5 h-5" />
          WhatsApp
        </a>
        <a
          href={`tel:${store.phone}`}
          onClick={() => {
            trackPhoneClick("mobile_menu");
            closeMenu();
          }}
          className="flex items-center justify-center gap-2 w-full px-4 py-3.5 text-sm font-semibold text-white bg-accent-500 rounded-lg hover:bg-accent-600"
        >
          <Phone className="w-5 h-5" />
          Call {store.phone}
        </a>
      </NavDrawer>
    </header>
  );
}
