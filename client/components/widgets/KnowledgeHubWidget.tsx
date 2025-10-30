import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { VideoCard } from "@/components/cards/VideoCard";
import { PodcastCard } from "@/components/cards/PodcastCard";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { QuizCard } from "@/components/cards/QuizCard";

// Map of carousel containers so external header-level controls can operate them
const carouselMap = new Map<string, HTMLDivElement>();
// listeners that notify header controls to re-evaluate enabled state when carousels mount/unmount
const carouselUpdateListeners = new Set<() => void>();
const notifyCarouselUpdate = () => {
  for (const cb of carouselUpdateListeners) cb();
};

const ScrollCarousel: React.FC<{ children: React.ReactNode; carouselId: string }> = ({ children, carouselId }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (ref.current) carouselMap.set(carouselId, ref.current);
    notifyCarouselUpdate();
    return () => {
      carouselMap.delete(carouselId);
      notifyCarouselUpdate();
    };
  }, [carouselId]);

  return (
    <div>
      <div
        ref={ref}
        className="flex gap-6 overflow-x-auto py-2 px-1 scrollbar-none"
        style={{ scrollBehavior: "smooth" }}
        aria-live="polite"
      >
        {children}
      </div>
    </div>
  );
};

interface VideoItem {
  id: string;
  title: string;
  start?: number;
}

