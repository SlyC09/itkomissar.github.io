import { useEffect } from "react";
import { useLocation } from "react-router";
import { getPostBySlug } from "../content/posts";
import { withBase } from "../lib/withBase";

const SITE_OWNER = "Андрей Комиссаренко";
const SITE_OWNER_TITLE = "Комиссаренко Андрей";
const SITE_TITLE = `${SITE_OWNER_TITLE} — вынужденный предприниматель`;
const DEFAULT_DESCRIPTION =
  "Блог про продакт-менеджмент, стартапы, маркетинг, личную эффективность и право в реальном мире продуктов.";

const pageMetaByPath: Record<string, { title: string; description: string }> = {
  "/": {
    title: SITE_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  "/thinking": {
    title: `Размышляю — ${SITE_OWNER_TITLE}`,
    description:
      "Заметки про продукты, стартапы и то, как доводить идеи до работающих решений без лишнего шума.",
  },
  "/creating": {
    title: `Создаю — ${SITE_OWNER_TITLE}`,
    description:
      "Про то, что я запускаю и развиваю: гипотезы, MVP, метрики, итерации и реальные выводы по ходу.",
  },
  "/reading": {
    title: `Читаю — ${SITE_OWNER_TITLE}`,
    description:
      "Книги, которые я читаю: короткие тезисы и мысли без длинных рецензий.",
  },
  "/motivating": {
    title: `Мотивирую — ${SITE_OWNER_TITLE}`,
    description:
      "Про энергию, дисциплину и личную эффективность: что помогает двигаться, когда сложно.",
  },
  "/principles": {
    title: `Принципы — ${SITE_OWNER_TITLE}`,
    description:
      "Принципы, по которым я живу: хронология сверху вниз и то, что помогает принимать решения.",
  },
  "/about": {
    title: `Обо мне — ${SITE_OWNER_TITLE}`,
    description:
      "Кто я и чем занимаюсь: продукты, стартапы, право и маркетинг в реальном мире.",
  },
};

function setMetaTag(args: { attr: "name" | "property"; key: string; value: string }) {
  const selector = `meta[${args.attr}="${args.key}"]`;
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(args.attr, args.key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", args.value);
}

function setLinkTag(args: { rel: string; href: string }) {
  const selector = `link[rel="${args.rel}"]`;
  let tag = document.head.querySelector(selector) as HTMLLinkElement | null;

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", args.rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", args.href);
}

function toAbsoluteUrl(pathOrUrl: string): string {
  const url = withBase(pathOrUrl) ?? pathOrUrl;

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return new URL(url, window.location.origin).toString();
}

function clampDescription(text: string, maxLen = 180): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  return normalized.length > maxLen ? `${normalized.slice(0, maxLen - 1)}…` : normalized;
}

export function Seo() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname || "/";

    const knownPages = new Set([
      "/",
      "/thinking",
      "/creating",
      "/reading",
      "/motivating",
      "/principles",
      "/about",
    ]);

    const slugMatch = pathname.match(/^\/([^/]+)\/?$/);
    const maybeSlug = slugMatch?.[1];
    const isPostCandidate = Boolean(maybeSlug && !knownPages.has(pathname));
    const post = isPostCandidate ? getPostBySlug(maybeSlug!) : undefined;

    const fallbackMeta = pageMetaByPath[pathname] ?? {
      title: SITE_TITLE,
      description: DEFAULT_DESCRIPTION,
    };

    const title = post ? `${post.title} — ${SITE_OWNER_TITLE}` : fallbackMeta.title;
    const description = clampDescription(post?.excerpt ?? fallbackMeta.description);
    const canonical = toAbsoluteUrl(pathname);

    const ogImage = post?.cover
      ? toAbsoluteUrl(post.cover)
      : toAbsoluteUrl("/images/avatar.png");

    document.title = title;

    setMetaTag({ attr: "name", key: "description", value: description });
    setMetaTag({ attr: "name", key: "author", value: SITE_OWNER });

    setLinkTag({ rel: "canonical", href: canonical });

    setMetaTag({ attr: "property", key: "og:locale", value: "ru_RU" });
    setMetaTag({ attr: "property", key: "og:site_name", value: SITE_OWNER });
    setMetaTag({ attr: "property", key: "og:title", value: title });
    setMetaTag({ attr: "property", key: "og:description", value: description });
    setMetaTag({ attr: "property", key: "og:url", value: canonical });
    setMetaTag({ attr: "property", key: "og:type", value: post ? "article" : "website" });
    setMetaTag({ attr: "property", key: "og:image", value: ogImage });

    setMetaTag({ attr: "name", key: "twitter:card", value: "summary" });
    setMetaTag({ attr: "name", key: "twitter:title", value: title });
    setMetaTag({ attr: "name", key: "twitter:description", value: description });
    setMetaTag({ attr: "name", key: "twitter:image", value: ogImage });
  }, [location.pathname]);

  return null;
}
