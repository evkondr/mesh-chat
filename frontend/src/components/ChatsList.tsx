import { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import NoChatsFound from "./NoChatsFound";
import UserCard from "./UserCard";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

const ChatsList = () => {
  const { getChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
  
  useEffect(() => {
    getChatPartners();
  }, [getChatPartners]);
  
  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;
  return chats.map((chat) => (
    <UserCard key={chat.id} contact={chat} onClick={() => setSelectedUser(chat)}/>
  ));
};

export default ChatsList;