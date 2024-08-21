import { NextApiRequest, NextApiResponse } from "next";

const {
  NEXT_PUBLIC_IG_APP_CLIENT_ID,
  IG_APP_CLIENT_SECRET,
  NEXT_PUBLIC_REDIRECT_URL,
} = process.env;

if (
  !NEXT_PUBLIC_IG_APP_CLIENT_ID ||
  !IG_APP_CLIENT_SECRET ||
  !NEXT_PUBLIC_REDIRECT_URL
) {
  throw new Error(
    "Missing one or more required environment variables: NEXT_PUBLIC_IG_APP_CLIENT_ID, IG_APP_CLIENT_SECRET, NEXT_PUBLIC_REDIRECT_URL"
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.body;
  const url = `https://api.instagram.com/oauth/access_token`;
  const params = new URLSearchParams({
    client_id: NEXT_PUBLIC_IG_APP_CLIENT_ID as string,
    client_secret: IG_APP_CLIENT_SECRET as string,
    grant_type: "authorization_code",
    redirect_uri: NEXT_PUBLIC_REDIRECT_URL as string,
      code: code as string,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      body: params,
    });
    const data = await response.json();
    if (data.access_token) {
      res.status(200).json({ access_token: data.access_token });
    } else {
      res.status(400).json({ error: "Failed to get access token" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error exchanging code for token" });
  }
}
