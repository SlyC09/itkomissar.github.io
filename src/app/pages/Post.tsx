import { useParams } from "react-router";
import { Markdown } from "../components/Markdown";
import { PostMeta } from "../components/PostMeta";
import { getPostBySlug } from "../content/posts";
import { NotFound } from "./NotFound";

export function Post() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <NotFound />;
  }

  return (
    <article className="w-full max-w-[760px]">
      <header className="space-y-4 pb-8 sm:pb-10 border-b border-[#e6dfd2]">
        <PostMeta post={post} />
        <h1 className="text-[34px] sm:text-[52px] font-semibold leading-[1.05] text-[#0f0e0c]">
          {post.title}
        </h1>
      </header>

      <div className="pt-8 sm:pt-10">
        <Markdown content={post.content} />
      </div>
    </article>
  );
}
