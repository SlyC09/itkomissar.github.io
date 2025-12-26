import { MixedFeed } from "../components/MixedFeed";
import { getHomePosts } from "../content/posts";

export function Home() {
  return <MixedFeed posts={getHomePosts()} />;
}
