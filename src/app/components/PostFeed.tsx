import { useMemo, useState } from "react";
import { Link } from "react-router";
import type { BlogPost } from "../content/posts";
import { PostMeta } from "./PostMeta";

type Props = {
  posts: BlogPost[];
  pageSize?: number;
};

export function PostFeed({ posts, pageSize = 20 }: Props) {
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const visiblePosts = useMemo(
    () => posts.slice(0, visibleCount),
    [posts, visibleCount]
  );
  const canShowMore = visibleCount < posts.length;

  return (
    <div className="space-y-14 lg:space-y-16 text-[16px] leading-[1.7]">
      <section className="space-y-12 sm:space-y-16">
        {visiblePosts.map((post, index) => (
          <article
            key={post.slug}
            className={`space-y-4 ${
              index !== visiblePosts.length - 1 || canShowMore
                ? "pb-10 sm:pb-14 border-b border-[#e6dfd2]"
                : ""
            }`}
          >
            <PostMeta post={post} />

            <Link
              to={`/${post.slug}`}
              className="block text-[26px] sm:text-[30px] font-semibold leading-tight text-[#0f0e0c] hover:opacity-80 transition-opacity"
            >
              {post.title}
            </Link>

            <p className="text-[#3f382f]">{post.excerpt}</p>
          </article>
        ))}
      </section>

      {canShowMore && (
        <div className="pt-2">
          <button
            type="button"
            className="text-[16px] leading-[1.7] font-semibold text-[#2b2a28] hover:underline underline-offset-6 transition-colors"
            onClick={() => {
              setVisibleCount((count) => Math.min(count + pageSize, posts.length));
            }}
          >
            Показать еще
          </button>
        </div>
      )}
    </div>
  );
}
