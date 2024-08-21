"use client"
import { getInstagramAuthUrl } from "@/lib/data/getInstagramAuthUrl";
import { useEffect } from "react";
export default async function Home() {

  useEffect(() => {
    // Redirect the user to Instagram's authorization page
    const authUrl = getInstagramAuthUrl();
    window.location.href = authUrl;
    console.log("authUrl", authUrl);

  }, []);

  return (
    <div>
      Home page
    </div>
  );
}