import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

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
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  useEffect(() => setActiveIndex(0), [product?.id]);

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => {
      const idx = carouselApi.selectedScrollSnap();
      setActiveIndex(idx);
    };
    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;
    carouselApi.scrollTo(Math.min(activeIndex, Math.max(0, gallery.length - 1)));
  }, [activeIndex, carouselApi, gallery.length]);

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
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: Gallery Slider */}
          <div className="lg:col-span-7">
            {gallery.length > 0 ? (
              <div className="relative rounded-2xl border border-slate-200 bg-white p-3">
                <Carousel
                  className="relative"
                  opts={{ loop: true }}
                  setApi={setCarouselApi}
                >
                  <CarouselContent>
                    {gallery.map((src, i) => (
                      <CarouselItem key={src + i}>
                        <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-50">
                          <img
                            src={src}
                            alt={`${product.title} image ${i + 1}`}
                            className="h-full w-full object-cover"
                            loading={i === 0 ? "eager" : "lazy"}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {gallery.length > 1 && (
                    <>
                      <CarouselPrevious className="-left-4 bg-white/80 backdrop-blur border-slate-300" />
                      <CarouselNext className="-right-4 bg-white/80 backdrop-blur border-slate-300" />
                    </>
                  )}
                </Carousel>
                {gallery.length > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto py-1">
                    {gallery.map((src, i) => (
                      <button
                        key={src + i}
                        className={cn(
                          "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border",
                          i === activeIndex
                            ? "border-[hsl(var(--brand-end))]"
                            : "border-slate-200 hover:border-slate-300",
                        )}
                        onClick={() => setActiveIndex(i)}
                        aria-label={`Go to image ${i + 1}`}
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
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]" />
              </div>
            )}
          </div>

          {/* Right: Title, description, tags, actions, details */}
          <aside className="lg:col-span-5 self-start lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h1 className="text-2xl font-bold text-slate-900">{product.title}</h1>
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
                        TAG_COLORS[t] ?? "bg-white text-[hsl(var(--brand-end))]",
                      )}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-slate-700">{product.description}</p>

              <div className="mt-6 flex gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-lg bg-[hsl(var(--brand-end))] text-white px-4 py-2.5 text-sm font-semibold shadow"
                >
                  Request quote
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
                >
                  Back to Products
                </Link>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-slate-800">Details</h3>
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
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-slate-800">Brochures</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    {product.brochures.map((b, i) => (
                      <li
                        key={(b.url || "") + i}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="text-slate-700">{b.label ?? b.lang}</span>
                        <a
                          href={b.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-semibold hover:bg-slate-50"
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
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-slate-900">Specifications</h2>
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <tbody>
                  {product.specs.map((row, idx) => (
                    <tr
                      key={row.name + idx}
                      className={idx % 2 ? "bg-slate-50" : "bg-white"}
                    >
                      <td className="w-1/3 p-3 text-slate-600">{row.name}</td>
                      <td className="p-3 text-slate-900">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
