import { PageBanner } from "@/components/layout/PageBanner";

export default function Trainings() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Trainings"
        description="Instructor-led and online biosafety trainings for laboratory professionals. Certification prep, workshops, and tailored programs."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Seminars", href: "/seminars/seminars" },
          { label: "Trainings" },
        ]}
      />
      <div className="container mx-auto px-4 py-12">
        <p className="text-base text-slate-700 max-w-prose">
          Instructor-led and online biosafety trainings designed for laboratory
          professionals. We offer certification prep, best practices workshops,
          and custom curricula for teams.
        </p>
      </div>
    </div>
  );
}
