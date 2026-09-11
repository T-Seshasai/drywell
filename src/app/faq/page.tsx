import FAQSection from "@/components/home/FAQSection";
import PageHero from "@/components/layout/PageHero";
import PageContent from "@/components/layout/PageContent";
import { business } from "@/lib/config/business";

export const metadata = {
  title: `FAQ | ${business.name}`,
  description: "Common questions about cloth hangers, nets, grills, shoe racks and installation in Hyderabad.",
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        description="Answers about products, installation and service across Hyderabad & Secunderabad."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQ" },
        ]}
        centered
      />
      <PageContent>
        <FAQSection />
      </PageContent>
    </>
  );
}
