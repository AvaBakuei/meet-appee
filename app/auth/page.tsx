"use client"
import { PostCard } from "@/components/Post/PostCard";
import { PostInterface } from "@/components/types/post.types";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { fetchPosts } from "../../lib/data/fetchPosts";

const AuthContent = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState<PostInterface[]>();

  useEffect(() => {
    const code = searchParams?.get("code");
    if (code) {
      const fetchAccessToken = async () => {
        try {
          const response = await fetch("/api/exchange-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          });

          const result = await response.json();
          const posts = await fetchPosts(result.access_token);
          setData(posts.data);
        } catch (error) {
          console.error("Error exchanging token:", error);
        }
      };
      fetchAccessToken();
    }
  }, [searchParams]);

  return <div>{data && <PostCard postCard={data} />}</div>;
};
export default function Auth() {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <AuthContent />
    </Suspense>
  );
}
