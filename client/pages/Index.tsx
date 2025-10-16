import {
  Check,
  HeartPulse,
  Microscope,
  Stethoscope,
  Scan,
  ShieldCheck,
  GraduationCap,
  BadgeCheck,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FAQWidget from "@/components/widgets/FAQWidget";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import ContactModal from "@/components/ContactModal";
import { cn } from "@/lib/utils";

export default function Index() {
  return (
    <div id="top" className="text-slate-900 bg-white">
      {/* Hero with accent background */}
      <section className="relative -mt-16 text-white" data-header-anchor aria-label="Hero section">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/8533036/pexels-photo-8533036.jpeg"
            alt="Scientist working in biosafety cabinet"
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[hsl(var(--brand-end))]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--brand-start))]/40 to-[hsl(var(--brand-end))]/70 mix-blend-multiply" />
        </div>
        <div className="relative container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="hero-grid grid lg:grid-cols-2 gap-10 items-center">
            <div className="lg:flex lg:flex-col lg:items-center lg:text-center">
              {/*<span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs md:text-sm border border-white/25 text-white">
                <ShieldCheck className="h-4 w-4" /> Biosafety training •
                Guidance • Resources
              </span>*/}
              <h1 className="mt-5 text-3xl md:text-5xl font-bold leading-tight">
                Welcome to Esco Biosafety Institute!
              </h1>
              <p className="mt-4 text-white text-base md:text-lg max-w-xl">
                Biosafety in any laboratory is crucial. The Esco Biosafety
                Institute was established to be your partner in achieving it.
                Our institute provides:
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {[
                  { label: "Training & seminars", icon: GraduationCap, bg: "bg-sky-400/20" },
                  { label: "Regulatory guidance", icon: ShieldCheck, bg: "bg-teal-400/20" },
                  { label: "Practical resources", icon: Microscope, bg: "bg-indigo-400/20" },
                  { label: "Certification support", icon: BadgeCheck, bg: "bg-emerald-400/20" },
                ].map(({ label, icon: Icon, bg }) => (
                  <div
                    key={label}
                    className={cn("flex items-center gap-3 text-white rounded-lg px-3 py-4", bg)}
                  >
                    <div className="flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/12 text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-white leading-none">
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-white text-base md:text-lg max-w-2xl">
                Whether you're looking to get certified, get information on
                biosafety products, need to be updated on industry trends, or
                want to test your knowledge, our institute is your central hub
                for building expertise and confidence in biosafety protocols.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-white text-[hsl(var(--brand-end))] px-5 py-3 font-semibold shadow hover:shadow-md transition"
                >
                  Get certified
                </Link>
                <Link
                  to="/news"
                  className="inline-flex items-center justify-center rounded-lg border border-white/60 text-white px-5 py-3 font-semibold hover:bg-white/10 transition"
                >
                  Explore resources
                </Link>
              </div>
            </div>

            {/*
            <div className="relative">
              <div className="relative rounded-3xl bg-white text-slate-900 p-6 md:p-8 shadow-lg">
                <div className="grid grid-cols-3 gap-4">
                  <FeatureCard icon={HeartPulse} title="Monitors" />
                  <FeatureCard icon={Microscope} title="Laboratory" />
                  <FeatureCard icon={Scan} title="Imaging" />
                  <FeatureCard icon={Stethoscope} title="Diagnostics" />
                  <FeatureCard icon={ShieldCheck} title="Sterilization" />
                  <FeatureCard icon={HeartPulse} title="Cardiology" />
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  We tailor configurations to your needs and budget
                </p>
              </div>
            </div>
            */}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 mt-20">
        <div className="grid md:grid-cols-3 gap-6">
          <BenefitCard
            title="Industry expertise"
            descr="10+ years supplying public and private healthcare"
          />
          <BenefitCard
            title="Official supply"
            descr="We work only with certified manufacturers"
          />
          <BenefitCard
            title="Nationwide service"
            descr="Own service team and responsive support"
          />
        </div>
      </section>

      {/* Products preview */}
      <section className="container mx-auto px-4 mt-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
          <Link
            to="/products"
            className="hidden md:inline-flex text-sm hover:underline"
          >
            Browse all products
          </Link>
        </div>

        <FeaturedProducts />

        {/*<div className="mt-6">
          <Link
            to="/products"
            className="inline-flex items-center rounded-lg bg-[hsl(var(--brand-end))] text-white px-5 py-3 font-semibold shadow hover:shadow-md transition"
          >
            Browse all products
          </Link>
        </div>*/}
      </section>

      {/* Knowledge Hub */}
      <section className="container mx-auto px-4 mt-20">
        <FeaturedKnowledgeHub />
      </section>

      {/* Contact teaser */}
      <section className="container mx-auto px-4 mt-20 mb-24">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">FAQs</h3>
            <div className="mt-6">
              <FAQWidget />
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget as HTMLFormElement);
              console.log(Object.fromEntries(form.entries()));
              alert("Thank you! We will contact you shortly.");
            }}
            className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm"
          >
            <div className="grid gap-4">
              <div className="rounded-md bg-slate-50 p-3 text-slate-700 text-sm">
                <div className="font-semibold">Contact details</div>
                <ul className="mt-2 space-y-1">
                  <li>Phone: +7 (495) 000-00-00</li>
                  <li>Email: contact@escobiosafety.org</li>
                  <li>Mon–Fri: 9:00–19:00</li>
                </ul>
              </div>

              <label className="grid gap-2 text-sm">
                <span>Name</span>
                <input
                  name="name"
                  required
                  className="h-11 rounded-lg bg-white text-slate-900 border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-[hsl(var(--brand-end))]"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span>Phone or email</span>
                <input
                  name="contact"
                  required
                  className="h-11 rounded-lg bg-white text-slate-900 border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-[hsl(var(--brand-end))]"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span>Message</span>
                <textarea
                  name="message"
                  rows={4}
                  className="rounded-lg bg-white text-slate-900 border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[hsl(var(--brand-end))]"
                />
              </label>
              <button className="mt-2 inline-flex items-center justify-center rounded-lg bg-[hsl(var(--brand-end))] text-white px-5 py-3 font-semibold shadow hover:shadow-md transition">
                Send request
              </button>
              <p className="text-xs text-slate-500">
                By submitting, you agree to the processing of personal data.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="aspect-square rounded-2xl border border-slate-200 bg-white flex flex-col items-center justify-center text-center p-4">
      <Icon className="h-8 w-8 text-[hsl(var(--brand-end))]" />
      <span className="mt-2 text-base">{title}</span>
    </div>
  );
}

