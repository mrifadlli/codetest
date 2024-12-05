import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/pages/api";
import { CreatePost } from "@/types";
import { message } from "antd";
import router from "next/router";
import UriPath from "@/pages/utils/uri_path.enum";

export const useCreatePost = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      
      mutationFn: async (post_data: CreatePost) => {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push(UriPath.PAGE);
          throw new Error("Invalid credentials!");
        }
        
        return createPost(token, post_data);
      },
      onSuccess: () => {
        message.success("Post created successfully!");
        queryClient.invalidateQueries({ queryKey: ["posts"], exact: false });
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || error.message || "Failed to create post!";
        message.error(errorMessage);
      },
    });
  };