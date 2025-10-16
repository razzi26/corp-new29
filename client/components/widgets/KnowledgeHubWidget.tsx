import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { Button } from "@/components/ui/button";

interface VideoItem {
  id: string;
  title: string;
  start?: number;
}

export default function KnowledgeHubWidget() {
  const [tab, setTab] = useState<"videos" | "podcasts" | "articles" | "quizzes">("videos");
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
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold">Knowledge Hub</h2>
        <Link to={viewAllHref} className="hidden md:inline-flex text-sm hover:underline">
          View all
        </Link>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="mt-4">
        <TabsList>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
        </TabsList>

        <TabsContent value="videos">
          {(!videos && !vidErr) ? (
            <LoadingIndicator label="Loading videos" />
          ) : vidErr ? (
            <div className="mt-6 text-sm text-red-600">Failed to load videos.</div>
          ) : (
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {videos!.map((v) => {
                const params = v.start ? `?start=${v.start}` : "";
                return (
                  <div key={v.id} className="overflow-hidden rounded-lg border bg-white shadow-sm">
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
                      <h3 className="text-sm font-semibold text-slate-900">{v.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="podcasts">
          {(!podcasts && !podErr) ? (
            <LoadingIndicator label="Loading podcasts" />
          ) : podErr ? (
            <div className="mt-6 text-sm text-red-600">Failed to load podcasts.</div>
          ) : (
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {podcasts!.map((p) => {
                const params = p.start ? `?start=${p.start}` : "";
                return (
                  <div key={p.id} className="overflow-hidden rounded-lg border bg-white shadow-sm">
                    <AspectRatio ratio={16 / 9}>
                      <iframe
                        className="h-full w-full"
                        src={`https://www.youtube.com/embed/${p.id}${params}`}
                        title={p.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </AspectRatio>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-slate-900">{p.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="articles">
          {!articles && !artErr ? (
            <LoadingIndicator label="Loading articles" />
          ) : artErr ? (
            <div className="mt-6 text-sm text-red-600">Failed to load articles.</div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles!.map((a) => {
                const slugParam = String(a.slug || "").replace("/resources/articles/", "");
                return (
                  <Link key={a.slug} to={`/resources/articles/${slugParam}`} className="rounded-2xl border border-slate-200 bg-white p-6 block hover:shadow-sm transition-shadow">
                    <h3 className="font-semibold text-lg text-slate-900">{a.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{a.description}</p>
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
            <div className="mt-6 text-sm text-red-600">Failed to load quizzes.</div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {quizzes!.map((q) => (
                <div key={q.slug} className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <AspectRatio ratio={16 / 9}>
                    <img src={q.image?.url ?? "/placeholder.svg"} alt={q.image?.alt ?? q.title} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                  </AspectRatio>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg text-slate-900">{q.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 flex-1">{q.subtitle}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                      <span className="rounded-full bg-[#003a68]/10 px-3 py-1 text-[#003a68]">{q.category}</span>
                      <span className="rounded-full bg-[#003a68]/10 px-3 py-1 text-[#003a68]">{q.skillLevel}</span>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 bg-slate-50 p-5">
                    <Button asChild className="w-full bg-[#003a68] hover:bg-[#003a68]/90 focus-visible:ring-[#003a68]/40">
                      <Link to={`/resources/quizzes/${q.slug}`}>Start quiz</Link>
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
