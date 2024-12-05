import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "@/pages/api";
import { UpdatePost } from "@/types";
import { message } from "antd";
import router from "next/router";
import UriPath from "@/utils/uri_path.enum";

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({ post_data, post_id }: { post_data: UpdatePost; post_id: number }) => {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push(UriPath.PAGE);
          throw new Error("Invalid credentials!");
        }
        
        return updatePost(token, post_id, post_data);
      },
      onSuccess: () => {
        message.success("Post update successfully!");
        queryClient.invalidateQueries({ queryKey: ["posts"], exact: false });
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || error.message || "Failed to update post!";
        message.error(errorMessage);
      },
    });
  };