import { PostFeed } from "../components/PostFeed";
import { getPostsBySection } from "../content/posts";

export function Motiviruju() {
  return <PostFeed posts={getPostsBySection("motiviruju")} />;
}
