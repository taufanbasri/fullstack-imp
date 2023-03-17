import axios from "axios";
import { Post } from "../types/post";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createPost(postData: Post): Promise<Post> {
  const response = await axios.post(`${API_BASE_URL}/posts`, postData);

  if (response.status !== 201) {
    throw new Error("Network response was not ok");
  }

  return response.data;
}
