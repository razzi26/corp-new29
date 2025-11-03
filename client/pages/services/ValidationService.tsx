import { PageBanner } from "@/components/layout/PageBanner";
import validationData from "@/config/data/validation.json";
import ValidationSection from "@/components/services/ValidationSection";

export default function ValidationService() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title={validationData.title}
        description={validationData.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: validationData.title },
        ]}
      />

      <ValidationSection />
    </div>
  );
}
