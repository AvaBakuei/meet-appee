export function getInstagramAuthUrl() {
    const clientId = process.env.NEXT_PUBLIC_IG_APP_CLIENT_ID;
    const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_REDIRECT_URL || 'https://localhost:3000/auth');
    const scope = 'business_basic,business_content_publish,business_manage_comments,business_manage_messages';
    const responseType = 'code';

    return `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
}
