import { PageBanner } from "@/components/layout/PageBanner";

import FAQWidget from "@/components/widgets/FAQWidget";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Contact Us"
        description="Leave your details and our team will prepare a tailored quote for your facility."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">FAQs</h3>
            <div className="mt-6">
              <FAQWidget />
            </div>
          </div>
          <ContactForm variant="card" />
        </div>
      </div>
    </div>
  );
}
