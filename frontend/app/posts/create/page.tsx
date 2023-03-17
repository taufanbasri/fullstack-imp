"use client";

import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Container, VStack } from "@chakra-ui/layout";
import { Textarea, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { Post } from "../../../types/post";
import { createPost } from "../../../api/posts";

type Inputs = {
  title: string;
  body: string;
};

const CreatePostPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const router = useRouter();
  const toast = useToast();

  const { mutateAsync, isLoading } = useMutation(createPost, {
    onSuccess: () => {
      toast({
        title: "Post created.",
        description: "Your post has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push(`/posts`);
    },
    onError: (error) => {
      console.error("Error:", error);
      toast({
        title: "An error occurred.",
        description: "Unable to create post. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: Post) => {
    try {
      await mutateAsync(data);

      // Redirect to the newly created post page
      router.push(`/posts`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} alignItems="stretch">
          <FormControl isInvalid={errors?.title}>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              placeholder="Enter the title"
              {...register("title", { required: "Title is required" })}
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors?.body}>
            <FormLabel htmlFor="body">Body</FormLabel>
            <Textarea
              id="body"
              placeholder="Enter the body"
              {...register("body", { required: "Body is required" })}
            />
            <FormErrorMessage>{errors.body?.message}</FormErrorMessage>
          </FormControl>
          <Button type="submit" isLoading={isLoading || isSubmitting}>
            Create Post
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default CreatePostPage;
