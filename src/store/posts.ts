import { create } from "zustand";
import { Posts } from "@/types";

interface PostStore {
  all_posts: Posts[];
  setAllPosts: (all_posts: Posts[]) => void;

  id: number,
  setId: (id: number) => void;

  user_id: number;
  setUserId: (user_id: number) => void;

  post: Posts | null;
  setPost: (post: Posts) => void;

  modal_edit_post: boolean;
  setModalEditPost: (modal_edit_post: boolean) => void;

  drawer_edit_post: boolean;
  setDrawerEditPost: (drawer_edit_post: boolean) => void;

  title: string;
  setTitle: (title: string) => void;

  body: string;
  setBody: (body: string) => void;
}

const usePostStore = create<PostStore>((set) => ({
  all_posts: [],
  setAllPosts: (all_posts: Posts[]) => set({ all_posts }),

  id: 0,
  setId: (id: number) => set({ id }),

  user_id: 0,
  setUserId: (user_id: number) => set({ user_id }),

  post: null,
  setPost: (post: Posts) => set({ post }),

  modal_edit_post: false,
  setModalEditPost: (modal_edit_post: boolean) => set({ modal_edit_post }),

  drawer_edit_post: false,
  setDrawerEditPost: (drawer_edit_post: boolean) => set({ drawer_edit_post }),

  title: '',
  setTitle: (title: string) => set({ title }),

  body: '',
  setBody: (body: string) => set({ body }),
}));

export default usePostStore;
