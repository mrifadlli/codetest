import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/pages/api";
import { CreateUser } from "@/types";
import { message } from "antd";
import router from "next/router";
import UriPath from "@/pages/utils/uri_path.enum";

export const useCreateUser = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (user_data: CreateUser) => {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push(UriPath.PAGE);
          throw new Error("Invalid credentials!");
        }
        
        return createUser(token, user_data);
      },
      onSuccess: () => {
        message.success("User created successfully!");
        queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || error.message || "Failed to create user!";
        message.error(errorMessage);
      },
    });
  };