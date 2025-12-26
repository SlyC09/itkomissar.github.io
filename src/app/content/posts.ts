export type PostSection =
  | "razmyshlyayu"
  | "sozdayu"
  | "chitayu"
  | "motiviruju"
  | "principy";

export type Recommendation = "рекомендую" | "не рекомендую";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  section: PostSection;
  date: string;
  content: string;
  cover?: string;
  recommendation?: Recommendation;
  order?: number;
};

const months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

type Frontmatter = Record<string, string>;

function parseFrontmatter(markdown: string): { frontmatter: Frontmatter; body: string } {
  const normalized = markdown.replace(/\r\n/g, "\n");

  if (!normalized.startsWith("---\n")) {
    return { frontmatter: {}, body: markdown };
  }

  const endIndex = normalized.indexOf("\n---\n", 4);
  if (endIndex === -1) {
    return { frontmatter: {}, body: markdown };
  }

  const rawFrontmatter = normalized.slice(4, endIndex).trim();
  const rawBody = normalized.slice(endIndex + "\n---\n".length);

  const frontmatter: Frontmatter = {};
  for (const line of rawFrontmatter.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const colonIndex = trimmed.indexOf(":");
    if (colonIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, colonIndex).trim();
    let value = trimmed.slice(colonIndex + 1).trim();

    if (
      (value.startsWith("\"") && value.endsWith("\"")) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (key) {
      frontmatter[key] = value;
    }
  }

  return { frontmatter, body: rawBody };
}

function getSlugFromPath(filePath: string): string {
  const parts = filePath.split("/");
  const filename = parts[parts.length - 1] ?? filePath;
  return filename.replace(/\.md$/i, "");
}

function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function makeExcerpt(body: string): string {
  const normalized = body.replace(/\r\n/g, "\n");
  const withoutCode = normalized.replace(/```[\s\S]*?```/g, "");

  const lines = withoutCode.split("\n");

  const firstMeaningful = lines.find((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return false;
    }

    if (trimmed.startsWith("#")) {
      return false;
    }

    return true;
  });

  const cleaned = stripMarkdown(firstMeaningful ?? "");
  return cleaned.length > 220 ? `${cleaned.slice(0, 217)}...` : cleaned;
}

function parseDateKey(date: string): number {
  const trimmed = date.trim();
  if (!trimmed || trimmed === "-") {
    return -1;
  }

  const parts = trimmed.split(/\s+/);
  const day = Number.parseInt(parts[0] ?? "", 10);
  const monthName = (parts[1] ?? "").toLowerCase();
  const monthIndex = months.indexOf(monthName);

  if (Number.isNaN(day) || monthIndex === -1) {
    return -1;
  }

  return monthIndex * 32 + day;
}

function isPostSection(value: string): value is PostSection {
  return (
    value === "razmyshlyayu" ||
    value === "sozdayu" ||
    value === "chitayu" ||
    value === "motiviruju" ||
    value === "principy"
  );
}

function isRecommendation(value: string): value is Recommendation {
  return value === "рекомендую" || value === "не рекомендую";
}

function createPostFromMarkdown(filePath: string, raw: string): BlogPost | null {
  const slug = getSlugFromPath(filePath);
  if (slug.startsWith("_")) {
    return null;
  }
  const { frontmatter, body } = parseFrontmatter(raw);

  const isDraft = frontmatter.draft === "true" || frontmatter.draft === "1";
  if (isDraft) {
    return null;
  }

  const title = frontmatter.title;
  const section = frontmatter.section;
  const date = frontmatter.date;

  if (!title || !section || !date) {
    throw new Error(
      `Post frontmatter is missing required fields (title, section, date): ${filePath}`
    );
  }

  if (!isPostSection(section)) {
    throw new Error(`Unknown post section "${section}" in ${filePath}`);
  }

  const excerpt = frontmatter.excerpt?.trim() || makeExcerpt(body);
  const cover = frontmatter.cover?.trim() || undefined;

  const recommendation = isRecommendation(frontmatter.recommendation ?? "")
    ? frontmatter.recommendation
    : undefined;

  const orderRaw = frontmatter.order?.trim();
  const order = orderRaw ? Number(orderRaw) : undefined;

  return {
    slug,
    title: title.trim(),
    excerpt,
    section,
    date: date.trim(),
    content: body.trim(),
    cover,
    recommendation,
    order: Number.isFinite(order) ? order : undefined,
  };
}

