import { PostFeed } from "../components/PostFeed";
import { getPostsBySection } from "../content/posts";

export function Sozdayu() {
  return <PostFeed posts={getPostsBySection("sozdayu")} />;
}
