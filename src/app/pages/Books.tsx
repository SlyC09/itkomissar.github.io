import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PostMeta } from "../components/PostMeta";
import { withBase } from "../lib/withBase";
import { getPostsBySection } from "../content/posts";

const PAGE_SIZE = 20;

export function Books() {
  const books = useMemo(() => getPostsBySection("chitayu"), []);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleBooks = books.slice(0, visibleCount);
  const canShowMore = visibleCount < books.length;

  return (
    <div className="space-y-14 lg:space-y-16">
      <header className="space-y-6 pb-10 border-b border-[#e6dfd2]">
        <h1 className="text-[36px] sm:text-[52px] font-semibold leading-[1.05] text-[#0f0e0c]">
          Книги, которые я читаю
        </h1>
        <p className="text-[#3f382f] text-[16px] sm:text-[18px] leading-[1.9] max-w-[760px]">
          Я люблю читать, но не люблю писать полноценные рецензии. Здесь — короткие тезисы и мысли
          из книг, которые зашли мне чуть больше других.
        </p>
        <a
          className="inline-block font-semibold text-[#6d28d9] hover:underline underline-offset-4"
          href="https://airtable.com"
          target="_blank"
          rel="noreferrer"
        >
          Каталог 2000+ книг в Airtable с рекомендациями крутанов
        </a>
      </header>

      <section className="space-y-16">
        {visibleBooks.map((book, index) => (
          <article
            key={book.slug}
            className={`space-y-4 ${
              index !== visibleBooks.length - 1 || canShowMore
                ? "pb-10 sm:pb-14 border-b border-[#e6dfd2]"
                : ""
            }`}
          >
            <PostMeta post={book} />

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              <ImageWithFallback
                src={withBase(book.cover ?? "/images/books/book-placeholder.svg")}
                alt={book.title}
                className="w-[132px] h-[194px] sm:w-[112px] sm:h-[164px] shrink-0 rounded-lg border border-[#e6dfd2] object-cover bg-[#faf7f2]"
              />

              <div className="space-y-4">
                <Link
                  to={`/${book.slug}`}
                  className="block text-[26px] sm:text-[30px] font-semibold leading-tight text-[#0f0e0c] hover:opacity-80 transition-opacity"
                >
                  {book.title}
                </Link>

                <p className="text-[#3f382f] text-[16px] sm:text-[18px] leading-[1.9] max-w-[760px]">
                  {book.excerpt}
                </p>

                <div className="text-[20px] sm:text-[24px] font-semibold text-[#6d28d9]">
                  {book.recommendation ?? "рекомендую"}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {canShowMore && (
        <div className="pt-2">
          <button
            type="button"
            className="text-[16px] leading-[1.7] font-semibold text-[#2b2a28] hover:underline underline-offset-6 transition-colors"
            onClick={() => {
              setVisibleCount((count) => Math.min(count + PAGE_SIZE, books.length));
            }}
          >
            Показать еще
          </button>
        </div>
      )}
    </div>
  );
}
