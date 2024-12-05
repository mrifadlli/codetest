import { useMutation } from "@tanstack/react-query";
import { viewUser } from "@/pages/api";
import { message } from "antd";
import { useRouter } from "next/router";
import UriPath from "@/utils/uri_path.enum";

export const useViewUser = () => {
    const router = useRouter();
    return useMutation({
      
      mutationFn: async (user_id: number) => {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push(UriPath.PAGE);
          throw new Error("Invalid credentials!");
        }
        
        return viewUser(token, user_id);
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || error.message || "Failed to view user!";
        message.error(errorMessage);
      },
    });
  };