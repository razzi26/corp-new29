import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product } from "@/entities/product";

const TAG_COLORS: Record<string, string> = {
  Featured: "bg-[hsl(var(--brand-end))] text-white",
  Sale: "bg-red-600 text-white",
  Popular: "bg-amber-500 text-white",
  Advanced: "bg-sky-600 text-white",
  New: "bg-emerald-600 text-white",
};

export function ProductCard({
  product,
  onRequest,
}: {
  product: Product;
  onRequest?: () => void;
}) {
  const imgs = (product.mainImage ? [product.mainImage] : []).concat(
    product.images ?? [],
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const touch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setIsTouch(Boolean(touch));
  }, []);

  useEffect(() => {
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
  const onTouchEndSimple = () => {
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
        className="relative w-full aspect-[3/4] overflow-hidden rounded-t-2xl bg-slate-50"
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
            onClick={() => (onRequest ? onRequest() : undefined)}
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
