import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Product = {
  id: string;
  title: string;
  category: string;
  tags: string[]; // e.g. ["Featured", "Sale", "Popular"]
  description: string;
};

const PRODUCTS: Product[] = [
  {
    id: "p-bsc-a2",
    title: "Class II A2 Biosafety Cabinet",
    category: "Biosafety Cabinets",
    tags: ["Featured", "Popular"],
    description: "High-performance protection for personnel, product, and environment.",
  },
  {
    id: "p-bsc-b2",
    title: "Class II B2 Biosafety Cabinet",
    category: "Biosafety Cabinets",
    tags: ["Advanced"],
    description: "Total exhaust design for specialized applications and safety.",
  },
  {
    id: "p-pcr",
    title: "PCR Cabinet",
    category: "PCR Cabinets",
    tags: ["Popular"],
    description: "Contamination control for amplification workflows.",
  },
  {
    id: "p-fh-ducted",
    title: "Ducted Fume Hood",
    category: "Fume Hoods",
    tags: ["Featured"],
    description: "Reliable chemical handling with external exhaust.",
  },
  {
    id: "p-fh-ductless",
    title: "Ductless Fume Hood",
    category: "Fume Hoods",
    tags: ["Sale"],
    description: "Flexible filtration-based protection without ducting.",
  },
  {
    id: "p-incu-co2",
    title: "CO₂ Incubator",
    category: "CO₂ Incubators",
    tags: ["Featured", "Advanced"],
    description: "Accurate CO₂ and temperature control for sensitive cultures.",
  },
  {
    id: "p-incu-shaker",
    title: "Shaking Incubator",
    category: "CO₂ Incubators",
    tags: ["New"],
    description: "Uniform mixing and growth for cell and microbial culture.",
  },
  {
    id: "p-cleanroom-panels",
    title: "Cleanroom Wall Panels",
    category: "Cleanroom Solutions",
    tags: ["Advanced"],
    description: "Modular, seamless surfaces for controlled environments.",
  },
  {
    id: "p-cleanroom-pass",
    title: "Pass-Through Chamber",
    category: "Cleanroom Solutions",
    tags: ["Popular"],
    description: "Efficient material transfer while maintaining cleanliness.",
  },
  {
    id: "p-isolator-pharma",
    title: "Pharmaceutical Isolator",
    category: "Isolators",
    tags: ["Featured"],
    description: "Aseptic processing with robust containment.",
  },
  {
    id: "p-isolator-sterile",
    title: "Sterility Testing Isolator",
    category: "Isolators",
    tags: ["Advanced"],
    description: "Secure sterility testing with operator protection.",
  },
  {
    id: "p-bsc-c1",
    title: "Class II C1 Biosafety Cabinet",
    category: "Biosafety Cabinets",
    tags: ["New"],
    description: "Hybrid flexibility for evolving lab workflows.",
  },
  {
    id: "p-pcr-uv",
    title: "PCR Cabinet with UV",
    category: "PCR Cabinets",
    tags: ["Sale"],
    description: "Integrated UV decontamination to reduce carryover.",
  },
  {
    id: "p-fh-vcv",
    title: "Variable Air Volume Fume Hood",
    category: "Fume Hoods",
    tags: ["Advanced"],
    description: "Energy-efficient airflow control for safety and savings.",
  },
  {
    id: "p-cleanroom-doors",
    title: "Hermetic Sliding Doors",
    category: "Cleanroom Solutions",
    tags: ["Featured"],
    description: "Airtight door systems to maintain pressure differentials.",
  },
  {
    id: "p-incu-stack",
    title: "Stackable CO₂ Incubator",
    category: "CO₂ Incubators",
    tags: ["Popular"],
    description: "Space-saving growth with independent chambers.",
  },
  {
    id: "p-bsc-class3",
    title: "Class III Biosafety Cabinet",
    category: "Biosafety Cabinets",
    tags: ["Advanced"],
    description: "Maximum containment for high-risk agents.",
  },
  {
    id: "p-pcr-compact",
    title: "Compact PCR Workstation",
    category: "PCR Cabinets",
    tags: ["Featured"],
    description: "Benchtop form for small labs and teaching.",
  },
];

const TAG_COLORS: Record<string, string> = {
  Featured: "bg-[hsl(var(--brand-end))] text-white",
  Sale: "bg-red-600 text-white",
  Popular: "bg-amber-500 text-white",
  Advanced: "bg-sky-600 text-white",
  New: "bg-emerald-600 text-white",
};

