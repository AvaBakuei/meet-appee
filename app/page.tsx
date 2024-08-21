
import { PostCard } from "@/components/Post/PostCard";
import { fetchPosts } from "@/lib/data/fetchPosts";
export default async function Home() {
  const posts = await fetchPosts();
  const { data } = posts;
  return (
    <div>
      <PostCard postCard={data} />
    </div>
  );
}
