import React from "react";
import validationData from "@/config/data/validation.json";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/Button";
import { Link } from "react-router-dom";

export default function ValidationSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
          <div>
            <div className="w-16 h-1 bg-brand-secondary mb-4"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-[hsl(205_100%_12%)] mb-4">{validationData.title}</h2>
            {validationData.intro.map((p, i) => (
              <p key={i} className="text-base md:text-lg text-slate-700 leading-relaxed mb-4">{p}</p>
            ))}
          </div>

          <div className="bg-slate-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Services Offered</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {validationData.services.map((s) => (
                <div key={s} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[hsl(var(--primary))] mt-0.5" />
                  <span className="text-slate-700">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6">
        <div className="text-center">
          <Button asChild size="md">
            <Link to={validationData.cta.href}>{validationData.cta.text}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
