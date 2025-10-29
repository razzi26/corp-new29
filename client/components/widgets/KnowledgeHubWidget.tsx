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
        const r = await fetch("/data/knowledge-articles.json", {
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
        const r = await fetch("/data/quizzes.json", {
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
        const r = await fetch("/data/videos.json", {
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
        const r = await fetch("/data/podcasts.json", {
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
      <div className="flex items-end justify-between gap-4 mb-8">
        <div className="mb-8">
          <div className="w-16 h-1 bg-brand-secondary mb-4"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-[hsl(205_100%_12%)]">
            Knowledge Hub
          </h2>
        </div>
        <Link
          to={viewAllHref}
          className="hidden md:inline-flex text-base font-semibold text-[hsl(var(--primary))] hover:underline"
        >
          View all →
        </Link>
      </div>

      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as any)}
        className="w-full"
      >
        <TabsList>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
        </TabsList>

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
