import { Link, useLocation } from "react-router";
import { getPostBySlug } from "../content/posts";

type Item = {
  label: string;
  path: string;
};

const primary: Item[] = [
  { label: "Размышляю", path: "/thinking" },
  { label: "Создаю", path: "/creating" },
  { label: "Читаю", path: "/reading" },
  { label: "Мотивирую", path: "/motivating" },
];

const secondary: Item[] = [
  { label: "Принципы", path: "/principles" },
  { label: "Обо мне", path: "/about" },
];

export type SidebarNavVariant = "desktop" | "mobile";

type Props = {
  onNavigate?: () => void;
  variant?: SidebarNavVariant;
};

export function SidebarNav({ onNavigate, variant = "desktop" }: Props) {
  const location = useLocation();

  const activePath = (() => {
    const pathname = location.pathname;

    if (pathname === "/") {
      return null;
    }

    if (pathname === "/about") {
      return "/about";
    }

    if (
      pathname.startsWith("/thinking") ||
      pathname.startsWith("/creating") ||
      pathname.startsWith("/reading") ||
      pathname.startsWith("/motivating") ||
      pathname.startsWith("/principles")
    ) {
      return `/${pathname.split("/")[1]}`;
    }

    const slugMatch = pathname.match(/^\/([^/]+)$/);
    const slug = slugMatch?.[1];
    if (!slug) {
      return null;
    }

    const post = getPostBySlug(slug);
    if (!post) {
      return null;
    }

    switch (post.section) {
      case "razmyshlyayu":
        return "/thinking";
      case "sozdayu":
        return "/creating";
      case "chitayu":
        return "/reading";
      case "motiviruju":
        return "/motivating";
      case "principy":
        return "/principles";
      default:
        return null;
    }
  })();

  const baseClassesByVariant: Record<SidebarNavVariant, string> = {
    desktop:
      "block w-fit text-[14px] leading-6 font-semibold text-[#2b2a28] hover:underline underline-offset-6 transition-colors pb-1",
    mobile:
      "block w-fit text-[14px] leading-6 font-semibold text-[#2b2a28] hover:underline underline-offset-6 transition-colors py-2",
  };

  const renderItem = (item: Item) => {
    const isActive = Boolean(activePath && item.path === activePath);
    const activeClasses = isActive
      ? "underline decoration-2 text-[#6d28d9] decoration-[#6d28d9]"
      : "";

    return (
      <Link
        key={item.label}
        to={item.path}
        className={`${baseClassesByVariant[variant]} ${activeClasses}`}
        onClick={onNavigate}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <div className="space-y-12">
      <div className="space-y-4">{primary.map(renderItem)}</div>
      <div className="space-y-4 pt-4">{secondary.map(renderItem)}</div>
    </div>
  );
}

