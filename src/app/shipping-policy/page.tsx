import PageHero from "@/components/layout/PageHero";
import PageContent from "@/components/layout/PageContent";

function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero
        title={title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: title },
        ]}
      />
      <PageContent narrow>
        <div className="prose prose-stone max-w-none bg-white rounded-2xl border border-surface-200 p-6 sm:p-8 shadow-soft">
          {children}
        </div>
      </PageContent>
    </>
  );
}

export const metadata = { title: "Shipping Policy" };

export default function ShippingPolicyPage() {
  return (
    <LegalPage title="Shipping Policy">
      <p>Shipping availability and charges depend on product type and delivery location within Hyderabad and Secunderabad.</p>
      <p>Configure your official shipping timelines and charges here before production launch.</p>
    </LegalPage>
  );
}
