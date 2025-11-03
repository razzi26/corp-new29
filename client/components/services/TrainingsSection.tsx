import React from "react";
import trainingsData from "@/config/data/trainings.json";
import { GraduationCap, CheckCircle, Users, Trophy } from "lucide-react";
import { Button } from "@/components/Button";
import { Link } from "react-router-dom";

const ICONS: Record<string, any> = { GraduationCap, CheckCircle, Users, Trophy };

export default function TrainingsSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="w-16 h-1 bg-brand-secondary mb-4"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-[hsl(205_100%_12%)] mb-4">
                {trainingsData.title}
              </h2>
              {trainingsData.intro.map((p, i) => (
                <p key={i} className="text-base md:text-lg text-slate-700 leading-relaxed mb-4">
                  {p}
                </p>
              ))}
            </div>

            <div className="grid gap-6">
              {trainingsData.features.map((f) => {
                const Icon = ICONS[f.icon] ?? GraduationCap;
                return (
                  <div key={f.title} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10">
                        <Icon className="h-5 w-5 text-[hsl(var(--primary))]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">{f.title}</h3>
                      <p className="text-sm text-slate-700">{f.descr}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-6">
            <Button asChild size="md">
              <Link to={trainingsData.cta.href}>{trainingsData.cta.text}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