export default function Catalog() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const allCategories = useMemo(
    () => Array.from(new Set(PRODUCTS.map((p) => p.category))).sort(),
    [],
  );
  const allTags = useMemo(
    () => Array.from(new Set(PRODUCTS.flatMap((p) => p.tags))).sort(),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (q && !(`${p.title} ${p.category} ${p.tags.join(" ")}`.toLowerCase().includes(q))) {
        return false;
      }
      if (selectedCategory && p.category !== selectedCategory) {
        return false;
      }
      if (selectedTags.size > 0 && !p.tags.some((t) => selectedTags.has(t))) {
        return false;
      }
      return true;
    });
  }, [query, selectedCategory, selectedTags]);

  const grouped = useMemo(() => {
    const map = new Map<string, Product[]>();
    for (const p of filtered) {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category)!.push(p);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const toggleSet = (setter: (s: Set<string>) => void, value: string) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTags(new Set());
  };

  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Products"
        description="Explore certified biosafety and laboratory equipment. Search and filter by categories or special tags."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      <div className="container mx-auto px-4 py-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Sidebar (desktop) */}
          <aside className="lg:col-span-3 lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700">
                  Search
                </label>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full h-10 rounded-lg bg-white text-slate-900 border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-[hsl(var(--brand-end))]"
                />
              </div>

              {/* Tags above Categories */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-800">Tags</h3>
                  <button
                    className="text-xs text-[hsl(var(--brand-end))] hover:underline"
                    onClick={() => setSelectedTags(new Set())}
                    aria-label="Clear tag filters"
                  >
                    Clear
                  </button>
                </div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {allTags.map((tag) => {
                    const active = selectedTags.has(tag);
                    return (
                      <li key={tag}>
                        <button
                          onClick={() => toggleSet(setSelectedTags, tag)}
                          aria-pressed={active}
                          className={cn(
                            "px-3 py-1 rounded-full border text-xs font-semibold transition",
                            active
                              ? "bg-[hsl(var(--brand-end))] text-white border-transparent"
                              : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50",
                          )}
                        >
                          {tag}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-800">Categories</h3>
                  <button
                    className="text-xs text-[hsl(var(--brand-end))] hover:underline"
                    onClick={() => setSelectedCategory(null)}
                    aria-label="Clear category filters"
                  >
                    Clear
                  </button>
                </div>
                <ul className="mt-3 space-y-2">
                  {allCategories.map((cat) => {
                    const active = selectedCategory === cat;
                    return (
                      <li key={cat}>
                        <button
                          onClick={() =>
                            setSelectedCategory((prev) => (prev === cat ? null : cat))
                          }
                          aria-pressed={active}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-lg border transition",
                            active
                              ? "bg-[hsl(var(--brand-end))] text-white border-transparent"
                              : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50",
                          )}
                        >
                          {cat}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-6">
                <button
                  onClick={clearFilters}
                  className="w-full inline-flex items-center justify-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                >
                  Reset filters
                </button>
              </div>
            </div>
          </aside>

          {/* Results */}
          <main className="lg:col-span-9">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-slate-600">
                Showing {filtered.length} of {PRODUCTS.length}
              </p>
              <Link
                to="/contact"
                className="hidden md:inline-flex text-sm text-[hsl(var(--brand-end))] hover:underline"
              >
                Need help choosing?
              </Link>
            </div>

            {grouped.length === 0 ? (
              <div className="mt-8 rounded-xl border border-slate-200 p-8 text-center text-slate-700">
                No products match your filters.
              </div>
            ) : (
              <div className="mt-6 space-y-10">
                {grouped.map(([category, items]) => (
                  <section key={category}>
                    <h2 className="text-xl font-bold">{category}</h2>
                    <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                      {items.map((p) => (
                        <ProductCard key={p.id} product={p} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="relative h-40 bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_35%),radial-gradient(circle_at_70%_80%,white,transparent_25%)]" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {product.tags.map((t) => (
            <span
              key={t}
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                TAG_COLORS[t] ?? "bg-white text-[hsl(var(--brand-end))]",
              )}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <p className="mt-1 text-sm text-slate-600">{product.description}</p>
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <Badge variant="secondary" className="text-xs">{product.category}</Badge>
        </div>
        <div className="mt-4 flex gap-2">
          <Link
            to="/contact"
            className="inline-flex items-center rounded-lg bg-[hsl(var(--brand-end))] text-white px-3.5 py-2.5 text-sm font-semibold shadow"
          >
            Request quote
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm font-semibold hover:bg-slate-50"
          >
            Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
