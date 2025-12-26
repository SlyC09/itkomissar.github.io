import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
import remarkGfm from "remark-gfm";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { withBase } from "../lib/withBase";

type Props = {
  content: string;
};

export function Markdown({ content }: Props) {
  return (
    <div className="post-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children, node: _node, ...rest }) => {
            const looksLikeAsset = Boolean(
              href?.startsWith("/images/") ||
                href?.startsWith("/files/") ||
                (href?.startsWith("/") && /\.[a-z0-9]+$/i.test(href))
            );

            if (href?.startsWith("/") && !looksLikeAsset) {
              return (
                <Link className="post-link" to={href} {...rest}>
                  {children}
                </Link>
              );
            }

            return (
              <a
                className="post-link"
                href={withBase(href) ?? href}
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel={href?.startsWith("http") ? "noreferrer" : undefined}
                {...rest}
              >
                {children}
              </a>
            );
          },
          img: ({ src, alt, node: _node, ...rest }) => (
            <ImageWithFallback
              className="post-image"
              src={withBase(src) ?? src}
              alt={alt}
              loading="lazy"
              {...rest}
            />
          ),
          table: ({ children, node: _node, ...rest }) => (
            <div className="post-table" tabIndex={0}>
              <table {...rest}>{children}</table>
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
