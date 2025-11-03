import { PageBanner } from "@/components/layout/PageBanner";
import commissioningData from "@/config/data/commissioning.json";
import CommissioningSection from "@/components/services/CommissioningSection";

export default function CommissioningAndQualification() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title={commissioningData.title}
        description={commissioningData.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: commissioningData.title },
        ]}
      />

      <CommissioningSection />
    </div>
  );
}
