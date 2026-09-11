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

export const metadata = { title: "Return Policy" };

export default function ReturnPolicyPage() {
  return (
    <LegalPage title="Return Policy">
      <p>Return eligibility depends on product category and condition. Custom-measured and installed products may not be returnable once fabrication or installation has started.</p>
      <p>Configure your official return window and process here before production launch.</p>
    </LegalPage>
  );
}
