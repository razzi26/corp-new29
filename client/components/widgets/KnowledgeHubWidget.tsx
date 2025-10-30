import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { VideoCard } from "@/components/cards/VideoCard";
import { PodcastCard } from "@/components/cards/PodcastCard";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { QuizCard } from "@/components/cards/QuizCard";

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
        setArticles(Array.isArray(data) ? data.slice(0, 3) : []);
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
                  className="ml-4 hidden md:inline-flex text-base font-semibold text-brand-secondary hover:underline"
                >
                  View all →
                </Link>
              </div>
            </div>

            <TabsList className="bg-transparent h-auto inline-flex items-start sm:gap-2 lg:gap-6 rounded-none">
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

          {/*<Link
            to={viewAllHref}
            className="hidden md:inline-flex text-base font-semibold text-brand-secondary hover:underline"
          >
            View all →
          </Link>*/}
        </div>

        <TabsContent value="videos">
          {!videos && !vidErr ? (
            <LoadingIndicator label="Loading videos" />
          ) : vidErr ? (
            <div className="mt-6 text-sm text-red-600">
              Failed to load videos.
            </div>
          ) : (
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {videos!.map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
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
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {podcasts!.map((p) => (
                <PodcastCard key={p.id} podcast={p} />
              ))}
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
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles!.map((a) => (
                <ArticleCard key={a.slug} a={a} />
              ))}
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
                <QuizCard key={q.slug} quiz={q} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
