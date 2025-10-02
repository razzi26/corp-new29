import { PageBanner } from "@/components/layout/PageBanner";

export default function SeminarsPage() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Seminars"
        description="Live and virtual seminars on biosafety standards, risk assessment, cabinet certification, and facility workflows."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Seminars" },
        ]}
      />
      <div className="container mx-auto px-4 py-12">
        <p className="text-base text-slate-700 max-w-prose">
          Live and virtual seminars covering biosafety standards, risk
          assessment, cabinet certification, and facility workflows. Join
          upcoming sessions or request a dedicated seminar for your team.
        </p>
      </div>
    </div>
  );
}
