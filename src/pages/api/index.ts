import axios from "axios";
import { Users, Posts, CreateUser, UpdateUser ,CreatePost, UpdatePost } from "@/types";

export async function getUsers(token:string): Promise<Users[]> {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/public/v2/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
        params: {
            page:1,
            per_page:100
        }
    })
    return res.data;
}

export async function createUser(token:string, user_data: CreateUser){
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/public/v2/users`, 
        user_data,
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data;
}

export async function viewUser(token:string, user_id: number){
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/public/v2/users/${user_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data;
}

export async function updateUser(token:string, user_id: number, user_data: UpdateUser){
    const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/public/v2/users/${user_id}`, 
        user_data,
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data;
}

export async function deleteUser(token:string, user_id: number){
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/public/v2/users/${user_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data;
}

export async function getPosts(token:string): Promise<Posts[]> {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/public/v2/posts`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page:1,
            per_page:100
        }
    })
    return res.data;
}

export async function createPost(token:string, post_data: CreatePost){
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/public/v2/users/7565315/posts`, 
        post_data,
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data;
}

export async function viewPost(token:string, post_id: number){
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/public/v2/posts/${post_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data;
}

export async function updatePost(token:string, post_id: number, post_data: UpdatePost){
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/public/v2/posts/${post_id}`,
        post_data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
}

export async function deletePost(token:string, post_id: number){
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/public/v2/posts/${post_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return res.data;
}