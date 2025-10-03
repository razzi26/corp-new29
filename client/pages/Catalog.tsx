import { useMemo, useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { Badge } from "@/components/ui/badge";
import ContactModal from "@/components/ContactModal";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type Product = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  mainImage?: string;
  images?: string[];
};

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

  const toggleSet = (setter: (s: Set<string>) => void, value: string) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

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

      <div className="container mx-auto px-4 py-10 lg:py-12">
        {/* Mobile/Tablet Filters */}
        <div className="lg:hidden mb-6">
          <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200 -mx-4 px-4 py-3">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-800">
                Search
              </label>
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full h-10 rounded-lg bg-white text-slate-900 border border-slate-300 px-3 pr-9 outline-none focus:ring-2 focus:ring-[hsl(var(--brand-end))]"
                />
                {query && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center"
                  >
                    ×
                  </button>
                )}
              </div>
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setOpenCatSheet(true)}
                  className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 flex-1"
                >
                  {selectedCategory ? (
                    <>
                      <span className="truncate">{selectedCategory}</span>
                      <span
                        className="ml-auto inline-flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 w-5 h-5"
                        onClick={(e) => {
                          e.stopPropagation();
                          const next = new URLSearchParams(searchParams);
                          next.delete("category");
                          setSearchParams(next, { replace: true });
                          setSelectedCategory(null);
                        }}
                        aria-label="Clear category"
                      >
                        ×
                      </span>
                    </>
                  ) : (
                    <span>Categories</span>
                  )}
                </button>

                <button
                  onClick={() => {
                    setDraftTags(new Set(selectedTags));
                    setOpenTagSheet(true);
                  }}
                  className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 flex-1"
                >
                  {selectedTags.size > 0 ? (
                    <>
                      <span className="truncate">
                        {Array.from(selectedTags)[0]}
                      </span>
                      {selectedTags.size > 1 && (
                        <span className="text-slate-500">
                          +{selectedTags.size - 1}
                        </span>
                      )}
                      <span
                        className="ml-auto inline-flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 w-5 h-5"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTags(new Set());
                        }}
                        aria-label="Clear tags"
                      >
                        ×
                      </span>
                    </>
                  ) : (
                    <span>Tags</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block lg:col-span-3 lg:sticky lg:top-20 lg:self-start">
            <div className="bg-white">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-800">
                  Search
                </label>
                <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full h-10 rounded-lg bg-white text-slate-900 border border-slate-300 px-3 pr-9 outline-none focus:ring-2 focus:ring-[hsl(var(--brand-end))]"
                />
                {query && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center"
                  >
                    ×
                  </button>
                )}
              </div>
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
                <h3 className="text-sm font-semibold text-slate-800">
                  Categories
                </h3>
                <ul className="mt-3 rounded-lg border border-slate-300 overflow-hidden divide-y divide-slate-200">
                  <li>
                    <button
                      onClick={() => {
                        if (selectedCategory !== null) {
                          setSelectedCategory(null);
                        }
                        const next = new URLSearchParams(searchParams);
                        next.delete("category");
                        setSearchParams(next, { replace: true });
                        scrollToProducts();
                      }}
                      aria-pressed={selectedCategory === null}
                      className={cn(
                        "w-full text-left px-3 py-2 transition block",
                        selectedCategory === null
                          ? "bg-[hsl(var(--brand-end))] text-white"
                          : "bg-white text-slate-800 hover:bg-slate-50",
                      )}
                    >
                      All
                    </button>
                  </li>
                  {allCategories.map((cat) => {
                    const active = selectedCategory === cat;
                    return (
                      <li key={cat}>
                        <button
                          onClick={() => {
                            const next = new URLSearchParams(searchParams);
                            const nextCat =
                              selectedCategory === cat ? null : cat;
                            if (nextCat) next.set("category", nextCat);
                            else next.delete("category");
                            setSearchParams(next, { replace: true });
                            setSelectedCategory(nextCat);
                            scrollToProducts();
                          }}
                          aria-pressed={active}
                          className={cn(
                            "w-full text-left px-3 py-2 transition block",
                            active
                              ? "bg-[hsl(var(--brand-end))] text-white"
                              : "bg-white text-slate-800 hover:bg-slate-50",
                          )}
                        >
                          {cat}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>

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
                        <ProductCard key={p.id} product={p} onRequest={() => {
                          setContactProduct(p);
                          setContactModalOpen(true);
                        }} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
      {/* Categories Drawer */}
      <CategoriesDrawer
        open={openCatSheet}
        onOpenChange={setOpenCatSheet}
        categories={allCategories}
        selectedCategory={selectedCategory}
        onSelect={(cat) => {
          const next = new URLSearchParams(searchParams);
          if (cat) next.set("category", cat);
          else next.delete("category");
          setSearchParams(next, { replace: true });
          setSelectedCategory(cat);
          setOpenCatSheet(false);
        }}
      />

      {/* Tags Drawer */}

      <ContactModal
        open={contactModalOpen}
        productName={contactProduct?.title ?? null}
        onOpenChange={(v) => {
          setContactModalOpen(v);
          if (!v) setContactProduct(null);
        }}
      />
      <TagsDrawer
        open={openTagSheet}
        onOpenChange={setOpenTagSheet}
        allTags={allTags}
        draft={draftTags}
        setDraft={setDraftTags}
        onApply={() => {
          setSelectedTags(new Set(draftTags));
          setOpenTagSheet(false);
        }}
      />
    </div>
  );
}

function CategoriesDrawer({
  open,
  onOpenChange,
  categories,
  selectedCategory,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  categories: string[];
  selectedCategory: string | null;
  onSelect: (cat: string | null) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="p-0">
        <SheetHeader className="px-4 pt-4">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <div className="max-h-[65vh] overflow-auto px-4 py-2">
          <button
            className={cn(
              "w-full text-left px-3 py-3 rounded-md border mb-2",
              selectedCategory === null
                ? "bg-[hsl(var(--brand-end))] text-white border-transparent"
                : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50",
            )}
            onClick={() => onSelect(null)}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              className={cn(
                "w-full text-left px-3 py-3 rounded-md border mb-2",
                selectedCategory === c
                  ? "bg-[hsl(var(--brand-end))] text-white border-transparent"
                  : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50",
              )}
              onClick={() => onSelect(selectedCategory === c ? null : c)}
            >
              {c}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function TagsDrawer({
  open,
  onOpenChange,
  allTags,
  draft,
  setDraft,
  onApply,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  allTags: string[];
  draft: Set<string>;
  setDraft: (s: Set<string>) => void;
  onApply: () => void;
}) {
  const toggle = (tag: string) => {
    setDraft(((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    }) as any);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="p-0">
        <SheetHeader className="px-4 pt-4">
          <SheetTitle>Tags</SheetTitle>
        </SheetHeader>
        <div className="max-h-[55vh] overflow-auto px-4 py-2">
          <div className="flex items-center justify-between mb-3">
            <button
              className="text-sm text-[hsl(var(--brand-end))] hover:underline"
              onClick={() => setDraft(new Set())}
            >
              Clear all
            </button>
          </div>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {allTags.map((tag) => {
              const active = draft.has(tag);
              return (
                <li key={tag}>
                  <button
                    onClick={() => toggle(tag)}
                    aria-pressed={active}
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border text-sm font-semibold transition",
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
        <div className="sticky bottom-0 bg-white border-t p-4">
          <button
            onClick={onApply}
            className="w-full inline-flex items-center justify-center rounded-lg bg-[hsl(var(--brand-end))] text-white px-3.5 py-2.5 text-sm font-semibold shadow"
          >
            Show Results
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ProductCard({ product, onRequest }: { product: Product; onRequest?: () => void }) {
  const imgs = (product.mainImage ? [product.mainImage] : []).concat(
    product.images ?? [],
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTouch, setIsTouch] = useState(false);

  // detect touch devices (mobile/tablet)
  useEffect(() => {
    const touch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setIsTouch(Boolean(touch));
  }, []);

  // reset preview/active when product changes
  useEffect(() => {
    setHoverIndex(null);
    setActiveIndex(0);
  }, [product.id]);

  const displayed = isTouch ? activeIndex : hoverIndex ?? activeIndex;

  // hover-based preview (desktop only)
  const handlePointerMove = (e: React.PointerEvent) => {
    if (isTouch) return;
    if (imgs.length <= 1) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, rect.width > 0 ? x / rect.width : 0));
    let idx = Math.floor(ratio * imgs.length);
    if (idx >= imgs.length) idx = imgs.length - 1;
    if (idx < 0) idx = 0;
    setHoverIndex(idx);
  };

  // swipe handling for touch devices - simplified: use touch events only to change activeIndex sequentially
  const touchStartX = useRef<number | null>(null);
  const touchLastX = useRef<number | null>(null);

  const onTouchStartSimple = (e: React.TouchEvent) => {
    if (!isTouch) return;
    touchStartX.current = e.touches[0].clientX;
    touchLastX.current = e.touches[0].clientX;
  };
  const onTouchMoveSimple = (e: React.TouchEvent) => {
    if (!isTouch) return;
    if (touchStartX.current === null) return;
    touchLastX.current = e.touches[0].clientX;
  };
  const onTouchEndSimple = (e?: React.TouchEvent) => {
    if (!isTouch) return;
    const startX = touchStartX.current;
    const lastX = touchLastX.current;
    touchStartX.current = null;
    touchLastX.current = null;
    if (startX === null || lastX === null) return;
    const dx = lastX - startX;
    const threshold = 30;
    if (dx < -threshold) {
      setActiveIndex((s) => (s + 1) % imgs.length);
    } else if (dx > threshold) {
      setActiveIndex((s) => (s - 1 + imgs.length) % imgs.length);
    }
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div
        ref={containerRef}
        className="relative w-full aspect-[1/1] overflow-hidden rounded-t-2xl bg-slate-50"
        role="img"
        aria-label={product.title}
        style={{ touchAction: "pan-y" }}
        onPointerMove={(e) => { handlePointerMove(e); onPointerMove(e); }}
        onPointerLeave={() => { if (!isTouch) setHoverIndex(null); }}
        onPointerCancel={() => { if (!isTouch) setHoverIndex(null); }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onTouchStart={(e) => {
          if (!isTouch) return;
          pointerRef.current = { startX: e.touches[0].clientX, lastX: e.touches[0].clientX, isDown: true };
        }}
        onTouchMove={(e) => {
          if (!isTouch || !pointerRef.current?.isDown) return;
          pointerRef.current.lastX = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (!isTouch) return;
          commitSwipe();
        }}
        onClick={() => {
          /* keep click behavior if needed */
        }}
      >
        <img
          src={imgs[displayed]}
          alt={product.title}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ left: 0, top: 0 }}
        />
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

        {imgs.length > 1 && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-2 flex items-center gap-2">
            {imgs.map((_, idx) => (
              <span
                key={idx}
                aria-hidden
                className={cn(
                  "w-2 h-2 rounded-full transition-opacity",
                  idx === displayed
                    ? "bg-[hsl(var(--brand-end))] opacity-100"
                    : "bg-white/60 opacity-70",
                )}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg">
          <Link
            to={`/products/${product.id}`}
            className="text-[hsl(var(--brand-end))] hover:underline"
          >
            {product.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-slate-600">{product.description}</p>
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => onRequest ? onRequest() : undefined}
            className="inline-flex items-center rounded-lg bg-[hsl(var(--brand-end))] text-white px-3.5 py-2.5 text-sm font-semibold shadow"
          >
            Request quote
          </button>
          <Link
            to={`/products/${product.id}`}
            className="inline-flex items-center rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm font-semibold hover:bg-slate-50"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
}
