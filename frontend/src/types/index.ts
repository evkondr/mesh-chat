export interface User {
  id: string
  email: string
  name: string
  avatarUrl: string
  createdAt: Date
  updatedAt: Date
  accessToken: string
}
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}