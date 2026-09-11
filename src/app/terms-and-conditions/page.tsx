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

export const metadata = { title: "Terms and Conditions" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions">
      <p>By using this website and submitting enquiries or orders, you agree to these terms. Configure your official terms with legal counsel before production launch.</p>
      <p>Product specifications, pricing, and installation scope are confirmed at the time of quotation or order confirmation.</p>
    </LegalPage>
  );
}
