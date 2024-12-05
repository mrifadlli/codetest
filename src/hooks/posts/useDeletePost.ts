import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/pages/api";
import { message } from "antd";
import router from "next/router";
import UriPath from "@/pages/utils/uri_path.enum";

export const useDeletePost = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      
      mutationFn: async (post_id: number) => {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push(UriPath.PAGE);
          throw new Error("Invalid credentials!");
        }
        
        return deletePost(token, post_id);
      },
      onSuccess: () => {
        message.success("Post delete successfully!");
        queryClient.invalidateQueries({ queryKey: ["posts"], exact: false });
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || error.message || "Failed to delete post!";
        message.error(errorMessage);
      },
    });
  };