export default function KnowledgeHubWidget() {
  const [tab, setTab] = useState<
    "videos" | "podcasts" | "articles" | "quizzes"
  >("videos");
  const [articles, setArticles] = useState<any[] | null>(null);
  const [quizzes, setQuizzes] = useState<any[] | null>(null);
  const [videos, setVideos] = useState<VideoItem[] | null>(null);
  const [podcasts, setPodcasts] = useState<VideoItem[] | null>(null);
  const [artErr, setArtErr] = useState<string | null>(null);
  const [quizErr, setQuizErr] = useState<string | null>(null);
  const [vidErr, setVidErr] = useState<string | null>(null);
  const [podErr, setPodErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    (async () => {
      try {
        const url = new URL("/data/knowledge-articles.json", typeof window !== 'undefined' ? window.location.origin : '/');
        const r = await fetch(url.toString(), {
          cache: "no-store",
          credentials: "same-origin",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!r.ok) throw new Error(`Failed to load articles (${r.status})`);
        const data = await r.json();
        if (!mounted) return;
        setArticles(Array.isArray(data) ? data.slice(0, 10) : []);
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
        const url = new URL("/data/quizzes.json", typeof window !== 'undefined' ? window.location.origin : '/');
        const r = await fetch(url.toString(), {
          cache: "no-store",
          credentials: "same-origin",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!r.ok) throw new Error(`Failed to load quizzes (${r.status})`);
        const data = await r.json();
        if (!mounted) return;
        setQuizzes(Array.isArray(data) ? data.slice(0, 3) : []);
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

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    (async () => {
      try {
        const url = new URL("/data/videos.json", typeof window !== 'undefined' ? window.location.origin : '/');
        const r = await fetch(url.toString(), {
          cache: "no-store",
          credentials: "same-origin",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!r.ok) throw new Error(`Failed to load videos (${r.status})`);
        const data = await r.json();
        if (!mounted) return;
        setVideos(Array.isArray(data) ? data.slice(0, 3) : []);
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        if (mounted) setVidErr(String(e));
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
        const url = new URL("/data/podcasts.json", typeof window !== 'undefined' ? window.location.origin : '/');
        const r = await fetch(url.toString(), {
          cache: "no-store",
          credentials: "same-origin",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!r.ok) throw new Error(`Failed to load podcasts (${r.status})`);
        const data = await r.json();
        if (!mounted) return;
        setPodcasts(Array.isArray(data) ? data.slice(0, 3) : []);
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        if (mounted) setPodErr(String(e));
      }
    })();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const viewAllHref =
    tab === "videos"
      ? "/resources/videos"
      : tab === "podcasts"
        ? "/resources/podcasts"
        : tab === "articles"
          ? "/resources/articles"
          : "/resources/quizzes";

  // Header arrow controls state
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateButtons = React.useCallback(() => {
    const el = carouselMap.get(tab);
    if (!el) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, [tab]);

  React.useEffect(() => {
    updateButtons();
    const el = carouselMap.get(tab);
    if (el) {
      const onScroll = () => updateButtons();
      el.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", updateButtons);
      return () => {
        el.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", updateButtons);
      };
    }
    window.addEventListener("resize", updateButtons);
    return () => window.removeEventListener("resize", updateButtons);
  }, [tab, updateButtons, articles, quizzes, videos, podcasts]);

  const scrollActiveBy = (amount: number) => {
    const el = carouselMap.get(tab);
    if (!el) return;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const scrollPrev = () => scrollActiveBy(- (carouselMap.get(tab)?.clientWidth ?? 400) * 0.8);
  const scrollNext = () => scrollActiveBy((carouselMap.get(tab)?.clientWidth ?? 400) * 0.8);

  return (
    <div>
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as any)}
        className="w-full"
      >
        <div className="flex items-end justify-between gap-4 mb-8">
          <div className="flex flex-col items-start gap-6">
            <div className="mb-0">
              <div className="w-16 h-1 bg-brand-secondary mb-4"></div>
              <div className='flex items-center'>
                <h2 className="text-4xl md:text-5xl font-bold text-[hsl(205_100%_12%)]">
                  Knowledge Hub
                </h2>
                <Link
                  to={'/resources'}
                  className="ml-4 hidden md:inline-flex text-lg font-semibold text-brand-secondary hover:underline"
                >
                  Explore →
                </Link>
              </div>
            </div>

            <TabsList className="bg-transparent h-auto inline-flex items-start gap-4 lg:gap-6 rounded-none">
              <TabsTrigger
                value="videos"
                className="bg-transparent data-[state=active]:bg-transparent rounded-none px-0 pb-1 text-lg md:text-xl font-medium tracking-tight text-[hsl(var(--brand-end))] hover:text-[hsl(var(--brand-end))]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]/30 data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--brand-end))] data-[state=active]:pb-1"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger
                value="podcasts"
                className="bg-transparent data-[state=active]:bg-transparent rounded-none px-0 pb-1 text-lg md:text-xl font-medium tracking-tight text-[hsl(var(--brand-end))] hover:text-[hsl(var(--brand-end))]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]/30 data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--brand-end))] data-[state=active]:pb-1"
              >
                Podcasts
              </TabsTrigger>
              <TabsTrigger
                value="articles"
                className="bg-transparent data-[state=active]:bg-transparent rounded-none px-0 pb-1 text-lg md:text-xl font-medium tracking-tight text-[hsl(var(--brand-end))] hover:text-[hsl(var(--brand-end))]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]/30 data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--brand-end))] data-[state=active]:pb-1"
              >
                Articles
              </TabsTrigger>
              <TabsTrigger
                value="quizzes"
                className="bg-transparent data-[state=active]:bg-transparent rounded-none px-0 pb-1 text-lg md:text-xl font-medium tracking-tight text-[hsl(var(--brand-end))] hover:text-[hsl(var(--brand-end))]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]/30 data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--brand-end))] data-[state=active]:pb-1"
              >
                Quizzes
              </TabsTrigger>
            </TabsList>

          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollLeft}
              aria-disabled={!canScrollLeft}
              className={`p-2 rounded-md border bg-white shadow-sm transition-opacity ${!canScrollLeft ? "opacity-40 cursor-not-allowed" : "hover:scale-105"}`}
              aria-label="Scroll left"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollRight}
              aria-disabled={!canScrollRight}
              className={`p-2 rounded-md border bg-white shadow-sm transition-opacity ${!canScrollRight ? "opacity-40 cursor-not-allowed" : "hover:scale-105"}`}
              aria-label="Scroll right"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>

        <TabsContent value="videos">
          {!videos && !vidErr ? (
            <LoadingIndicator label="Loading videos" />
          ) : vidErr ? (
            <div className="mt-6 text-sm text-red-600">
              Failed to load videos.
            </div>
          ) : (
            <div className="mt-6">
              <ScrollCarousel carouselId="videos">
                {videos!.map((v) => (
                  <div key={v.id} className="w-[320px] max-w-[360px] flex-shrink-0">
                    <VideoCard video={v} />
                  </div>
                ))}
              </ScrollCarousel>
            </div>
          )}
        </TabsContent>

        <TabsContent value="podcasts">
          {!podcasts && !podErr ? (
            <LoadingIndicator label="Loading podcasts" />
          ) : podErr ? (
            <div className="mt-6 text-sm text-red-600">
              Failed to load podcasts.
            </div>
          ) : (
            <div className="mt-6">
              <ScrollCarousel carouselId="podcasts">
                {podcasts!.map((p) => (
                  <div key={p.id} className="w-[320px] max-w-[360px] flex-shrink-0">
                    <PodcastCard podcast={p} />
                  </div>
                ))}
              </ScrollCarousel>
            </div>
          )}
        </TabsContent>

        <TabsContent value="articles">
          {!articles && !artErr ? (
            <LoadingIndicator label="Loading articles" />
          ) : artErr ? (
            <div className="mt-6 text-sm text-red-600">
              Failed to load articles.
            </div>
          ) : (
            <div className="mt-6">
              <ScrollCarousel carouselId="articles">
                {articles!.map((a) => (
                  <div key={a.slug} className="w-[320px] max-w-[360px] flex-shrink-0">
                    <ArticleCard a={a} />
                  </div>
                ))}
              </ScrollCarousel>
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
            <div className="mt-6">
              <ScrollCarousel carouselId="quizzes">
                {quizzes!.map((q) => (
                  <div key={q.slug} className="w-[320px] max-w-[360px] flex-shrink-0">
                    <QuizCard quiz={q} />
                  </div>
                ))}
              </ScrollCarousel>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
