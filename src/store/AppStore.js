import { homeApi } from "../api/module/home";
import  create  from "zustand";
import { setPost } from '../utils/localStorage'

export const useAppStore = create((set) => ({
  isLightMode: true,
  setIsLightMode: (theme) => set({ isLightMode: theme }),
  posts: [],
  setPosts: async () => {
    const data = await homeApi.getPostData()
    set({ posts: data });
    setPost(data)
  },
  updatePosts: (posts) => set({ posts }),
}));