const markdownModules = import.meta.glob("./posts/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const markdownPosts: BlogPost[] = Object.entries(markdownModules)
  .map(([path, raw]) => createPostFromMarkdown(path, raw))
  .filter((post): post is BlogPost => Boolean(post));

function makePlaceholderPosts(args: {
  startId: number;
  count: number;
  section: PostSection;
  baseSlug: string;
  baseTitle: string;
}): BlogPost[] {
  const { startId, count, section, baseSlug, baseTitle } = args;

  return Array.from({ length: count }, (_, index) => {
    const id = startId + index;
    const day = String(((index + 6) % 28) + 1).padStart(2, "0");
    const month = months[(index + 7) % months.length];

    return {
      slug: `${baseSlug}-${id}`,
      section,
      date: `${day} ${month}`,
      title: `${baseTitle} №${id}`,
      excerpt:
        "Короткий анонс. Здесь будет основной смысл поста в 1-2 строках, чтобы было удобно пролистывать ленту.",
      content: "## Скоро\n\nЭтот текст появится позже.\n",
    };
  });
}

const placeholderPosts: BlogPost[] = import.meta.env.DEV
  ? [
      ...makePlaceholderPosts({
        startId: 3,
        count: 38,
        section: "razmyshlyayu",
        baseSlug: "zametka",
        baseTitle: "Заметка",
      }),
      ...makePlaceholderPosts({
        startId: 102,
        count: 12,
        section: "principy",
        baseSlug: "princip",
        baseTitle: "Принцип",
      }).map((post, index) => ({ ...post, order: 2 + index })),
      ...makePlaceholderPosts({
        startId: 201,
        count: 20,
        section: "sozdayu",
        baseSlug: "sozdayu",
        baseTitle: "Создаю",
      }),
      ...makePlaceholderPosts({
        startId: 301,
        count: 12,
        section: "motiviruju",
        baseSlug: "motiviruju",
        baseTitle: "Мотивирую",
      }),
      ...makePlaceholderPosts({
        startId: 403,
        count: 10,
        section: "chitayu",
        baseSlug: "kniga",
        baseTitle: "Книга",
      }).map((post, index) => ({
        ...post,
        cover: "/images/books/book-placeholder.svg",
        recommendation: (index % 3 === 0 ? "не рекомендую" : "рекомендую") satisfies Recommendation,
      })),
    ]
  : [];

export const posts: BlogPost[] = [...markdownPosts, ...placeholderPosts];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPostsBySection(section: PostSection): BlogPost[] {
  const list = posts.filter((post) => post.section === section);

  if (section === "principy") {
    return list
      .slice()
      .sort((a, b) => (a.order ?? Number.POSITIVE_INFINITY) - (b.order ?? Number.POSITIVE_INFINITY));
  }

  return list.slice().sort((a, b) => parseDateKey(b.date) - parseDateKey(a.date));
}

export function getHomePosts(): BlogPost[] {
  const buckets = {
    chitayu: getPostsBySection("chitayu"),
    razmyshlyayu: getPostsBySection("razmyshlyayu"),
    sozdayu: getPostsBySection("sozdayu"),
    motiviruju: getPostsBySection("motiviruju"),
  } satisfies Record<"chitayu" | "razmyshlyayu" | "sozdayu" | "motiviruju", BlogPost[]>;

  const pattern: Array<keyof typeof buckets> = [
    "chitayu",
    "razmyshlyayu",
    "razmyshlyayu",
    "sozdayu",
    "razmyshlyayu",
    "chitayu",
    "motiviruju",
    "razmyshlyayu",
  ];

  const cursors: Record<keyof typeof buckets, number> = {
    chitayu: 0,
    razmyshlyayu: 0,
    sozdayu: 0,
    motiviruju: 0,
  };

  const result: BlogPost[] = [];

  while (true) {
    let didAdd = false;

    for (const key of pattern) {
      const list = buckets[key];
      const cursor = cursors[key];

      if (cursor < list.length) {
        result.push(list[cursor]);
        cursors[key] = cursor + 1;
        didAdd = true;
      }
    }

    if (!didAdd) {
      break;
    }
  }

  return result;
}
