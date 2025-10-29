import { PageBanner } from "@/components/layout/PageBanner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FAQWidget from "@/components/widgets/FAQWidget";

export default function Faq() {
  
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="FAQ"
        description="Answers to the most common questions about delivery, installation and certifications."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "FAQ" }]}
      />
      <div className="container mx-auto px-4 py-12">
        <FAQWidget />
      </div>
    </div>
  );
}
