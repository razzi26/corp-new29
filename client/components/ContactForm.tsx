import React from "react";
import ContactsDetailsWidget from "@/components/widgets/ContactsDetailsWidget";
import { Button } from "@/components/Button";

interface ContactFormProps {
  onSubmit?: (data: Record<string, any>) => void;
}

export default function ContactForm({
  onSubmit,
}: ContactFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(form.entries());

    if (onSubmit) {
      onSubmit(data);
    } else {
      console.log(data);
      alert("Thank you! We will contact you shortly.");
    }

    (e.currentTarget as HTMLFormElement).reset();
  };


  return (
    <form onSubmit={handleSubmit} className="bg-white">
      <div className="grid gap-8">
        <div className="border-b border-slate-300 pb-8">
          <div className="text-slate-700 text-base leading-relaxed">
            <ContactsDetailsWidget />
          </div>
        </div>

        <label className="grid gap-2 text-base font-semibold">
          <span>Name</span>
          <input
            name="name"
            required
            className="h-12 bg-white text-slate-900 border-2 border-slate-300 px-4 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
          />
        </label>
        <label className="grid gap-2 text-base font-semibold">
          <span>Phone or email</span>
          <input
            name="contact"
            required
            className="h-12 bg-white text-slate-900 border-2 border-slate-300 px-4 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
          />
        </label>
        <label className="grid gap-2 text-base font-semibold">
          <span>Message</span>
          <textarea
            name="message"
            rows={4}
            className="bg-white text-slate-900 border-2 border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
          />
        </label>

        <Button
          variant="primary"
          size="lg"
          className="bg-brand-secondary hover:bg-brand-secondary/90"
        >
          Send request
        </Button>
        <p className="text-sm text-slate-500">
          By submitting, you agree to the processing of personal data.
        </p>
      </div>
    </form>
  );
}
