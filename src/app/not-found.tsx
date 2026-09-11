import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-28 text-center">
      <p className="text-6xl font-bold text-surface-200">404</p>
      <h1 className="text-xl font-bold mt-4 mb-2">Page not found</h1>
      <p className="text-stone-500 text-sm mb-6">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-900 text-white text-sm font-medium rounded-full"
      >
        <ArrowLeft className="w-4 h-4" />
        Back home
      </Link>
    </div>
  );
}
