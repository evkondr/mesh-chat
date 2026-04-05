import { create } from 'zustand';
import axiosInstance from '../lib/axiosInstance';
import type { User } from '../types';
import toast from 'react-hot-toast';
import type { LoginDto, SignUpDto } from '../types/dto';
import { isAxiosError } from 'axios';
import { io, type Socket } from 'socket.io-client';

type AuthStore = {
  authUser: null | User
  isCheckingAuth: boolean
  isSigningUp: boolean
  isLoggingIn: boolean
  isProfileUpdating: boolean,
  socket: null | Socket
  onlineUsers: string[],
  checkAuth: () => void
  signup: (data:SignUpDto) => void
  login: (data:LoginDto) => void
  logout: () => void
  updateProfile: (data:File) => void
  connectSocket: () => void,
}
const BASE_URL = import.meta.env.MODE == 'development' ? import.meta.env.VITE_BASE_SOCKET_URL : '/';
const useAuthStore = create<AuthStore>((set, get)=> ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isProfileUpdating: false,
  socket: null,
  onlineUsers: [],
  async checkAuth() {
    try {
      const { data }= await axiosInstance.get<User>('/auth/check');
      set({
        authUser: data
      });
      get().connectSocket();
    } catch (error) {
      if(isAxiosError(error)) {
        toast.error(error.response?.data.message || error.message);
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
      get().connectSocket();
    } catch (error) {
      if(isAxiosError(error)) {
        toast.error(error.response?.data.message || error.message);
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
      get().connectSocket();
    } catch (error) {
      if(isAxiosError(error)) {
        toast.error(error.response?.data.message || error.message);
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
        toast.error(error.response?.data.message || error.message);
      } else if(error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong. Check console');
        console.error('Error in auth check', error);
      }
    }
  },
  async updateProfile(updateData:File) {
    try {
      const formData = new FormData();
      set({ isProfileUpdating: true});
      formData.append('profilePic', updateData);
      const { data } = await axiosInstance.patch<User>('/user/update-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      set({ authUser: data });
    } catch (error) {
      if(isAxiosError(error)) {
        toast.error(error.response?.data.message || error.message);
      } else if(error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong. Check console');
        console.error('Error in auth check', error);
      }
    }finally {
      set({ isProfileUpdating: false});
    }
  },
  async connectSocket() {
    const { authUser } = get();
    if(!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true,
    });
    socket.connect();
    set({ socket });

    socket.on('getOnlineUsers', (userIds: string[]) => {
      set({
        onlineUsers: userIds
      });
    });
    socket.on("connect_error", (err) => {
      console.log("Connection error:", err.message);
    });
  }
}));

export default useAuthStore;