import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Seo } from "@/components/Seo";
import ContactModal from "@/components/ContactModal";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowUp, ArrowDown } from "lucide-react";

type Product = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  mainImage?: string;
  images?: string[];
  brochures?: { lang: string; url: string; label?: string }[];
  specs?: { name: string; value: string }[];
};

const TAG_COLORS: Record<string, string> = {
  Featured: "bg-[hsl(var(--brand-end))] text-white",
  Sale: "bg-red-600 text-white",
  Popular: "bg-amber-500 text-white",
  Advanced: "bg-sky-600 text-white",
  New: "bg-emerald-600 text-white",
};

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const tryFetch = async (url: string) => {
          try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 10000);
            const res = await fetch(url, {
              headers: { "cache-control": "no-cache" },
              credentials: "same-origin",
              signal: controller.signal,
            });
            clearTimeout(timeout);
            if (!res.ok) {
              console.warn("Failed to load products (status):", res.status, url);
              return null;
            }
            try {
              return (await res.json()) as Product[];
            } catch (e) {
              console.warn("Failed to parse products JSON from", url, e);
              return null;
            }
          } catch (e: any) {
            // fetch failed (network error, CORS, aborted, etc.)
            console.warn("Fetch error for", url, e && e.message ? e.message : e);
            return null;
          }
        };

        let data: Product[] | null = null;
        data = await tryFetch("/data/products.json");
        if (!data) {
          try {
            const origin = typeof window !== "undefined" ? window.location.origin : "";
            if (origin) data = await tryFetch(origin + "/data/products.json");
          } catch (err2) {
            // no-op
          }
        }

        if (!data) throw new Error("Failed to load products.json from server");
        if (!cancelled) setProducts(data);
      } catch (e: any) {
        if (!cancelled)
          setError(String(e?.message || "Failed to load product"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const product = useMemo(
    () => products.find((p) => p.id === id) || null,
    [products, id],
  );

  const canonicalUrl = useMemo(() => {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    return base + location.pathname;
  }, [location.pathname]);

  const gallery = useMemo(() => {
    if (!product) return [] as string[];
    const arr: string[] = [];
    if (product.mainImage) arr.push(product.mainImage);
    if (product.images && product.images.length) {
      for (const src of product.images) if (!arr.includes(src)) arr.push(src);
    }
    return arr;
  }, [product]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const displayedIndex = previewIndex ?? activeIndex;

  const [contactModalOpen, setContactModalOpen] = useState(false);

  const mainImageRef = useRef<HTMLDivElement | null>(null);
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const [thumbsMaxHeight, setThumbsMaxHeight] = useState<number | undefined>(
    undefined,
  );
  const [mainAspect, setMainAspect] = useState<string | undefined>(undefined);
  const [thumbsOverflow, setThumbsOverflow] = useState(false);
  const [thumbsCanScrollUp, setThumbsCanScrollUp] = useState(false);
  const [thumbsCanScrollDown, setThumbsCanScrollDown] = useState(false);

  const updateThumbsScrollState = (thumbsEl: HTMLDivElement | null) => {
    if (!thumbsEl) {
      setThumbsCanScrollUp(false);
      setThumbsCanScrollDown(false);
      return;
    }
    const { scrollTop, clientHeight, scrollHeight } = thumbsEl;
    const eps = 1;
    setThumbsCanScrollUp(scrollTop > eps);
    setThumbsCanScrollDown(scrollTop + clientHeight < scrollHeight - eps);
  };

  const updateSizes = () => {
    const el = mainImageRef.current;
    if (el) {
      const mainH = el.clientHeight;
      setThumbsMaxHeight(mainH);
      const rect = el.getBoundingClientRect();
      setMainAspect(`${Math.round(rect.width)} / ${Math.round(rect.height)}`);

      const thumbsEl = thumbsRef.current;
      setThumbsOverflow(thumbsEl ? thumbsEl.scrollHeight > (thumbsEl.clientHeight + 1) : false);
      updateThumbsScrollState(thumbsEl);
    } else {
      setThumbsMaxHeight(undefined);
      setMainAspect(undefined);
      setThumbsOverflow(false);
      updateThumbsScrollState(null);
    }
  };

  useLayoutEffect(() => {
    // run once after DOM mutations; images may not be loaded yet
    updateSizes();
    window.addEventListener("resize", updateSizes);

    const thumbsEl = thumbsRef.current;
    const onThumbsScroll = () => updateThumbsScrollState(thumbsEl);
    if (thumbsEl) thumbsEl.addEventListener("scroll", onThumbsScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", updateSizes);
      if (thumbsEl) thumbsEl.removeEventListener("scroll", onThumbsScroll as any);
    };
  }, [activeIndex, product?.id, gallery.length]);

  useEffect(() => setActiveIndex(0), [product?.id]);

  if (loading) {
    return (
      <div className="bg-white text-slate-900">
        <div className="container mx-auto px-4 py-10">Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white text-slate-900">
        <div className="container mx-auto px-4 py-10 text-red-700">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white text-slate-900">
        <div className="container mx-auto px-4 py-10">
          <p className="text-slate-700">We couldn't find this product.</p>
        </div>
      </div>
    );
  }

  const categoryLink = `/products?category=${encodeURIComponent(product.category)}`;

  return (
    <div className="bg-white text-slate-900">
      <Seo
        title={`${product.title} | Products`}
        description={product.description}
        url={canonicalUrl}
        image={gallery[0]}
        type="product"
      />
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb aria-label="Breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/products">Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={categoryLink}>{product.category}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="container mx-auto px-4 pb-10">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: Gallery Slider */}
          <div className="lg:col-span-6">
            {gallery.length > 0 ? (
              <div className="relative p-0">
                <div className="grid grid-cols-12 gap-4 items-start">
                  {/* Thumbnails left (vertical) - hidden on mobile */}
                  <div className="col-span-2 relative hidden lg:block">
                    <div
                      className="overflow-y-auto pr-1 no-scrollbar"
                      ref={(el) => {
                        thumbsRef.current = el;
                      }}
                      id="thumbs-scroll"
                      role="tablist"
                      aria-label="Product image thumbnails"
                      style={
                        thumbsMaxHeight
                          ? { maxHeight: `${thumbsMaxHeight}px` }
                          : undefined
                      }
                    >
                      <div className="flex flex-col gap-1">
                        {gallery.map((src, i) => (
                          <button
                            key={src + i}
                            className={cn(
                              "relative aspect-[1/1] w-full overflow-hidden rounded-md focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-[hsl(var(--brand-end))]",
                              i === activeIndex
                                ? "border-2 border-[hsl(var(--brand-end))]"
                                : "border border-transparent",
                            )}
                            style={{ aspectRatio: "1 / 1" }}
                            onMouseEnter={() => setPreviewIndex(i)}
                            onMouseLeave={() => setPreviewIndex(null)}
                            onFocus={() => setPreviewIndex(i)}
                            onBlur={() => setPreviewIndex(null)}
                            onClick={() => setActiveIndex(i)}
                            role="tab"
                            aria-selected={i === activeIndex}
                            aria-controls={`slide-${i}`}
                            title={`Show image ${i + 1}`}
                          >
                            <img
                              src={src}
                              alt={`${product.title} thumbnail ${i + 1}`}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Vertical scroll controls (up/down) */}
                    {thumbsOverflow && (
                      <>
                        {thumbsCanScrollUp && (
                          <button
                            type="button"
                            className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 h-7 w-7 rounded-full bg-white/90 backdrop-blur text-slate-700 hover:bg-white"
                            aria-label="Scroll thumbnails up"
                            onClick={() => {
                              const el = thumbsRef.current;
                              const step = Math.round(
                                (thumbsMaxHeight || 120) * 0.5,
                              );
                              el?.scrollBy({ top: -step, behavior: "smooth" });
                            }}
                          >
                            <ArrowUp className="h-4 w-4 mx-auto" />
                          </button>
                        )}

                        {thumbsCanScrollDown && (
                          <button
                            type="button"
                            className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 h-7 w-7 rounded-full bg-white/90 backdrop-blur text-slate-700 hover:bg-white"
                            aria-label="Scroll thumbnails down"
                            onClick={() => {
                              const el = thumbsRef.current;
                              const step = Math.round(
                                (thumbsMaxHeight || 120) * 0.5,
                              );
                              el?.scrollBy({ top: step, behavior: "smooth" });
                            }}
                          >
                            <ArrowDown className="h-4 w-4 mx-auto" />
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  {/* Main image right */}
                  <div className="col-span-12 lg:col-span-10">
                    <div
                      className="relative"
                      ref={(el) => {
                        /* slider ref used for touch */
                      }}
                      style={{ touchAction: "pan-y" }}
                      onPointerDown={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        try { el.setPointerCapture(e.pointerId); } catch {}
                        (el as any)._startX = e.clientX;
                        (el as any)._lastX = e.clientX;
                        (el as any)._isDown = true;
                        (el as any)._pointerId = e.pointerId;
                      }}
                      onPointerMove={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        if (!(el as any)._isDown) return;
                        (el as any)._lastX = e.clientX;
                      }}
                      onPointerUp={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        if (!(el as any)._isDown) return;
                        (el as any)._isDown = false;
                        try { if ((el as any)._pointerId !== undefined) el.releasePointerCapture((el as any)._pointerId); } catch {}
                        const startX = (el as any)._startX as number | undefined;
                        const lastX = (el as any)._lastX as number | undefined;
                        if (startX === undefined || lastX === undefined) return;
                        const dx = lastX - startX;
                        const threshold = 40;
                        if (dx < -threshold) {
                          setActiveIndex((s) => (s + 1) % gallery.length);
                        } else if (dx > threshold) {
                          setActiveIndex((s) => (s - 1 + gallery.length) % gallery.length);
                        }
                      }}
                      onPointerCancel={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        (el as any)._isDown = false;
                        try { if ((el as any)._pointerId !== undefined) el.releasePointerCapture((el as any)._pointerId); } catch {}
                      }}
                      onPointerLeave={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        if (!(el as any)._isDown) return;
                        (el as any)._isDown = false;
                        try { if ((el as any)._pointerId !== undefined) el.releasePointerCapture((el as any)._pointerId); } catch {}
                      }}
                    >
                      {/* Mobile counter */}
                      <div className="absolute left-3 top-3 rounded-md bg-black/60 text-white text-xs px-2 py-1 lg:hidden">
                        {displayedIndex + 1} / {gallery.length}
                      </div>

                      {gallery.map((src, i) => (
                        <div
                          key={src + i}
                          id={`slide-${i}`}
                          ref={(el) => {
                            if (i === displayedIndex) mainImageRef.current = el;
                          }}
                          className={cn(
                            "w-full max-h-[480px] overflow-hidden rounded-xl bg-slate-50",
                            i === displayedIndex ? "block" : "hidden",
                          )}
                          style={{ aspectRatio: "1 / 1" }}
                        >
                          <img
                            src={src}
                            alt={`${product.title} image ${i + 1}`}
                            className="h-full w-full object-cover"
                            loading={i === 0 ? "eager" : "lazy"}
                            onLoad={() => updateSizes()}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-0">
                <div
                  className="w-full max-h-[480px] overflow-hidden rounded-xl bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]"
                  style={{ aspectRatio: "1 / 1" }}
                />
              </div>
            )}
          </div>

          {/* Right: Title, description, tags, actions, details */}
          <aside className="lg:col-span-5 self-start lg:sticky lg:top-24">
            <div className="p-0">
              <h1 className="text-2xl font-bold text-slate-900">
                {product.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {product.category}
                </Badge>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((t) => (
                    <span
                      key={t}
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                        TAG_COLORS[t] ??
                          "bg-white text-[hsl(var(--brand-end))]",
                      )}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-slate-700">{product.description}</p>

              <div className="mt-6 flex gap-6">
                <button
                  type="button"
                  onClick={() => setContactModalOpen(true)}
                  className="inline-flex items-center rounded-lg bg-[hsl(var(--brand-end))] text-white px-4 py-2.5 text-sm font-semibold shadow"
                >
                  Request quote
                </button>
              </div>

              {product.brochures && product.brochures.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-slate-800">
                    Brochures
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {product.brochures.map((b, i) => (
                      <li
                        key={(b.url || "") + i}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="text-slate-700">
                          {b.label ?? b.lang}
                        </span>
                        <a
                          href={b.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[hsl(var(--brand-end))] underline underline-offset-4 hover:no-underline"
                        >
                          Download
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Specifications - bottom full width */}
        {product.specs && product.specs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold text-slate-900">
              Specifications
            </h2>
            <div className="mt-6">
              <table className="w-full text-sm">
                <tbody>
                  {product.specs.map((row, idx) => (
                    <tr key={row.name + idx}>
                      <td className="w-1/3 py-2 pr-6 text-slate-500 align-top">
                        {row.name}
                      </td>
                      <td className="py-2 text-slate-900">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.description,
            sku: product.id,
            category: product.category,
            image: gallery,
            brand: { "@type": "Brand", name: "Esco Biosafety Institute" },
          }),
        }}
      />

      <ContactModal
        open={contactModalOpen}
        productName={product.title}
        onOpenChange={(v) => setContactModalOpen(v)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Products", item: "/products" },
              { "@type": "ListItem", position: 3, name: product.category, item: categoryLink },
              { "@type": "ListItem", position: 4, name: product.title, item: location.pathname },
            ],
          }),
        }}
      />
    </div>
  );
}
