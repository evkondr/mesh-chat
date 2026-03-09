import { create } from 'zustand';
import axiosInstance from '../lib/axiosInstance';
import type { User } from '../types';

type AuthStore = {
  authUser: null | User
  isCheckingAuth: boolean
  checkAuth: () => void
}
const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  async checkAuth() {
    try {
      const res = await axiosInstance.get<User>('/auth/check');
      set({
        authUser: res.data
      });
    } catch (error) {
      console.log('Error in auth check',error);
      set({ isCheckingAuth: false});
    } finally {
      set({ isCheckingAuth: false});
    }
  }
}));

export default useAuthStore;