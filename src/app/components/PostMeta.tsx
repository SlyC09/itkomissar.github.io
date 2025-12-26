import type { BlogPost, PostSection } from "../content/posts";

function getSectionLabel(section: PostSection): string {
  switch (section) {
    case "razmyshlyayu":
      return "Размышляю";
    case "sozdayu":
      return "Создаю";
    case "chitayu":
      return "Читаю";
    case "motiviruju":
      return "Мотивирую";
    case "principy":
      return "Принципы";
    default: {
      const exhaustiveCheck: never = section;
      return exhaustiveCheck;
    }
  }
}

type Props = {
  post: Pick<BlogPost, "section" | "date">;
  className?: string;
};

export function PostMeta({ post, className }: Props) {
  const label = getSectionLabel(post.section);
  const hasDate = Boolean(post.date && post.date !== "-");

  return (
    <div className={className ?? "text-sm text-[#6f6559]"}>
      {label}
      {hasDate && (
        <>
          {" | "}
          <span className="text-[#9d9589]">{post.date}</span>
        </>
      )}
    </div>
  );
}

