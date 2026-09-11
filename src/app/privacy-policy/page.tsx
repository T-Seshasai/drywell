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

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>This policy describes how we collect and use contact information submitted through quote forms, checkout, and enquiry forms. Configure final legal text with your business advisor before production launch.</p>
      <p>We do not sell personal information. Data is used to respond to enquiries, process orders, and improve service.</p>
    </LegalPage>
  );
}
