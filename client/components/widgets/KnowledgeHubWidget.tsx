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

  const [hover, setHover] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const dragState = React.useRef({ startX: 0, startScroll: 0 });
  const isPotentialDrag = React.useRef(false);
  const suppressedClick = React.useRef(false);
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = React.useState(false);
  const [isOverInteractive, setIsOverInteractive] = React.useState(false);
  const DRAG_THRESHOLD = 6; // px before we consider it a drag

  const isInteractiveTarget = (target: EventTarget | null) => {
    const el = target as HTMLElement | null;
    if (!el) return false;
    return !!el.closest("a, button, input, textarea, select, [role=button], [data-no-drag]");
  };

  React.useEffect(() => {
    setIsTouch(typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0));
  }, []);

  React.useEffect(() => {
    const el = ref.current;
    if (el) {
      carouselMap.set(carouselId, el);
      // notify header controls that a carousel mounted
      notifyCarouselUpdate();
      const onScroll = () => notifyCarouselUpdate();
      el.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", notifyCarouselUpdate);
      return () => {
        el.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", notifyCarouselUpdate);
        carouselMap.delete(carouselId);
        notifyCarouselUpdate();
      };
    }
    // In case ref not set yet, still notify so header can re-evaluate
    notifyCarouselUpdate();
    return () => notifyCarouselUpdate();
  }, [carouselId]);

  // rAF-based smooth drag
  const desiredScroll = React.useRef<number | null>(null);
  const rafId = React.useRef<number | null>(null);
  const runRaf = () => {
    if (rafId.current) return;
    const step = () => {
      const el = ref.current;
      if (!el) {
        rafId.current = null;
        return;
      }
      if (desiredScroll.current !== null) {
        // lerp towards desired for smoothing (higher = faster)
        const current = el.scrollLeft;
        const target = desiredScroll.current;
        const next = current + (target - current) * 0.6; // smoothing factor (faster)
        el.scrollLeft = next;
        if (Math.abs(next - target) < 0.5) {
          el.scrollLeft = target;
          desiredScroll.current = null;
        }
      }
      rafId.current = requestAnimationFrame(step);
    };
    rafId.current = requestAnimationFrame(step);
  };
  const stopRaf = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  // handlers
  const onMouseEnter = (e: React.MouseEvent) => {
    if (isTouch) return;
    setHover(true);
    setIsOverInteractive(isInteractiveTarget(e.target));
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (isTouch) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
    setIsOverInteractive(isInteractiveTarget(e.target));

    if (isPotentialDrag.current && !isDragging) {
      const moveDelta = Math.abs(e.clientX - dragState.current.startX);
      if (moveDelta >= DRAG_THRESHOLD) {
        // start actual drag
        setIsDragging(true);
        document.body.style.userSelect = "none";
        // start smooth rAF loop
        desiredScroll.current = dragState.current.startScroll;
        runRaf();
      }
    }

    if (isDragging) {
      const delta = e.clientX - dragState.current.startX;
      desiredScroll.current = dragState.current.startScroll - delta;
    }
  };
  const endDrag = () => {
    if (!isDragging && !isPotentialDrag.current) return;
    const wasDragging = isDragging;
    setIsDragging(false);
    isPotentialDrag.current = false;
    document.body.style.userSelect = "";
    if (wasDragging) {
      suppressedClick.current = true;
      // clear after next tick to allow internal click handlers to check
      setTimeout(() => (suppressedClick.current = false), 50);
    }
    // stop RAF after short delay to allow easing to finish
    setTimeout(() => {
      desiredScroll.current = null;
      stopRaf();
    }, 40);
  };
  const onMouseDown = (e: React.MouseEvent) => {
    // only consider drag with left mouse button and when not over interactive element
    if (isTouch) return;
    if (e.button !== 0) return;
    if (isInteractiveTarget(e.target)) return;
    const el = ref.current;
    if (!el) return;
    isPotentialDrag.current = true;
    dragState.current = { startX: e.clientX, startScroll: el.scrollLeft };
    // add mouseup on window to capture when released outside
    window.addEventListener("mouseup", endDrag, { once: true });
  };
  const onMouseLeave = () => {
    setHover(false);
    setIsOverInteractive(false);
    endDrag();
  };

  // hide cursor on touch devices
  const cursorVisible = hover && !isTouch && !isOverInteractive;

  // global click suppression during drags
  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (suppressedClick.current) {
        e.stopPropagation();
        e.preventDefault();
      }
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);

  return (
    <div className="relative">
      <div
        ref={ref}
        className={`flex gap-6 overflow-x-auto py-2 px-1 scrollbar-none ${cursorVisible ? "cursor-none" : ""}`}
        style={{ scrollBehavior: "smooth" }}
        aria-live="polite"
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
      >
        {children}
      </div>

      {/* Custom drag cursor (only desktop) */}
      <div
        aria-hidden
        className={`pointer-events-none hidden md:flex items-center justify-center rounded-full text-white text-sm font-semibold ${cursorVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-150`}
        style={{
          position: "absolute",
          left: cursorPos.x - 28,
          top: cursorPos.y - 28,
          width: 56,
          height: 56,
          background: "var(--brand-secondary, #0b9b5b)",
          transform: "translateZ(0)",
        }}
      >
        &lt;-&gt;
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
    const eps = 2; // tolerance for rounding
    setCanScrollLeft(el.scrollLeft > eps);
    setCanScrollRight(el.scrollLeft + el.clientWidth + eps < el.scrollWidth);
  }, [tab]);

  React.useEffect(() => {
    // Ensure buttons reflect current carousel state
    updateButtons();
    // Register to be notified when carousels mount/unmount
    carouselUpdateListeners.add(updateButtons);

    const el = carouselMap.get(tab);
    if (el) {
      const onScroll = () => updateButtons();
      el.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", updateButtons);
      return () => {
        el.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", updateButtons);
        carouselUpdateListeners.delete(updateButtons);
      };
    }

    window.addEventListener("resize", updateButtons);
    return () => {
      window.removeEventListener("resize", updateButtons);
      carouselUpdateListeners.delete(updateButtons);
    };
  }, [tab, updateButtons, articles, quizzes, videos, podcasts]);

  const scrollActiveBy = (amount: number) => {
    const el = carouselMap.get(tab);
    if (!el) return;
    // Trigger scroll then schedule state update after the smooth scroll completes
    el.scrollBy({ left: amount, behavior: "smooth" });
    // immediate optimistic update
    updateButtons();
    // re-evaluate after animation (timing depends on browser; 400ms is reasonable)
    setTimeout(() => updateButtons(), 420);
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
