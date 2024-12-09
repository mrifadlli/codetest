import { create } from "zustand";
import { Users } from "@/types";

interface UserStore {
  all_users: Users[];
  user: Users | null,
  username: string
  modal_create_user: boolean;
  modal_delete_user: boolean;
  drawer_edit_user: boolean;
  id: number;
  name: string;
  email_address: string;
  gender: string;
  status: string;
  setAllUsers: (all_users: Users[]) => void;
  setUser: (user: Users) => void;
  setUsername: (username: string) => void;
  setModalCreateUser: (modal_create_user: boolean) => void;
  setModalDeleteUser: (modal_delete_user: boolean) => void;
  setDrawerEditUser: (drawer_edit_user: boolean) => void;
  setId: (id: number) => void;
  setName: (name: string) => void;
  setEmailAddress: (email_address: string) => void;
  setGender: (gender: string) => void;
  setStatus: (status: string) => void;
}

const useUserStore = create<UserStore>((set) => ({
  all_users: [],
  setAllUsers: (all_users: Users[]) => set({ all_users }),

  user: null,
  setUser: (user: Users) => set({ user }),

  username: '',
  setUsername: (username: string) => set({ username }),

  modal_create_user: false,
  setModalCreateUser: (modal_create_user: boolean) => set({ modal_create_user }),

  modal_delete_user: false,
  setModalDeleteUser: (modal_delete_user: boolean) => set({ modal_delete_user }),

  drawer_edit_user: false,
  setDrawerEditUser: (drawer_edit_user: boolean) => set({ drawer_edit_user }),

  id: 0,
  setId: (id: number) => set({ id }),

  name: '',
  setName: (name: string) => set({ name }),

  email_address: '',
  setEmailAddress: (email_address: string) => set({ email_address }),

  gender: '',
  setGender: (gender: string) => set({ gender }),

  status: 'active',
  setStatus: (status: string) => set({ status }),
}));

export default useUserStore;
