import { Facebook, Twitter, Linkedin, Send, Share2 } from "lucide-react";

export interface ShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function ShareButtons({ url, title, description, className }: ShareButtonsProps) {
  const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = title ?? document.title;
  const shareDesc = description ?? "";

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);
  const encodedDesc = encodeURIComponent(shareDesc);

  return (
    <div className={"flex items-center gap-2 " + (className ?? "")}
      aria-label="Share this page">
      <span className="mr-1 inline-flex items-center gap-1 text-sm text-slate-600"><Share2 className="h-4 w-4" /> Share:</span>
      <a
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-slate-50"
        aria-label="Share on Facebook"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        title="Facebook"
      >
        <Facebook className="h-4 w-4" />
      </a>
      <a
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-slate-50"
        aria-label="Share on X/Twitter"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        title="X/Twitter"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-slate-50"
        aria-label="Share on LinkedIn"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDesc}`}
        title="LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <a
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-slate-50"
        aria-label="Share on Telegram"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
        title="Telegram"
      >
        <Send className="h-4 w-4" />
      </a>
    </div>
  );
}
