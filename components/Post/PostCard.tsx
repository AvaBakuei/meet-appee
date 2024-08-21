import { SimpleGrid, Card, Text, Badge, Button, Group } from "@mantine/core";
import { PostCardProps, PostInterface } from "../types/post.types";
import Image from "next/image";
import styles from "./PostCard.module.css";

export const PostCard: React.FC<PostCardProps> = ({ postCard }) => {
  return (
    <SimpleGrid
      type="container"
      cols={{ base: 1, "576px": 2, "768px": 3 }}
      spacing={{ "300px": "xxs" }}
    >
      {postCard.map((post: PostInterface) => (
        <Card
          key={post.id}
          className={styles.imageCard}
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
        >
          <Image
            src={post.media_url}
            alt={post.caption}
            className={styles.image}
            fill
            unoptimized
          />
        </Card>
      ))}
      <></>
    </SimpleGrid>
  );
};
