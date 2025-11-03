import React from "react";
import commissioningData from "@/config/data/commissioning.json";
import { Wrench, Building2 } from "lucide-react";
import { Button } from "@/components/Button";
import { Link } from "react-router-dom";

const ICONS: Record<string, any> = { Wrench, Building2 };

export default function CommissioningSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="w-16 h-1 bg-brand-secondary mb-4"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-[hsl(205_100%_12%)] mb-4">
                {commissioningData.title}
              </h2>
              {commissioningData.intro.map((p, i) => (
                <p
                  key={i}
                  className="text-base md:text-lg text-slate-700 leading-relaxed mb-4"
                >
                  {p}
                </p>
              ))}
            </div>

            <div>
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Services Offered</h3>
                <div className="space-y-3">
                  {commissioningData.services.map((s) => (
                    <div key={s} className="flex items-start gap-3">
                      <span className="text-[hsl(var(--primary))] mt-1">•</span>
                      <span className="text-slate-700">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 mt-6">
                {commissioningData.features.map((f) => {
                  const Icon = ICONS[f.icon] ?? Wrench;
                  return (
                    <div key={f.title} className="flex gap-4 items-start">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10">
                          <Icon className="h-5 w-5 text-[hsl(var(--primary))]" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold">{f.title}</h4>
                        <p className="text-sm text-slate-700">{f.descr}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 pt-6">
        <div className="text-center">
          <Button asChild size="md">
            <Link to={commissioningData.cta.href}>
              {commissioningData.cta.text}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
