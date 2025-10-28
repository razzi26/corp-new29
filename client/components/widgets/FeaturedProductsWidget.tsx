import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import ContactModal from "@/components/ContactModal";
import { cn } from "@/lib/utils";

export default function FeaturedProductsWidget() {
  const [products, setProducts] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactProduct, setContactProduct] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;
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
        if (!res.ok) return null;
        return await res.json();
      } catch (e) {
        return null;
      }
    };

    (async () => {
      try {
        let data: any[] | null = await tryFetch("/data/products.json");
        if (!data) {
          const origin =
            typeof window !== "undefined" ? window.location.origin : "";
          if (origin) data = await tryFetch(origin + "/data/products.json");
        }
        if (!mounted) return;
        if (!data) throw new Error("Failed to load products");
        const featured = data.filter(
          (p: any) => Array.isArray(p.tags) && p.tags.includes("Featured"),
        );
        setProducts(featured.slice(0, 8));
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message ?? "Failed to load products");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="mt-6">Loading products...</div>;
  if (error)
    return (
      <div className="mt-6 text-sm text-red-600">
        Error loading products: {error}
      </div>
    );
  if (!products || products.length === 0)
    return (
      <div className="mt-6 text-sm text-slate-600">
        No featured products available.
      </div>
    );

  return (
    <>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <HomeProductCard
            key={p.id}
            product={p}
            onRequest={() => {
              setContactProduct(p);
              setContactModalOpen(true);
            }}
          />
        ))}
      </div>

      <ContactModal
        open={contactModalOpen}
        productName={contactProduct?.title ?? null}
        onOpenChange={(v) => {
          setContactModalOpen(v);
          if (!v) setContactProduct(null);
        }}
      />
    </>
  );
}

function HomeProductCard({
  product,
  onRequest,
}: {
  product: any;
  onRequest?: () => void;
}) {
  const imgs = (product.mainImage ? [product.mainImage] : []).concat(
    product.images ?? [],
  );
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isTouch, setIsTouch] = React.useState(false);

  React.useEffect(() => {
    const touch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setIsTouch(Boolean(touch));
  }, []);

  React.useEffect(() => {
    setHoverIndex(null);
    setActiveIndex(0);
  }, [product.id]);

  const displayed = isTouch ? activeIndex : (hoverIndex ?? activeIndex);

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

  const touchStartX = React.useRef<number | null>(null);
  const touchLastX = React.useRef<number | null>(null);

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
    <div className="border-b border-slate-200 pb-6 pt-0">
      <div
        ref={containerRef}
        className="relative w-full aspect-[3/4] bg-slate-50 mb-6"
        role="img"
        aria-label={product.title}
        style={{ touchAction: "pan-y" }}
        onPointerMove={(e) => {
          handlePointerMove(e);
        }}
        onPointerLeave={() => {
          if (!isTouch) setHoverIndex(null);
        }}
        onPointerCancel={() => {
          if (!isTouch) setHoverIndex(null);
        }}
        onTouchStart={onTouchStartSimple}
        onTouchMove={onTouchMoveSimple}
        onTouchEnd={onTouchEndSimple}
      >
        <img
          src={imgs[displayed]}
          alt={product.title}
          className="absolute inset-0 h-full w-full object-contain"
          style={{ left: 0, top: 0 }}
        />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_35%),radial-gradient(circle_at_70%_80%,white,transparent_25%)]" />

        {imgs.length > 1 && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-2 flex items-center gap-2">
            {imgs.map((_, idx) => (
              <span
                key={idx}
                aria-hidden
                className={cn(
                  "w-2 h-2 rounded-full transition-opacity",
                  idx === displayed
                    ? "bg-[hsl(var(--primary))] opacity-100"
                    : "bg-slate-400 opacity-50",
                )}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="mb-3">
          <Link
            to={`/products/${product.id}`}
            className="text-2xl font-bold text-[hsl(var(--primary))] hover:underline block"
          >
            {product.title}
          </Link>
        </h3>
        <p className="mb-4 text-lg text-slate-700 leading-relaxed">
          {product.description}
        </p>
        <div className="mb-6 inline-block text-sm font-semibold text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5 px-3 py-1">
          {product.category}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => (onRequest ? onRequest() : undefined)}
            className="inline-flex items-center bg-[hsl(var(--primary))] text-white px-6 py-2.5 text-base font-bold hover:bg-[hsl(205_100%_20%)] transition"
          >
            Request quote
          </button>
          <Link
            to={`/products/${product.id}`}
            className="inline-flex items-center border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] px-6 py-2.5 text-base font-bold hover:bg-[hsl(var(--primary))] hover:text-white transition"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ title, tag }: { title: string; tag: string }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="relative h-40 bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_35%),radial-gradient(circle_at_70%_80%,white,transparent_25%)]" />
        <span className="absolute top-3 left-3 text-sm rounded-full bg-white text-[hsl(var(--brand-end))] px-3 py-1 font-semibold">
          {tag}
        </span>
      </div>
      <div className="p-5">
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="mt-1 text-base text-slate-600">
          Check availability and pricing with our manager
        </p>
        <div className="mt-4 flex gap-2">
          <Link
            to="/contact"
            className="inline-flex items-center rounded-lg bg-[hsl(var(--brand-end))] text-white px-3.5 py-2.5 text-base font-semibold shadow"
          >
            Request quote
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-lg border border-slate-300 px-3.5 py-2.5 text-base font-semibold hover:bg-slate-50"
          >
            Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
