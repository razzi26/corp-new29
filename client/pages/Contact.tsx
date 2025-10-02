export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-16 text-slate-900">
      <h1 className="text-3xl md:text-4xl font-semibold">Contact Us</h1>
      <p className="mt-3 text-slate-700 max-w-prose">
        Leave your details and our team will prepare a tailored quote for your
        facility.
      </p>
      <div className="mt-8 grid lg:grid-cols-2 gap-8">
        <div>
          <ul className="space-y-2 text-slate-700 text-sm">
            <li>Phone: +7 (495) 000-00-00</li>
            <li>Email: contact@escobiosafety.org</li>
            <li>Mon–Fri: 9:00–19:00</li>
          </ul>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget as HTMLFormElement);
            console.log(Object.fromEntries(form.entries()));
            alert("Thank you! We will contact you shortly.");
          }}
          className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm"
        >
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm">
              <span>Name</span>
              <input
                name="name"
                required
                className="h-11 rounded-lg bg-white text-slate-900 border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-[hsl(var(--brand-end))]"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span>Phone or email</span>
              <input
                name="contact"
                required
                className="h-11 rounded-lg bg-white text-slate-900 border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-[hsl(var(--brand-end))]"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span>Message</span>
              <textarea
                name="message"
                rows={4}
                className="rounded-lg bg-white text-slate-900 border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[hsl(var(--brand-end))]"
              />
            </label>
            <button className="mt-2 inline-flex items-center justify-center rounded-lg bg-[hsl(var(--brand-end))] text-white px-5 py-3 font-semibold shadow hover:shadow-md transition">
              Send request
            </button>
            <p className="text-xs text-slate-500">
              By submitting, you agree to the processing of personal data.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
