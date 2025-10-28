import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
            Leave your details and our team will prepare a tailored quote for
            your facility.
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
          className="grid gap-6"
        >
          <label className="grid gap-3 text-sm font-medium border-b border-slate-300 pb-4">
            <span className="text-slate-900">Name</span>
            <input
              name="name"
              required
              className="h-10 border-0 bg-white px-0 text-slate-900 outline-none focus:ring-0 focus:border-b focus:border-[hsl(var(--brand-end))]"
            />
          </label>

          <label className="grid gap-3 text-sm font-medium border-b border-slate-300 pb-4">
            <span className="text-slate-900">Phone or email</span>
            <input
              name="contact"
              required
              className="h-10 border-0 bg-white px-0 text-slate-900 outline-none focus:ring-0 focus:border-b focus:border-[hsl(var(--brand-end))]"
            />
          </label>

          <label className="grid gap-3 text-sm font-medium border-b border-slate-300 pb-4">
            <span className="text-slate-900">Product of Interest</span>
            <input
              name="product"
              readOnly
              value={productName ?? ""}
              className="h-10 border-0 bg-white px-0 text-slate-900 outline-none"
            />
          </label>

          <label className="grid gap-3 text-sm font-medium border-b border-slate-300 pb-4">
            <span className="text-slate-900">Message</span>
            <textarea
              name="message"
              rows={4}
              className="border-0 bg-white px-0 py-2 text-slate-900 outline-none focus:ring-0 resize-none"
            />
          </label>

          <button className="w-full inline-flex items-center justify-center bg-[hsl(var(--brand-end))] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[hsl(205_100%_20%)]">
            Send request
          </button>
          <p className="text-xs text-slate-500">
            By submitting, you agree to the processing of personal data.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
