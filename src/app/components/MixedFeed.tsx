import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { BlogPost } from "../content/posts";
import { PostMeta } from "./PostMeta";
import { withBase } from "../lib/withBase";

type Props = {
  posts: BlogPost[];
  pageSize?: number;
};

export function MixedFeed({ posts, pageSize = 20 }: Props) {
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const visiblePosts = useMemo(
    () => posts.slice(0, visibleCount),
    [posts, visibleCount]
  );
  const canShowMore = visibleCount < posts.length;

  return (
    <div className="space-y-14 lg:space-y-16">
      <section className="space-y-12 sm:space-y-16 text-[16px] leading-[1.7]">
        {visiblePosts.map((post, index) => {
          const withDivider = index !== visiblePosts.length - 1 || canShowMore;
          const isBook = post.section === "chitayu";

          if (isBook) {
            return (
              <article
                key={post.slug}
                className={`space-y-4 ${withDivider ? "pb-10 sm:pb-14 border-b border-[#e6dfd2]" : ""}`}
              >
                <PostMeta post={post} />

                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
                  <ImageWithFallback
                    src={withBase(post.cover ?? "/images/books/book-placeholder.svg")}
                    alt={post.title}
                    className="w-[132px] h-[194px] sm:w-[112px] sm:h-[164px] shrink-0 rounded-lg border border-[#e6dfd2] object-cover bg-[#faf7f2]"
                  />

                  <div className="space-y-4">
                    <Link
                      to={`/${post.slug}`}
                      className="block text-[26px] sm:text-[30px] font-semibold leading-tight text-[#0f0e0c] hover:opacity-80 transition-opacity"
                    >
                      {post.title}
                    </Link>

                    <p className="text-[#3f382f] text-[16px] sm:text-[18px] leading-[1.9] max-w-[760px]">
                      {post.excerpt}
                    </p>

                    <div className="text-[20px] sm:text-[24px] font-semibold text-[#6d28d9]">
                      {post.recommendation ?? "рекомендую"}
                    </div>
                  </div>
                </div>
              </article>
            );
          }

          return (
            <article
              key={post.slug}
              className={`space-y-4 ${withDivider ? "pb-10 sm:pb-14 border-b border-[#e6dfd2]" : ""}`}
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
          );
        })}
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
