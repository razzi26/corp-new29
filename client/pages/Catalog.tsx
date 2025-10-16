import { useMemo, useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import ContactModal from "@/components/ContactModal";
import type { Product } from "@/entities/product";
import { ProductCard } from "@/components/cards/ProductCard";
import { CatalogFilterDesktop } from "@/components/features/CatalogFilterDesktop";
import { CatalogFilterMobile } from "@/components/features/CatalogFilterMobile";

export default function Catalog() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || null;

  // Mobile drawers state
  const [openCatSheet, setOpenCatSheet] = useState(false);
  const [openTagSheet, setOpenTagSheet] = useState(false);
  const [draftTags, setDraftTags] = useState<Set<string>>(new Set());

  const productsTopRef = useRef<HTMLDivElement>(null);
  const scrollToProducts = () => {
    const el = productsTopRef.current;
    if (!el) return;
    const headerOffset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const tryFetch = async (url: string) => {
          const res = await fetch(url, {
            headers: { "cache-control": "no-cache" },
            credentials: "same-origin",
          });
          if (!res.ok)
            throw new Error(`Failed to load products: ${res.status}`);
          return (await res.json()) as Product[];
        };

        let data: Product[] | null = null;
        try {
          data = await tryFetch("/data/products.json");
        } catch (err) {
          // Attempt with absolute origin in case base path differs
          try {
            const origin =
              typeof window !== "undefined" ? window.location.origin : "";
            if (origin) data = await tryFetch(origin + "/data/products.json");
          } catch (err2) {
            // no-op, will throw below
          }
        }

        if (!data) throw new Error("Failed to load products.json from server");
        if (!cancelled) setProducts(data);
      } catch (e: any) {
        if (!cancelled)
          setError(String(e?.message || "Failed to load products"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const allCategories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).sort(),
    [products],
  );
  const allTags = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.tags))).sort(),
    [products],
  );

  const categoryIndex = useMemo(() => {
    const map = new Map<string, string>();
    const normalize = (s: string) =>
      s.normalize("NFKC").replace(/\s+/g, " ").trim();
    for (const c of allCategories) map.set(normalize(c), c);
    return map;
  }, [allCategories]);

  useEffect(() => {
    if (!products.length) return;
    const normalize = (s: string) =>
      s.normalize("NFKC").replace(/\s+/g, " ").trim();
    if (!categoryParam) {
      if (selectedCategory !== null) setSelectedCategory(null);
      return;
    }
    const original = categoryIndex.get(normalize(categoryParam));
    if (original) {
      if (selectedCategory !== original) setSelectedCategory(original);
    } else {
      const next = new URLSearchParams(searchParams);
      next.delete("category");
      setSearchParams(next, { replace: true });
      if (selectedCategory !== null) setSelectedCategory(null);
    }
  }, [products.length, categoryParam, categoryIndex, selectedCategory]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (
        q &&
        !`${p.title} ${p.category} ${p.tags.join(" ")}`
          .toLowerCase()
          .includes(q)
      ) {
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
  }, [query, selectedCategory, selectedTags, products]);

  const grouped = useMemo(() => {
    const map = new Map<string, Product[]>();
    for (const p of filtered) {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category)!.push(p);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactProduct, setContactProduct] = useState<Product | null>(null);

  const _filtersDidMount = useRef(true);
  useEffect(() => {
    if (_filtersDidMount.current) {
      _filtersDidMount.current = false;
      return;
    }
    scrollToProducts();
  }, [selectedCategory, query, selectedTags]);

  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Products"
        description="Explore certified biosafety and laboratory equipment. Search and filter by categories or special tags."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      <CatalogFilterMobile
        query={query}
        onQueryChange={setQuery}
        selectedCategory={selectedCategory}
        allCategories={allCategories}
        onCategoryChange={setSelectedCategory}
        selectedTags={selectedTags}
        allTags={allTags}
        openCatSheet={openCatSheet}
        setOpenCatSheet={setOpenCatSheet}
        openTagSheet={openTagSheet}
        setOpenTagSheet={setOpenTagSheet}
        draftTags={draftTags}
        setDraftTags={setDraftTags}
        onTagsApply={() => {
          setSelectedTags(new Set(draftTags));
          setOpenTagSheet(false);
        }}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <div className="container mx-auto px-4 py-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-12">
          <CatalogFilterDesktop
            query={query}
            onQueryChange={setQuery}
            allTags={allTags}
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            allCategories={allCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onScroll={scrollToProducts}
          />

          {/* Results */}
          <main className="lg:col-span-9">
            <div ref={productsTopRef} />
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-slate-600">
                {loading
                  ? "Loading products..."
                  : `Showing ${filtered.length} of ${products.length}`}
              </p>
              <Link
                to="/contact"
                className="hidden md:inline-flex text-sm text-[hsl(var(--brand-end))] hover:underline"
              >
                Need help choosing?
              </Link>
            </div>

            {error ? (
              <div className="mt-8 rounded-xl border border-slate-200 p-8 text-center text-red-700">
                {error}
              </div>
            ) : loading ? (
              <div className="mt-8 rounded-xl border border-slate-200 p-8 text-center text-slate-700">
                Loading products...
              </div>
            ) : grouped.length === 0 ? (
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
                        <ProductCard
                          key={p.id}
                          product={p}
                          onRequest={() => {
                            setContactProduct(p);
                            setContactModalOpen(true);
                          }}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
      <ContactModal
        open={contactModalOpen}
        productName={contactProduct?.title ?? null}
        onOpenChange={(v) => {
          setContactModalOpen(v);
          if (!v) setContactProduct(null);
        }}
      />
    </div>
  );
}
