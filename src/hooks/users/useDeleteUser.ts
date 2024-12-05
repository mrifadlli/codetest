import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/pages/api";
import { message } from "antd";
import router from "next/router";
import UriPath from "@/pages/utils/uri_path.enum";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      
      mutationFn: async (user_id: number) => {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push(UriPath.PAGE);
          throw new Error("Invalid credentials!");
        } if (user_id == Number(process.env.NEXT_PUBLIC_ROOT_ID)){
          throw new Error("Cannot delete admin user!");
        }
        
        return deleteUser(token, user_id);
      },
      onSuccess: () => {
        message.success("User delete successfully!");
        queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || error.message || "Failed to delete user!";
        message.error(errorMessage);
      },
    });
  };