import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Product = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
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

  if (loading) {
    return (
      <div className="bg-white text-slate-900">
        <PageBanner
          title="Loading..."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Loading" },
          ]}
        />
        <div className="container mx-auto px-4 py-10">Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white text-slate-900">
        <PageBanner
          title="Error"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Error" },
          ]}
        />
        <div className="container mx-auto px-4 py-10 text-red-700">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white text-slate-900">
        <PageBanner
          title="Product not found"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Not found" },
          ]}
        />
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
      <PageBanner
        title={product.title}
        description={product.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.title },
        ]}
        meta={
          <div className="flex flex-wrap items-center gap-2">
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
        }
      />

      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-3 text-slate-700">{product.description}</p>
            </div>
            <div className="mt-8 flex gap-3">
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
          </div>
          <aside className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
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
                <div>
                  <dt className="text-slate-500">Tags</dt>
                  <dd className="mt-1 flex flex-wrap gap-2">
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
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
