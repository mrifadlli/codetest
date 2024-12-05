import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/pages/api";
import { UpdateUser } from "@/types";
import { message } from "antd";
import router from "next/router";
import UriPath from "@/utils/uri_path.enum";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({ user_data, user_id }: { user_data: UpdateUser; user_id: number }) => {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push(UriPath.PAGE);
          throw new Error("Invalid credentials!");
        }
        
        return updateUser(token, user_id, user_data);
      },
      onSuccess: () => {
        message.success("User update successfully!");
        queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || error.message || "Failed to update user!";
        message.error(errorMessage);
      },
    });
  };