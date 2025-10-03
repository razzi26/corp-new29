import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Seo } from "@/components/Seo";
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
        const res = await fetch("/data/products.json", {
          headers: { "cache-control": "no-cache" },
        });
        if (!res.ok) throw new Error(`Failed to load products: ${res.status}`);
        const data: Product[] = await res.json();
        if (!cancelled) setProducts(data);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load product");
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

  const mainImageRef = useRef<HTMLDivElement | null>(null);
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const [thumbsMaxHeight, setThumbsMaxHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    function update() {
      const el = mainImageRef.current;
      if (el) setThumbsMaxHeight(el.clientHeight);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
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
          <div className="mt-4">
            <Link
              to="/products"
              className="text-[hsl(var(--brand-end))] hover:underline"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
                  {/* Thumbnails left (vertical) */}
                  <div className="col-span-2 relative">
                    <div
                      className="overflow-y-auto pr-1"
                      ref={(el) => {
                        thumbsRef.current = el;
                      }}
                      id="thumbs-scroll"
                      role="tablist"
                      aria-label="Product image thumbnails"
                      style={thumbsMaxHeight ? { maxHeight: `${thumbsMaxHeight}px` } : undefined}
                    >
                      <div className="flex flex-col gap-1">
                        {gallery.map((src, i) => (
                          <button
                            key={src + i}
                            className={cn(
                              "relative aspect-[3/4] w-full overflow-hidden rounded-md focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-[hsl(var(--brand-end))]",
                              i === activeIndex
                                ? "border-2 border-[hsl(var(--brand-end))]"
                                : "border border-transparent",
                            )}
                            onMouseEnter={() => setActiveIndex(i)}
                            onFocus={() => setActiveIndex(i)}
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
                    {gallery.length > 5 && (
                      <>
                        <button
                          type="button"
                          className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 h-7 w-7 rounded-full bg-white/90 backdrop-blur text-slate-700 hover:bg-white"
                          aria-label="Scroll thumbnails up"
                          onClick={() => {
                            const el = document.getElementById("thumbs-scroll");
                            el?.scrollBy({ top: -120, behavior: "smooth" });
                          }}
                        >
                          <ArrowUp className="h-4 w-4 mx-auto" />
                        </button>
                        <button
                          type="button"
                          className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 h-7 w-7 rounded-full bg-white/90 backdrop-blur text-slate-700 hover:bg-white"
                          aria-label="Scroll thumbnails down"
                          onClick={() => {
                            const el = document.getElementById("thumbs-scroll");
                            el?.scrollBy({ top: 120, behavior: "smooth" });
                          }}
                        >
                          <ArrowDown className="h-4 w-4 mx-auto" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Main image right */}
                  <div className="col-span-10">
                    <div className="relative">
                      {gallery.map((src, i) => (
                        <div
                          key={src + i}
                          id={`slide-${i}`}
                          ref={(el) => {
                            if (i === activeIndex) mainImageRef.current = el;
                          }}
                          className={cn(
                            "aspect-[3/4] w-full max-h-[480px] overflow-hidden rounded-xl bg-slate-50",
                            i === activeIndex ? "block" : "hidden",
                          )}
                        >
                          <img
                            src={src}
                            alt={`${product.title} image ${i + 1}`}
                            className="h-full w-full object-cover"
                            loading={i === 0 ? "eager" : "lazy"}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-0">
                <div className="aspect-[3/4] w-full max-h-[480px] overflow-hidden rounded-xl bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]" />
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
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-lg bg-[hsl(var(--brand-end))] text-white px-4 py-2.5 text-sm font-semibold shadow"
                >
                  Request quote
                </Link>
                <Link
                  to="/products"
                  className="text-[hsl(var(--brand-end))] underline underline-offset-4 hover:no-underline text-sm font-semibold"
                >
                  Back to Products
                </Link>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-slate-800">
                  Details
                </h3>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">ID</dt>
                    <dd className="text-slate-800">{product.id}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Category</dt>
                    <dd className="text-slate-800">{product.category}</dd>
                  </div>
                </dl>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              {
                "@type": "ListItem",
                position: 2,
                name: "Products",
                item: "/products",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: product.title,
                item: location.pathname,
              },
            ],
          }),
        }}
      />
    </div>
  );
}
