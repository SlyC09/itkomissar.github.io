import { PostFeed } from "../components/PostFeed";
import { getPostsBySection } from "../content/posts";

export function Razmyshlyayu() {
  return <PostFeed posts={getPostsBySection("razmyshlyayu")} />;
}
