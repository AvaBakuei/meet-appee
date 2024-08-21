export async function fetchPosts(accessToken: string) {
  const url = `https://graph.instagram.com/me/media?fields=id,username,caption,media_url&access_token=${accessToken}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}
