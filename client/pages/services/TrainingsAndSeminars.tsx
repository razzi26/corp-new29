import { Link } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { Button } from "@/components/Button";
import { GraduationCap, CheckCircle, Users, Trophy } from "lucide-react";
import trainingsData from "@/config/data/trainings.json";
import TrainingsSection from "@/components/services/TrainingsSection";

const ICONS: Record<string, any> = {
  GraduationCap,
  CheckCircle,
  Users,
  Trophy,
};

export default function TrainingsAndSeminars() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title={trainingsData.title}
        description={trainingsData.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: trainingsData.title },
        ]}
      />
      <TrainingsSection />
    </div>
  );
}
