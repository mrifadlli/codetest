import { useMutation } from "@tanstack/react-query";
import { viewPost } from "@/pages/api";
import { message } from "antd";
import { useRouter } from "next/router";
import UriPath from "@/utils/uri_path.enum";

export const useViewPost = () => {
    const router = useRouter();
    return useMutation({
      
      mutationFn: async (post_id: number) => {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push(UriPath.PAGE);
          throw new Error("Invalid credentials!");
        }
        
        return viewPost(token, post_id);
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || error.message || "Failed to view post!";
        message.error(errorMessage);
      },
    });
  };