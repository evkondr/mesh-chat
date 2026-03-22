import { create } from 'zustand';
import type { User } from '../types';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axiosInstance';

type Tab = 'chats' | 'contacts';
type ChatStore = {
  allContacts: User[]
  chats: User[]
  messages: []
  activeTab: Tab
  selectedUser: User | null
  isUsersLoading: boolean
  isMessagesLoading: boolean
  isSoundEnabled: boolean
  toggleSound: () => void
  setActiveTab: (tab:Tab) => void
  setSelectedUser: (user:User) => void
  getAllContacts: (searchValue:string) => void
  getChatPartners: () => void
  clearContacts: () => void
};

const useChatStore = create<ChatStore>((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: 'chats',
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: localStorage.getItem("isSoundEnabled") == 'true',

  toggleSound() {
    localStorage.setItem("isSoundEnabled", String(!get().isSoundEnabled));
    set({ isSoundEnabled: !get().isSoundEnabled });
  },
  setActiveTab(tab) {
    set({ activeTab:tab });
  },
  setSelectedUser(user) {
    set({ selectedUser: user});
  },
  async getAllContacts(searchValue:string) {
    try {
      set({ isUsersLoading: true });
      const { data } = await axiosInstance.get<User[]>(`/messages/contacts?search=${searchValue}`);
      set({ allContacts: data});
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
      set({ isUsersLoading: false });
    }
  },
  async getChatPartners(){
    try {
      set({ isUsersLoading: true });
      const { data } = await axiosInstance.get<User[]>('/messages/chats');
      set({ chats: data});
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
      set({ isUsersLoading: false });
    }
  },
  clearContacts: () => {
    set({ allContacts: []});
  }
}));

export default useChatStore;