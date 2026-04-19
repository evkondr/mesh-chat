export interface User {
  id: string
  email: string
  fullName: string
  profilePic: string
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