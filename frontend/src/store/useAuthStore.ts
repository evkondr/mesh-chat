import { create } from 'zustand';
import axiosInstance from '../lib/axiosInstance';
import type { User } from '../types';
import toast from 'react-hot-toast';
import type { LoginDto, SignUpDto } from '../types/dto';
import { isAxiosError } from 'axios';

type AuthStore = {
  authUser: null | User
  isCheckingAuth: boolean
  isSigningUp: boolean
  isLoggingIn: boolean
  checkAuth: () => void
  signup: (data:SignUpDto) => void
  login: (data:LoginDto) => void
}
const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  async checkAuth() {
    try {
      const { data }= await axiosInstance.get<User>('/auth/check');
      set({
        authUser: data
      });
    } catch (error) {
      if(isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else if(error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong. Check console');
        console.error('Error in auth check', error);
      }
    } finally {
      set({ isCheckingAuth: false});
    }
  },
  async signup(dto:SignUpDto) {
    try {
      set({ isSigningUp: true });
      const { data }= await axiosInstance.post<User>('/auth/signup', dto);
      set({ authUser: data});
      toast.success('Account created successfully');
    } catch (error) {
      if(isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else if(error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong. Check console');
        console.error('Error in auth check', error);
      }
      
    } finally {
      set({ isSigningUp: false });
    }
  },
  async login(dto:LoginDto) {
    try {
      set({ isLoggingIn: true });
      const { data } = await axiosInstance.post<User>('/auth/login', dto);
      set({ authUser: data});
      toast.success('Successfully logged in');
    } catch (error) {
      if(isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else if(error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong. Check console');
        console.error('Error in auth check', error);
      } 
    } finally {
      set({ isLoggingIn: false });
    }
  },
  async logout() {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      if(isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else if(error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong. Check console');
        console.error('Error in auth check', error);
      }
    }
  }
}));

export default useAuthStore;