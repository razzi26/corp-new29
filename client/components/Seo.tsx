import { useEffect } from "react";

export interface SeoProps {
  title: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string; // article, website
}

export function Seo({ title, description, url, image, type = "article" }: SeoProps) {
  useEffect(() => {
    document.title = title;

    function setMeta(property: string, content?: string, attr: "property" | "name" = "property") {
      if (!content) return;
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}='${property}']`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    }

    function setLink(rel: string, href?: string) {
      if (!href) return;
      let el = document.querySelector<HTMLLinkElement>(`link[rel='${rel}']`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    }

    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:type", type);
    setMeta("og:url", url);
    setMeta("og:image", image);

    setMeta("twitter:card", image ? "summary_large_image" : "summary", "name");
    setMeta("twitter:title", title, "name");
    setMeta("twitter:description", description, "name");
    setMeta("twitter:image", image, "name");

    setLink("canonical", url);
  }, [title, description, url, image, type]);

  return null;
}