function BenefitCard({ title, descr }: { title: string; descr: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="font-semibold text-xl">{title}</h3>
      <p className="mt-2 text-slate-700 text-base leading-relaxed">{descr}</p>
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

function FeaturedProducts() {
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

function ResourceCard({ title }: { title: string }) {
  return (
    <Link
      to="/news"
      className="rounded-2xl border border-slate-200 bg-white p-6 block hover:shadow-sm transition-shadow"
    >
      <div className="text-sm text-slate-500">Featured</div>
      <h3 className="mt-2 font-semibold text-xl">{title}</h3>
      <p className="mt-2 text-base text-slate-600">
        Explore best practices, standards and industry insights curated by our
        experts.
      </p>
      <span className="mt-4 inline-flex text-base underline">Read more</span>
    </Link>
  );
}

function FeaturedKnowledgeHub() {
  const [tab, setTab] = useState<"videos" | "articles" | "quizzes">("videos");
  const [articles, setArticles] = useState<any[] | null>(null);
  const [quizzes, setQuizzes] = useState<any[] | null>(null);
  const [artErr, setArtErr] = useState<string | null>(null);
  const [quizErr, setQuizErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    (async () => {
      try {
        const r = await fetch("/data/knowledge-articles.json", {
          cache: "no-store",
          credentials: "same-origin",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!r.ok) throw new Error(`Failed to load articles (${r.status})`);
        const data = await r.json();
        if (!mounted) return;
        setArticles(data.slice(0, 3));
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        if (mounted) setArtErr(String(e));
      }
    })();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    (async () => {
      try {
        const r = await fetch("/data/quizzes.json", {
          cache: "no-store",
          credentials: "same-origin",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!r.ok) throw new Error(`Failed to load quizzes (${r.status})`);
        const data = await r.json();
        if (!mounted) return;
        setQuizzes(data.slice(0, 3));
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        if (mounted) setQuizErr(String(e));
      }
    })();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const VIDEOS = [
    {
      id: "vss9HS5DQQ8",
      title:
        "Inside the Sciences Podcast Episode 1: Biosafety Cabinets | Protecting Science, Protecting You",
      start: 570,
    },
    {
      id: "uaydXcyUZhI",
      title: "Biological Safety Cabinet | What You Need | Esco Scientific",
    },
    {
      id: "ZnUW1N-JJz8",
      title:
        "Working Safely in your Biological Safety Cabinets: Dealing with Spills | Esco Scientific",
    },
    {
      id: "IkO3ABNT_M8",
      title:
        "Biological Safety Cabinets | What to Keep in Mind for Stable Airflow",
    },
    {
      id: "voU9E2_vxQ0",
      title:
        "Biosafety Cabinet | Tips to Maintain its Efficiency | Esco Scientific",
    },
  ];

  const viewAllHref =
    tab === "videos"
      ? "/resources/videos"
      : tab === "articles"
        ? "/resources/articles"
        : "/resources/quizzes";

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold">Knowledge Hub</h2>
        <Link
          to={viewAllHref}
          className="hidden md:inline-flex text-sm hover:underline"
        >
          View all
        </Link>
      </div>

      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as any)}
        className="mt-4"
      >
        <TabsList>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
        </TabsList>

        <TabsContent value="videos">
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {VIDEOS.slice(0, 3).map((v) => {
              const params = v.start ? `?start=${v.start}` : "";
              return (
                <div
                  key={v.id}
                  className="overflow-hidden rounded-lg border bg-white shadow-sm"
                >
                  <AspectRatio ratio={16 / 9}>
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${v.id}${params}`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </AspectRatio>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {v.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="articles">
          {!articles && !artErr ? (
            <LoadingIndicator label="Loading articles" />
          ) : artErr ? (
            <div className="mt-6 text-sm text-red-600">
              Failed to load articles.
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles!.map((a) => {
                const slugParam = String(a.slug || "").replace(
                  "/resources/articles/",
                  "",
                );
                return (
                  <Link
                    key={a.slug}
                    to={`/resources/articles/${slugParam}`}
                    className="rounded-2xl border border-slate-200 bg-white p-6 block hover:shadow-sm transition-shadow"
                  >
                    <h3 className="font-semibold text-lg text-slate-900">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {a.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="quizzes">
          {!quizzes && !quizErr ? (
            <LoadingIndicator label="Loading quizzes" />
          ) : quizErr ? (
            <div className="mt-6 text-sm text-red-600">
              Failed to load quizzes.
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {quizzes!.map((q) => (
                <div
                  key={q.slug}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg text-slate-900">
                      {q.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 flex-1">
                      {q.subtitle}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                      <span className="rounded-full bg-[#003a68]/10 px-3 py-1 text-[#003a68]">
                        {q.category}
                      </span>
                      <span className="rounded-full bg-[#003a68]/10 px-3 py-1 text-[#003a68]">
                        {q.skillLevel}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 bg-slate-50 p-5">
                    <Button
                      asChild
                      className="w-full bg-[#003a68] hover:bg-[#003a68]/90 focus-visible:ring-[#003a68]/40"
                    >
                      <Link to={`/resources/quizzes/${q.slug}`}>
                        Start quiz
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
