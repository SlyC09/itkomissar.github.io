import { useMemo } from "react";
import { PostFeed } from "../components/PostFeed";
import { getPostsBySection } from "../content/posts";

export function Principy() {
  const posts = useMemo(() => {
    return getPostsBySection("principy");
  }, []);

  return (
    <div className="space-y-14 lg:space-y-16">
      <header className="space-y-5 pb-10 border-b border-[#e6dfd2]">
        <h1 className="text-[36px] sm:text-[52px] font-semibold leading-[1.05] text-[#0f0e0c]">
          Принципы по которым я живу
        </h1>
        <p className="text-[#3f382f] text-[16px] sm:text-[18px] leading-[1.9] max-w-[760px]">
          Это не "правила для всех", а мои ориентиры. Я возвращаюсь к ним, когда
          становится шумно, сложно или хочется действовать на автомате.
        </p>
        <p className="text-sm text-[#6f6559]">
          Хронология: сверху вниз (не по датам)
        </p>
      </header>

      <PostFeed posts={posts} />
    </div>
  );
}
