import { PageBanner } from "@/components/layout/PageBanner";

import FAQWidget from "@/components/widgets/FAQWidget";
import ContactsDetailsWidget from "@/components/widgets/ContactsDetailsWidget";

export default function Contact() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Contact Us"
        description="Leave your details and our team will prepare a tailored quote for your facility."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">FAQs</h3>
            <div className="mt-6">
              <FAQWidget />
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget as HTMLFormElement);
              console.log(Object.fromEntries(form.entries()));
              alert("Thank you! We will contact you shortly.");
            }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
          >
            <div className="grid gap-4">
              <div className="rounded-md bg-slate-50 p-3 text-slate-700 text-sm">
                <div className="font-semibold mb-3">Contact details</div>
                <ContactsDetailsWidget />
              </div>

              <label className="grid gap-2 text-sm">
                <span>Name</span>
                <input
                  name="name"
                  required
                  className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 outline-none focus:ring-2 focus:ring-[hsl(var(--brand-end))]"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span>Phone or email</span>
                <input
                  name="contact"
                  required
                  className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 outline-none focus:ring-2 focus:ring-[hsl(var(--brand-end))]"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span>Message</span>
                <textarea
                  name="message"
                  rows={4}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-[hsl(var(--brand-end))]"
                />
              </label>
              <button className="mt-2 inline-flex items-center justify-center rounded-lg bg-brand-secondary hover:bg-brand-secondary/90 px-5 py-3 font-semibold text-white shadow transition hover:shadow-md">
                Send request
              </button>
              <p className="text-xs text-slate-500">
                By submitting, you agree to the processing of personal data.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
