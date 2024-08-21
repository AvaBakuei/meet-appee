"use client"
import { PostCard } from "@/components/Post/PostCard";
import { PostInterface } from "@/components/types/post.types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchPosts } from "../../lib/data/fetchPosts";

export default function Auth() {
    const searchParams = useSearchParams();
    const [data, setData] = useState<PostInterface[]>();

    useEffect(() => {
        const code = searchParams?.get('code');
        console.log("code", code);
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
                    console.log("Access Token:", result);
                    const posts = await fetchPosts(result.access_token);
                    setData(posts.data);
                } catch (error) {
                    console.error("Error exchanging token:", error);
                }
            };
            fetchAccessToken();
        }
    }, [searchParams]);
    console.log("data", data);
    

    return <div>{data && <PostCard postCard={data} />}</div>;
}
