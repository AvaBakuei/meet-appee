export async function fetchPosts() {
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=${process.env.INSTAGRAM_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}
