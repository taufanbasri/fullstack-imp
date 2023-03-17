"use client";

import { Heading, Container, Button, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Post } from "@/types/post";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchPostById = async (id: number) => {
  const { data } = await axios.get<Post>(`${apiBaseUrl}/posts/${id}`);
  return data;
};

const ViewPostPage = ({ params }: any) => {
  const router = useRouter();

  const { status, data, error } = useQuery<Post, Error>(
    ["post", params.postId],
    () => fetchPostById(Number(params.postId)),
    {
      enabled: !!params.postId,
    }
  );

  if (status === "loading") {
    return <p>Loading post...</p>;
  }

  if (status === "error") {
    return <p>{error?.message}</p>;
  }

  return (
    <Container>
      <Heading>{data?.data.title}</Heading>
      <Text my={4}>{data?.data.body}</Text>
      <Button onClick={() => router.back()}>Back</Button>
    </Container>
  );
};

export default ViewPostPage;
