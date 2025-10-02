export default function Catalog() {
  const categories = [
    { title: "Ultrasound Scanners", tag: "In stock" },
    { title: "Laboratory Analyzers", tag: "Preorder" },
    { title: "Patient Monitors", tag: "Bestseller" },
    { title: "X-ray & CT", tag: "Special offer" },
    { title: "Endoscopy Equipment", tag: "New" },
    { title: "Sterilization Systems", tag: "In stock" },
  ];
  return (
    <div className="container mx-auto px-4 py-16 text-white">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-semibold">Product Catalog</h1>
        <a
          href="/contact"
          className="hidden md:inline-flex text-sm hover:underline"
        >
          Need help choosing?
        </a>
      </div>
      <p className="mt-3 text-white/85 max-w-2xl">
        Certified medical equipment for clinics, labs and private practices.
        Explore categories below or contact us for a tailored quote.
      </p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c) => (
          <div
            key={c.title}
            className="group overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur"
          >
            <div className="relative h-44 bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_35%),radial-gradient(circle_at_70%_80%,white,transparent_25%)]" />
              <span className="absolute top-3 left-3 text-xs rounded-full bg-white/90 text-[hsl(var(--brand-end))] px-2 py-1 font-semibold">
                {c.tag}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg">{c.title}</h3>
              <p className="mt-1 text-sm text-white/80">
                Contact our team for pricing and availability.
              </p>
              <div className="mt-4 flex gap-2">
                <a
                  href="/contact"
                  className="inline-flex items-center rounded-lg bg-white text-[hsl(var(--brand-end))] px-3 py-2 text-sm font-semibold shadow"
                >
                  Request Quote
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center rounded-lg border border-white/30 px-3 py-2 text-sm font-semibold hover:bg-white/10"
                >
                  Consultation
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
