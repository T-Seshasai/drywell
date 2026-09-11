import Link from "next/link";
import Image from "next/image";
import { categories, store } from "@/lib/store";
import { logoPath } from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-teal-100 mt-auto">
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block bg-white rounded-xl px-4 py-3 mb-4 shadow-sm">
              <Image
                src={logoPath}
                alt="Drywell Hangers"
                width={280}
                height={72}
                className="h-16 sm:h-[4.75rem] w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-4 text-teal-200/80">{store.description}</p>
            <p className="text-sm">{store.phone} · {store.email}</p>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-4">Products</p>
            <ul className="space-y-2 text-sm">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.slug}><Link href={`/products/${cat.slug}`} className="hover:text-white">{cat.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-4">Company</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/locations/hyderabad" className="hover:text-white">Hyderabad</Link></li>
              <li><Link href="/locations/secunderabad" className="hover:text-white">Secunderabad</Link></li>
              <li><Link href="/quote" className="hover:text-white">Get Quote</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-white">Terms</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-white">Shipping</Link></li>
              <li><Link href="/return-policy" className="hover:text-white">Returns</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-teal-800 mt-10 pt-6 text-xs text-center text-teal-300/70">
          © {new Date().getFullYear()} {store.name}. {store.tagline}.
        </div>
      </div>
    </footer>
  );
}
