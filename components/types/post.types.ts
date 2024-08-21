export interface PostInterface {
  id: string;
  username: string;
  caption: string;
  media_url: string;
}
export interface PostCardProps {
  postCard: PostInterface[];
}
