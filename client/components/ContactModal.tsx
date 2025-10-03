import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function ContactModal({
  open,
  productName,
  onOpenChange,
}: {
  open: boolean;
  productName?: string | null;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
          <DialogDescription>
            Leave your details and our team will prepare a tailored quote for your facility.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget as HTMLFormElement);
            if (productName) form.set("product", productName);
            console.log(Object.fromEntries(form.entries()));
            alert("Thank you! We will contact you shortly.");
            onOpenChange(false);
          }}
          className="grid gap-4"
        >
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

          {/* hidden product field */}
          <input type="hidden" name="product" value={productName ?? ""} />

          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">By submitting, you agree to the processing of personal data.</p>
            <button className="ml-4 inline-flex items-center justify-center rounded-lg bg-[hsl(var(--brand-end))] px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:shadow-md">
              Send request
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
