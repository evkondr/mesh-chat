import { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import NoChatsFound from "./NoChatsFound";
import UserCard from "./UserCard";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useSearchParams } from "react-router";
import type { User } from "../types";

const ChatsList = () => {
  const { getChatPartners, chats, isUsersLoading, setSelectedUser, setChatByUserId } = useChatStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentUserId = searchParams.get("chat");
  useEffect(() => {
    if (currentUserId) {
      setChatByUserId(currentUserId);
    }
  }, [currentUserId, setChatByUserId, chats.length]);

  const handleUserClick = (user:User) => {
    setSelectedUser(user);
    setSearchParams({chat: user.id});
  };
  useEffect(() => {
    getChatPartners();
  }, [getChatPartners]);
  
  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;
  return chats.map((chat) => (
    <UserCard key={chat.id} contact={chat} onClick={() => handleUserClick(chat)}/>
  ));
};

export default ChatsList;