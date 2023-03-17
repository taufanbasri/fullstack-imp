"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Textarea,
  useToast,
  Container,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Post } from "@/types/post";
import { IterableError } from "@/types/iterableError";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchPostById = async (postId: number) => {
  const { data } = await axios.get(`${apiBaseUrl}/posts/${postId}`);
  return data.data;
};

const updatePost = async (post: Post) => {
  const { data } = await axios.put<Post>(
    `${apiBaseUrl}/posts/${post.id}`,
    post
  );
  return data;
};

const EditPostPage = ({ params }) => {
  const router = useRouter();

  const [post, setPost] = useState<Post>({
    id: -1,
    title: "",
    body: "",
  });

  const queryClient = useQueryClient();

  const toast = useToast();

  const mutation = useMutation<Post, IterableError, Post>(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      toast({
        title: "Post updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      router.push("/posts");
    },
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await fetchPostById(Number(params.postId));
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (params.postId) {
      fetchPost();
    }
  }, [params.postId]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate(post);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPost({ ...post, body: event.target.value });
  };

  return (
    <Container>
      <Heading>Edit Post</Heading>
      <Box mt={8}>
        <form onSubmit={handleSubmit}>
          <FormControl id="title" mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={post.title}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl id="body" mb={4}>
            <FormLabel>Body</FormLabel>
            <Textarea
              name="body"
              value={post.body}
              onChange={handleTextareaChange}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Update Post
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default EditPostPage;
