"use client";

import { useState } from "react";
import {
  Heading,
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Link } from "@chakra-ui/next-js";
import { Post } from "@/types/post";
import { IterableError } from "@/types/iterableError";
import _ from "lodash";

function truncateText(text: string, length: number) {
  return _.truncate(text, {
    length: length,
    omission: "...",
  });
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchPosts = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/posts`);
  return data.data;
};

const deletePost = async (id: number) => {
  const { data } = await axios.delete<Post>(`${apiBaseUrl}/posts/${id}`);
  return data;
};

const PostsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postId, setPostId] = useState<number | null>(null);

  const { status, data, error } = useQuery<Post[], Error>("posts", fetchPosts);

  const queryClient = useQueryClient();

  const mutation = useMutation<Post, IterableError, number>(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const handleDelete = (id: number) => {
    setPostId(id);
    onOpen();
  };

  const handleConfirmDelete = () => {
    mutation.mutate(postId as number);
    onClose();
  };

  if (status === "loading") {
    return <p>Loading posts...</p>;
  }

  if (status === "error") {
    return <p>{error?.message}</p>;
  }

  return (
    <Container>
      <Heading>Posts</Heading>
      <Link href="/posts/create">
        <Button my={4}>Create Post</Button>
      </Link>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Body</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((post) => (
            <Tr key={post.id}>
              <Td>{post.id}</Td>
              <Td>{post.title}</Td>
              <Td>{truncateText(post.body, 50)}</Td>
              <Td>
                <Link href={`/posts/${post.id}`}>
                  <Button my={2} mx={2}>
                    View
                  </Button>
                </Link>
                <Link href={`/posts/${post.id}/edit`}>
                  <Button my={2} mx={2}>
                    Edit
                  </Button>
                </Link>
                <Button
                  my={2}
                  mx={2}
                  colorScheme="red"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Post</ModalHeader>
          <ModalBody>Are you sure you want to delete this post?</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default PostsPage;
